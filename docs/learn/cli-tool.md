---
sidebar_position: 10
---

# CLI Tool

The Deodar CLI tool is a powerful command-line interface that streamlines your WordPress development workflow. It provides commands for creating blocks, building assets, and managing your Deodar projects efficiently.

## Overview

Deodar CLI provides:

- **Block Generation**: Create new ACF blocks with interactive prompts
- **Asset Bundling**: Compile SCSS and JavaScript files using esbuild
- **Watch Mode**: Real-time compilation during development
- **Build Modes**: Development and production builds with optimization
- **Project Bundling**: Bundle current Deodar project into distributable archives

## Installation

### Global Installation

```bash
npm install -g deodar-cli
```

### Using npx (No Installation Required)

```bash
npx deodar-cli [command]
```

### Local Installation

```bash
npm install --save-dev deodar-cli
```

## Prerequisites

Deodar CLI works with WordPress plugins and themes that follow the Deodar structure:

- **For Plugins**: Must have a main plugin file (e.g., `plugin-name.php`)
- **For Themes**: Must have `functions.php` and `style.css` files

## Commands

### `deodar new [name]` (alias: `n`)

Create a new ACF block with interactive prompts.

```bash
deodar new my-awesome-block
```

**Interactive prompts:**

- Block name/slug
- Display title
- Category (text, media, design, widgets, theme, or custom)
- Include JavaScript (optional)

**Generated files:**

- `block.json` - Block configuration
- `block.php` - PHP template
- `block.scss` - Stylesheet
- `block.js` - JavaScript (if selected)

### `deodar development` (alias: `d`)

Build a Development Build of a Deodar Project with source maps and unminified assets.

```bash
deodar development
```

### `deodar production` (alias: `p`)

Build a Production Build of a Deodar Project with minified assets and no source maps.

```bash
deodar production
```

### `deodar watch` (alias: `w`)

Start a Watching Development Build that watches for file changes and automatically recompiles assets.

```bash
deodar watch
```

**Features:**

- Watches `.js` and `.scss` files
- Ignores `node_modules`, `build`, and `.git` directories
- Automatic recompilation on file changes
- Graceful shutdown with Ctrl+C

### `deodar bundle` (alias: `b`)

Bundle current Deodar project into a distributable archive.

```bash
deodar bundle
```

**Features:**

- Creates a ZIP file in the `dist/` directory
- Respects `.gitignore` patterns within a `.bundleignore` file
- Excludes development files and dependencies
- High compression (level 9)

## Project Structure

A typical Deodar project structure looks like this:

```
your-project/
├── blocks/                          # Block definitions directory
│   ├── acf/                        # ACF provider blocks
│   │   └── your-block/             # Individual block directory
│   │       ├── block.json          # Block configuration
│   │       ├── block.php           # PHP template
│   │       ├── block.scss          # Stylesheet source
│   │       ├── block.js            # JavaScript source (optional)
│   │       └── build/              # Compiled assets (auto-generated)
│   │           ├── your-block.build.css
│   │           └── your-block.build.js
│   └── core/                       # Core provider blocks
│       └── paragraph/              # Individual block directory
│           ├── paragraph.scss      # Stylesheet source
│           ├── paragraph.js        # JavaScript source (optional)
│           └── build/              # Compiled assets (auto-generated)
│               ├── paragraph.build.css
│               └── paragraph.build.js
├── source/                         # Global source files (optional)
│   ├── styles.scss                 # Global styles
│   └── scripts.js                  # Global scripts
├── build/                          # Global compiled assets (auto-generated)
│   ├── styles.build.css
│   └── scripts.build.js
├── dist/                           # Distribution packages
│   └── your-project.zip
├── deodar.json                     # Deodar configuration (optional)
├── .bundleignore                   # Bundle exclusion patterns (optional)
├── your-main-file.php              # Main plugin/theme file
└── index.php                       # Security files (auto-generated)
```

### Key Directories:

- **`blocks/`**: Contains all block definitions organized by provider (e.g., `acf/`, `core/`)
- **`blocks/{provider}/`**: Provider-specific block directories (e.g., ACF blocks, Core blocks)
- **`source/`**: Global source files that apply to the entire project
- **`build/`**: Auto-generated compiled assets (CSS/JS from source files)
- **`dist/`**: Distribution packages created by the `bundle` command
- **`blocks/*/build/`**: Auto-generated compiled assets for individual blocks

### Auto-Generated Files:

- **`build/` directories**: Created during compilation
- **`index.php` files**: Security files added to prevent direct access
- **`.build.css` and `.build.js` files**: Compiled from source files

## Configuration

Create a `deodar.json` file in your project root to customize the build process:

```json
{
    "externals": {
        "jquery": "jQuery",
        "lodash": "_"
    },
    "skip": ["node_modules/**", "dist/**"]
}
```

### Configuration Options:

