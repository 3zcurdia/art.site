# Irasema Ezcurdia Portfolio

Portfolio site for Irasema Ezcurdia, built with [Bridgetown](https://www.bridgetownrb.com/) and ERB templates. Styling is Tailwind CSS v4, precompiled at build time.

## Development

```bash
bundle install
npm install
bin/bridgetown start
```

The site runs at http://localhost:4000. Tailwind CSS rebuilds automatically while the server runs.

## Build

```bash
bin/bridgetown deploy
```

This precompiles Tailwind and generates the static site into `output/`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site (precompiling Tailwind) and deploys it to GitHub Pages using the official Pages Actions. GitHub Pages must be set to deploy from **GitHub Actions** in the repository settings. The site is served at [ezcurdia.art](https://ezcurdia.art).

## Licence

MIT License
