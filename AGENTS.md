# AGENTS.md

This file contains instructions for agentic coding agents working on this Jekyll portfolio site.

## Project Overview

This is a Jekyll 4.3.4 static site generator for a personal artist portfolio. The site uses:
- Jekyll (Ruby) for static site generation
- Tailwind CSS via CDN for styling
- Vanilla JavaScript (no frameworks)
- Spanish language content

## Build and Development Commands

```bash
# Install dependencies
bundle install

# Development server (runs at http://localhost:4000)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# Check Jekyll configuration
bundle exec jekyll doctor

# Clean generated files
bundle exec jekyll clean
```

## Testing

No automated testing framework is configured. Testing should be done manually by:
1. Running `bundle exec jekyll serve` and testing in browser
2. Checking responsive design at different viewport sizes
3. Verifying form functionality and navigation
4. Testing lightbox gallery functionality

## Code Style Guidelines

### File Organization
- Jekyll directories use underscore prefix: `_layouts/`, `_includes/`, `_config.yml`
- Regular files use kebab-case: `about.markdown`, `main.js`
- Assets in `assets/` directory: `assets/js/`, `assets/images/`, `assets/css/`

### HTML/Liquid Conventions
- Use semantic HTML5 elements
- Include proper Jekyll front matter with YAML (`---`)
- Use Liquid templating: `{{ variable }}` for output, `{% tag %}` for logic
- Spanish language content: `lang="es"` on HTML element
- Mobile-first responsive design with Tailwind utilities

### CSS/Styling
- Use Tailwind CSS utility classes via CDN
- Custom color palette: `blush`, `rose-light`, `cream`, `rose-gold`, `dusty-rose`, `soft-pink`
- Custom fonts: Playfair Display (serif), Quicksand (sans-serif)
- Add custom CSS only in `<head>` section of layouts
- Use CSS custom properties for animations and transitions

### JavaScript Conventions
- Use modern ES6+ JavaScript
- camelCase for variables and functions: `mobileMenuBtn`, `openLightbox()`
- kebab-case for CSS classes and IDs: `mobile-menu`, `lightbox-img`
- Use defensive programming with element existence checks
- Add JSDoc-style comments for functions
- Event-driven architecture with `DOMContentLoaded` listener

### Import Patterns
- No ES6 imports/exports - use global scope
- Include Jekyll partials with `{% include file.html %}`
- Load external CSS via CDN in layout head
- Place JavaScript in `assets/js/main.js`

### Error Handling
- Use simple validation with user-friendly alerts (in Spanish)
- Check element existence before DOM manipulation
- Use optional chaining for safe property access
- Provide fallback behavior for missing elements

### Naming Conventions

#### Files and Directories
- **Files**: kebab-case (`main.js`, `about.md`)
- **Directories**: lowercase with underscores (`_layouts`, `_includes`)
- **Jekyll special files**: underscore prefix (`_config.yml`)

#### JavaScript
- **Variables/Functions**: camelCase (`highlightNav`, `updateNavbar`)
- **Constants**: UPPER_SNAKE_CASE (if needed)
- **CSS Classes/IDs**: kebab-case (`mobile-menu-btn`, `nav-link`)

#### HTML/Liquid
- **IDs/Classes**: kebab-case (`lightbox-img`, `mobile-menu`)
- **Jekyll variables**: snake_case (`site.title`, `page.description`)

## Content Guidelines

### Language
- All content should be in Spanish
- Use appropriate Spanish terminology for UI elements
- Error messages and alerts should be in Spanish

### Accessibility
- Use semantic HTML5 elements
- Include proper alt attributes for images
- Ensure keyboard navigation support
- Maintain proper heading hierarchy

### SEO
- Include meta descriptions for pages
- Use proper heading structure (h1, h2, h3, etc.)
- Add descriptive alt text for images
- Maintain clean URL structure

## Performance Guidelines

- Use Tailwind CSS via CDN (no local CSS build process)
- Optimize images for web (appropriate sizes, formats)
- Minimize JavaScript - use vanilla JS only
- Leverage Jekyll's built-in optimization
- Use responsive images with appropriate sizing

## Deployment

- Site is configured for GitHub Pages (CNAME file present)
- Use `bundle exec jekyll build` for production builds
- Ensure `_site/` directory is gitignored
- Test thoroughly before deployment

## Common Tasks

### Adding New Pages
1. Create new file in root directory (e.g., `contact.markdown`)
2. Add Jekyll front matter with layout and title
3. Include in navigation if needed

### Modifying Styles
1. Use Tailwind utility classes in HTML
2. Add custom CSS only in layout `<head>` section
3. Follow existing custom color palette

### Adding JavaScript Features
1. Edit `assets/js/main.js`
2. Use event listeners and defensive programming
3. Test functionality across devices

### Updating Content
1. Edit appropriate markdown or html files
2. Maintain Spanish language consistency
3. Update meta descriptions if needed

## Important Notes

- No package.json - this is a Ruby/Jekyll project
- No build process for CSS/JS - uses CDN and vanilla JS
- All user-facing content should be in Spanish
- Keep dependencies minimal - Jekyll + Tailwind only
- Test responsive design thoroughly
- Maintain clean, semantic HTML structure
