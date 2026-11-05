# Bridgetown site configuration.
#
# This file is *NOT* reloaded automatically when you use `bin/bridgetown start`.
# If you change this file, please restart the server process.
#
# For reloadable site metadata (title, description, email, etc.), see
# `src/_data/site_metadata.yml`.

Bridgetown.configure do |config|
  # The base hostname & protocol for your site
  url "https://ezcurdia.art"

  # Template engine for .html and .md resources
  template_engine "erb"

  # All site content is in Spanish and dates come from Mexico
  timezone "America/Mexico_City"

  # Clean URLs for pages: /full-portfolio/ instead of /full-portfolio.html
  permalink "pretty"
end
