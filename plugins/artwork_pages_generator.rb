# frozen_string_literal: true

# Creates one /obras/<slug>/ page for every featured artwork in
# src/_data/artworks.csv. Rows are skipped until they have a title, so the
# catalog can be filled in gradually without producing empty pages.
class ArtworkPagesGenerator < Bridgetown::Generator
  priority :low

  def generate(site)
    slugs = ArtworkData.page_slugs(site)
    return if slugs.empty?

    ArtworkData.published(site).each do |artwork|
      slug = slugs[artwork["filename"]]
      next unless slug

      page = Bridgetown::GeneratedPage.new(
        site, site.source, "obras/#{slug}", "index.html"
      )
      page.data.layout = "artwork"
      page.data.title = artwork["title"]
      page.data.description = ArtworkData.description_for(artwork)
      page.data.artwork = artwork
      alt = artwork["alt"].to_s.strip
      base = File.basename(artwork["filename"], ".*")
      og_image = "/assets/images/og-obras/#{base}.jpg"
      if File.exist?(File.join(site.source, og_image.delete_prefix("/")))
        page.data.image = og_image
        page.data.image_alt = alt unless alt.empty?
      else
        page.data.image = site.metadata.image
      end
      page.data.og_type = "article"
      page.content = ""
      site.add_generated_page(page)
    end
  end
end