- **`externals`**: External dependencies to exclude from bundling (key: package name, value: global variable)
- **`skip`**: File patterns to skip during compilation and bundling

## Development Workflow

### 1. Initialize a New Block

```bash
deodar new my-block
```

Follow the interactive prompts:
- Block name: `my-block`
- Display title: `My Block`
- Category: `design`
- Include JavaScript: `yes`

### 2. Start Development with Watch Mode

```bash
deodar watch
```

This will:
- Watch for file changes
- Automatically recompile assets
- Generate source maps for debugging
- Provide real-time feedback

### 3. Build for Production

```bash
deodar production
```

This will:
- Compile and minify all assets
- Remove source maps
- Optimize for production use

### 4. Bundle for Distribution

```bash
deodar bundle
```

This will:
- Bundle current Deodar project into a distributable archive
- Create a ZIP file in the `dist/` directory
- Exclude development files
- Include only necessary files for distribution

## Build Process

Deodar CLI uses esbuild for fast compilation:

- **SCSS**: Compiled to CSS with Sass support
- **JavaScript**: Bundled and transpiled
- **Source Maps**: Generated in development mode
- **Minification**: Applied in production mode
- **External Dependencies**: Configurable exclusions

## Examples

### Creating a Hero Block

```bash
# Create a new hero block
deodar new hero-section

# Follow the prompts:
# Block name: hero-section
# Display title: Hero Section
# Category: design
# Include JavaScript: yes
```

This creates:
```
blocks/acf/hero-section/
├── block.json
├── block.php
├── block.scss
├── block.js
└── build/
    ├── hero-section.build.css
    └── hero-section.build.js
```

### Building Assets

```bash
# Development build with source maps
deodar development

# Production build with minification
deodar production

# Watch mode for development
deodar watch
```

### Bundling for Distribution

```bash
# Bundle current Deodar project into a distributable archive
deodar bundle

# This creates: dist/your-project.zip
```

## Advanced Usage

### Custom Configuration

Create a `deodar.json` file for advanced configuration:

```json
{
    "externals": {
        "jquery": "jQuery",
        "lodash": "_",
        "gsap": "gsap"
    },
    "skip": [
        "node_modules/**",
        "dist/**",
        ".git/**",
        "*.md"
    ]
}
```

### Scripts in package.json

Add CLI commands to your `package.json` scripts:

```json
{
    "scripts": {
        "dev": "deodar watch",
        "build": "deodar production",
        "bundle": "deodar bundle",
        "new-block": "deodar new"
    }
}
```

Then use with npm:

```bash
npm run dev      # Start watch mode
npm run build    # Build for production
npm run bundle   # Bundle for distribution
npm run new-block # Create new block
```

## Troubleshooting

### Common Issues

**Command Not Found**
- Ensure Node.js is installed
- Check if deodar-cli is installed globally
- Try using `npx deodar-cli` instead

**Build Errors**
- Check SCSS syntax
- Verify JavaScript syntax
- Ensure proper file paths
- Check deodar.json configuration

**Watch Mode Not Working**
- Check file permissions
- Ensure proper directory structure
- Verify file paths
- Check for conflicting processes

### Debug Mode

Enable debug mode for detailed information:

```bash
# Add --verbose flag to any command
deodar new my-block --verbose
deodar watch --verbose
```

## Best Practices

### Development Workflow

1. **Use Watch Mode**: For real-time development
2. **Test Both Builds**: Test development and production builds
3. **Version Control**: Track source files, not build files
4. **Documentation**: Document complex configurations

### Performance

1. **Optimize Assets**: Minimize file sizes
2. **Use Externals**: Exclude large libraries from bundling
3. **Skip Unnecessary Files**: Use skip patterns effectively
4. **Cache Builds**: Use build caching when possible

### Security

1. **Index Files**: Ensure index.php files are generated
2. **File Permissions**: Set proper file permissions
3. **Bundle Security**: Review bundle contents before distribution
4. **Dependencies**: Keep dependencies up to date

## Integration with Other Tools

### VS Code Integration

Add tasks to `.vscode/tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Deodar: Watch",
            "type": "shell",
            "command": "deodar",
            "args": ["watch"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            }
        },
        {
            "label": "Deodar: Build",
            "type": "shell",
            "command": "deodar",
            "args": ["production"],
            "group": "build"
        }
    ]
}
```

### Git Hooks

Add pre-commit hooks for automatic building:

```bash
# .git/hooks/pre-commit
#!/bin/bash
deodar production
git add build/
```

## Next Steps

Now that you've mastered the CLI tool:

- [Learn about Post Types](./post-types)
- [Explore Taxonomies](./taxonomies)
- [Discover Customizations](./customizations)
- [Create Block Variations](./working-with-non-acf-blocks)
- [Learn about Production Builds](./production-builds)

---

Ready to build amazing WordPress projects? The CLI tool will help you work faster and more efficiently!
