---
sidebar_position: 1
---

# Getting Started

Welcome to Deodar, a powerful WordPress development framework that streamlines the creation of custom themes and plugins with Advanced Custom Fields (ACF) integration.

## What is Deodar?

Deodar is a modular WordPress development framework that provides:

- **Block Development**: Create custom Gutenberg blocks with ACF Pro integration
- **Asset Management**: Built-in SCSS compilation and JavaScript bundling
- **CLI Tool**: Command-line interface for rapid development
- **Structure Organization**: Standardized project structure for themes and plugins
- **Custom Post Types & Taxonomies**: Easy creation and management
- **WordPress Customizer Integration**: Seamless theme customization

## Key Features

### Block Development
- Create custom Gutenberg blocks with ACF Pro fields
- Support for both ACF provider blocks and Core provider blocks
- Built-in SCSS compilation and JavaScript bundling
- Block variations support

### Asset Management
- Automatic SCSS compilation with source maps
- JavaScript bundling and minification
- Development and production build modes
- Watch mode for real-time compilation

### CLI Tool
- Interactive block creation with `deodar new`
- Development and production builds
- Watch mode for live development
- Project bundling for distribution

### Organized Structure
- Standardized directory structure
- Separation of concerns (blocks, includes, templates)
- Security-first approach with index.php files
- Modular component architecture

## Quick Start

1. **Install the Deodar Plugin** - Add the core Deodar plugin to your WordPress site
2. **Choose Your Path** - Decide between developing a theme or plugin
3. **Set Up Your Project** - Configure your project with the `deodar` filter
4. **Create Blocks** - Use the CLI tool or manual creation to build custom blocks
5. **Add Assets** - Include styles and scripts in your configuration

## Next Steps

- [Installation Guide](./installation) - Learn how to install the Deodar plugin
- [Theme vs Plugin](./theme-vs-plugin) - Decide which approach is right for your project
- [CLI Tool](./cli-tool) - Master the command-line interface
- [Creating Blocks](./creating-blocks) - Build your first custom block


## Example Project Structure

```
your-project/
├── blocks/                          # Block definitions
│   ├── acf/                        # ACF provider blocks
│   │   └── hero-block/             # Individual block
│   │       ├── block.json          # Block configuration
│   │       ├── block.php           # PHP template
│   │       ├── block.scss          # Stylesheet
│   │       └── build/              # Compiled assets
│   └── core/                       # Core provider blocks
├── includes/                        # Project includes
│   ├── post-types/                 # Custom post types
│   ├── taxonomies/                 # Custom taxonomies
│   ├── field-groups/               # ACF field groups
│   └── customizations/             # WordPress customizer
└── source/                         # Global source files
    ├── index.scss                  # Global styles
    └── index.js                    # Global scripts
```

Ready to dive in? Let's start with the [installation guide](./installation)!