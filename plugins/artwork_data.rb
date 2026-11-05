# frozen_string_literal: true

# Shared helpers for the artwork catalog in src/_data/artworks.csv.
#
# The CSV is edited by hand in a spreadsheet. These helpers keep the slug and
# publish rules identical between the page generator and the templates.
module ArtworkData
  module_function

  def rows(site)
    Array(site.data.artworks)
  end

  def featured?(artwork)
    %w[true 1 yes sí].include?(artwork["featured"].to_s.strip.downcase)
  end

  # A work gets its own page only when it is featured and has a title.
  def publishable?(artwork)
    featured?(artwork) &&
      !artwork["filename"].to_s.strip.empty? &&
      !artwork["title"].to_s.strip.empty?
  end

  def published(site)
    rows(site).select { |artwork| publishable?(artwork) }
  end

  # Maps filename => unique slug. Duplicate or empty slugs are omitted so no
  # template ever links to a page the generator did not create.
  def page_slugs(site)
    published(site)
      .group_by { |artwork| slug_for(artwork) }
      .each_with_object({}) do |(slug, artworks), map|
        next if slug.empty? || artworks.size > 1

        map[artworks.first["filename"]] = slug
      end
  end

  def slugify(text)
    text.to_s.unicode_normalize(:nfkd)
      .encode("ASCII", invalid: :replace, undef: :replace, replace: "")
      .downcase.gsub(/[^a-z0-9]+/, "-").gsub(/\A-+|-+\z/, "")
  end

  def slug_for(artwork)
    explicit = artwork["slug"].to_s.strip
    return slugify(explicit) unless explicit.empty?

    title = artwork["title"].to_s.strip
    return slugify(title) unless title.empty?

    slugify(File.basename(artwork["filename"].to_s, ".*"))
  end

  def description_for(artwork)
    explicit = artwork["description"].to_s.strip
    return explicit unless explicit.empty?

    bits = [artwork["title"], artwork["category"], artwork["technique"]]
      .map { |value| value.to_s.strip }
      .reject(&:empty?)
    "Obra de Irasema Ezcurdia: #{bits.join(' · ')}. Pieza hecha a mano en Ciudad de México."
  end
end
