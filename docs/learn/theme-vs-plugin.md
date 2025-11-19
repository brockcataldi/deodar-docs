---
sidebar_position: 3
title: Theme vs Plugin - Choosing Your Approach
description: Understand the differences between building a theme or plugin with Deodar, and learn which approach is right for your project using our starter examples.
---

# Theme vs Plugin

When starting a new Deodar project, one of the first decisions you'll make is whether to build a custom theme or a plugin. This guide will help you understand the differences and make the right choice for your project.

## Overview

Both themes and plugins can use Deodar effectively, but they serve different purposes and have different capabilities. Understanding these differences is crucial for making the right architectural decision.

## Quick Start

The fastest way to get started with Deodar is to use one of our starter projects. These provide a complete, working foundation with all the necessary configuration and structure already in place.

### Theme Starter

```bash
npx degit https://github.com/brockcataldi/deodar-examples/tree/main/starters/deodar-base-theme your-theme-name
```

### Plugin Starter

```bash
npx degit https://github.com/brockcataldi/deodar-examples/tree/main/starters/deodar-base-plugin your-plugin-name
```

Both starters include:
- Complete Deodar configuration
- Example blocks (ACF and Core)
- Sample post types and taxonomies
- Asset compilation setup
- Proper WordPress structure

See the [Deodar Examples repository](https://github.com/brockcataldi/deodar-examples) for detailed setup instructions.

## When to Choose a Theme

### Use a Theme When:

- **Complete Website Design**: You're building a complete website with custom design, layout, and functionality
- **Client-Specific Projects**: Building a website for a specific client with unique requirements
- **Full Control**: You want complete control over the website's appearance and structure
- **Template System**: You need custom page templates, post templates, or archive layouts
- **Design-Centric**: The primary focus is on visual design and user experience

### Getting Started with Theme Starter

Use the theme starter to quickly bootstrap your project:

```bash
npx degit https://github.com/brockcataldi/deodar-examples/tree/main/starters/deodar-base-theme your-theme-name
```

After cloning, update:
1. **WordPress theme header** in `style.css` (Theme Name, Theme URI, Text Domain, etc.)
2. **Function prefix** in `functions.php` (replace `dbt` with your own prefix)
3. **Configuration** in your Deodar function (menus, styles, supports)

### Theme Structure Example

```
your-theme/
├── style.css                    # Main theme file with header
├── index.php                    # Main template file
├── functions.php                # Theme functions and Deodar config
├── blocks/                      # Custom blocks
│   ├── acf/
│   └── core/
├── includes/                    # Theme includes
├── template-parts/              # Reusable template parts
├── source/                      # Global assets
└── deodar.json                 # Build configuration
```

### Theme Configuration Example

```php
// In functions.php
add_filter('deodar', function($data) {
    return [
        'path' => get_template_directory(),
        'url' => get_template_directory_uri(),
        'production' => false,
        'menus' => [
            'primary' => 'Primary Menu',
            'footer' => 'Footer Menu'
        ],
        'styles' => [
            [
                'handle' => 'main-style',
                'file' => '/source/index.scss',
                'height' => true,
                'backend' => false
            ]
        ],
        'supports' => [
            'title-tag',
            'post-thumbnails',
            'custom-logo',
            'html5'
        ]
    ];
});
```

## When to Choose a Plugin

### Use a Plugin When:

- **Functionality Extension**: You're adding functionality that should work with any theme
- **Reusable Components**: Building blocks or features that can be used across multiple projects
- **Third-Party Integration**: Creating integrations with external services or APIs
- **Content Management**: Building custom post types, taxonomies, or admin interfaces
- **Business Logic**: Implementing complex business rules or data processing

### Getting Started with Plugin Starter

Use the plugin starter to quickly bootstrap your project:

```bash
npx degit https://github.com/brockcataldi/deodar-examples/tree/main/starters/deodar-base-plugin your-plugin-name
```

After cloning, update:
1. **Entry point filename** (rename `deodar-base-plugin.php` to match your directory name)
2. **WordPress plugin header** in the entry point file (Plugin Name, Plugin URI, Description, etc.)
3. **Function prefix** in the entry point file (replace `dbp` with your own prefix)
4. **Configuration** in your Deodar function (styles, scripts, supports)

### Plugin Structure Example

```
your-plugin/
├── your-plugin.php              # Main plugin file with header
├── blocks/                      # Custom blocks
│   ├── acf/
│   └── core/
├── includes/                    # Plugin includes
│   ├── post-types/
│   ├── taxonomies/
│   └── field-groups/
├── source/                      # Global assets
└── deodar.json                 # Build configuration
```

### Plugin Configuration Example

```php
// In your-plugin.php
function your_plugin_deodar($sources) {
    return [
        'path' => plugin_dir_path(__FILE__),
        'url' => plugin_dir_url(__FILE__),
        'production' => true,
        'styles' => [
            [
                'handle' => 'plugin-style',
                'file' => '/source/index.scss',
                'frontend' => true,
                'backend' => true
            ]
        ],
        'scripts' => [
            [
                'handle' => 'plugin-script',
                'file' => '/source/index.js',
                'frontend' => true,
                'backend' => false
            ]
        ]
    ];
}

add_filter('deodar', 'your_plugin_deodar');
```

## Key Differences

| Aspect | Theme | Plugin |
|--------|-------|--------|
| **Purpose** | Complete website design | Functionality extension |
| **Scope** | Site-wide appearance | Specific functionality |
| **Templates** | Full template system | Limited template access |
| **Activation** | One active at a time | Multiple can be active |
| **Updates** | Design-focused updates | Functionality updates |
| **Reusability** | Site-specific | Cross-site compatible |
| **Admin Access** | Limited admin features | Full admin capabilities |


## Decision Matrix

Use this decision matrix to help choose your approach:

| Question | Theme | Plugin |
|----------|-------|--------|
| Building a complete website? | ✅ | ❌ |
| Adding functionality to existing site? | ❌ | ✅ |
| Need custom page templates? | ✅ | ❌ |
| Creating reusable components? | ❌ | ✅ |
| Client-specific project? | ✅ | ❌ |
| Building for multiple sites? | ❌ | ✅ |
| Need admin interface? | ❌ | ✅ |
| Focus on design/layout? | ✅ | ❌ |

## Best Practices

### For Themes

1. **Keep it focused**: Don't add unnecessary functionality
2. **Use child themes**: For customization and updates
3. **Follow WordPress standards**: Use proper template hierarchy
4. **Optimize performance**: Minimize database queries and external requests
5. **Test with plugins**: Ensure compatibility with popular plugins

### For Plugins

1. **Namespace everything**: Avoid conflicts with other plugins
2. **Use hooks and filters**: Allow other plugins to extend functionality
3. **Follow WordPress coding standards**: Maintain consistency
4. **Handle deactivation**: Clean up when plugin is deactivated
5. **Test with themes**: Ensure compatibility with various themes


## Migration Considerations

### From Theme to Plugin

If you need to convert a theme to a plugin:

1. **Move functionality**: Extract business logic to plugin
2. **Keep templates**: Move template files to plugin if needed
3. **Update configuration**: Modify Deodar configuration for plugin structure
4. **Test compatibility**: Ensure plugin works with various themes

### From Plugin to Theme

If you need to convert a plugin to a theme:

1. **Add templates**: Create necessary template files
2. **Move assets**: Transfer styles and scripts to theme
3. **Update configuration**: Modify Deodar configuration for theme structure
4. **Test functionality**: Ensure all features work in theme context

## Next Steps

Once you've decided on your approach:

- [Learn about Post Types](./post-types)
- [Explore Taxonomies](./taxonomies)
- [Discover Block Variations](./working-with-non-acf-blocks)
- [Master the CLI Tool](./cli-tool)

---

Ready to start building? Choose your approach, use one of our [starter projects](https://github.com/brockcataldi/deodar-examples), and let's create something amazing with Deodar!
