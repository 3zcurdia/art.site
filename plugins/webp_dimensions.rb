# frozen_string_literal: true

# Reads the intrinsic pixel dimensions of a WebP file from its RIFF header.
#
# Used by templates to emit `width`/`height` attributes so the browser can
# reserve space before the image downloads (avoids layout shift). Supports
# lossy (VP8), lossless (VP8L), and extended (VP8X) WebP containers.
module WebpDimensions
  module_function

  # @param path [String] absolute path to a .webp file
  # @return [Array(Integer, Integer), nil] width and height, or nil if unreadable
  def read(path)
    header = File.binread(path, 32)
    return unless header && header.bytesize >= 30
    return unless header.byteslice(0, 4) == "RIFF"
    return unless header.byteslice(8, 4) == "WEBP"

    dimensions =
      case header.byteslice(12, 4)
      when "VP8 " then lossy_dimensions(header)
      when "VP8L" then lossless_dimensions(header)
      when "VP8X" then extended_dimensions(header)
      end

    dimensions if dimensions&.all? { |value| value.positive? }
  rescue SystemCallError
    nil
  end

  def lossy_dimensions(header)
    start_code = header.byteslice(23, 3)
    return unless start_code&.bytes == [0x9d, 0x01, 0x2a]

    width = header.byteslice(26, 2).unpack1("v") & 0x3fff
    height = header.byteslice(28, 2).unpack1("v") & 0x3fff
    [width, height]
  end

  def lossless_dimensions(header)
    return unless header.getbyte(20) == 0x2f

    bits = header.byteslice(21, 4).unpack1("V")
    [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]
  end

  def extended_dimensions(header)
    width = header.getbyte(24) | (header.getbyte(25) << 8) | (header.getbyte(26) << 16)
    height = header.getbyte(27) | (header.getbyte(28) << 8) | (header.getbyte(29) << 16)
    [width + 1, height + 1]
  end
end
