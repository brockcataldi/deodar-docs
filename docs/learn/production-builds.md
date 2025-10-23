---
sidebar_position: 10
---

# Production Builds

Production builds in Deodar optimize your project for deployment with minified assets, caching, and performance enhancements. This guide covers configuration, CLI commands, and bundling for production-ready WordPress projects.

## Overview

Deodar's production build system provides:

- **Production Configuration**: Enable caching and performance optimizations
- **CLI Production Builds**: Minified assets with optimized compilation
- **Bundling**: Create distributable ZIP archives
- **Caching**: Automatic transient caching for improved performance
- **Asset Optimization**: Minified CSS and JavaScript files

## Production Configuration

### Setting Production Mode

Enable production mode by setting `production: true` in your Deodar configuration:

```php
<?php
/**
 * Main plugin file
 *
 * @package YourPlugin
 * @since 1.0.0
 */

// Deodar configuration
add_filter('deodar', function($config) {
    return [
        'path' => __DIR__,
        'url' => plugin_dir_url(__FILE__),
        'production' => true  // Enable production mode
    ];
});

// Initialize Deodar
require_once __DIR__ . '/deodar/deodar.php';
```

### Production Mode Benefits

When production mode is enabled, Deodar automatically:

- **Enables Transient Caching**: Caches block styles, ACF blocks, walkers, and customizations
- **Improves Performance**: Reduces file system scans and database queries
- **Optimizes Loading**: Faster initialization and asset discovery
- **Reduces Memory Usage**: Cached results prevent repeated processing

**Note**: The production configuration setting only enables transient caching. For minified assets and optimized builds, use the CLI production build command.

### Caching Behavior

Production mode enables transient caching for:

- **Block Styles**: Cached block style discovery and loading
- **ACF Blocks**: Cached ACF block path scanning
- **Walkers**: Cached walker file discovery
- **Customizations**: Cached customization class loading

Cache duration: 24 hours (`DAY_IN_SECONDS`)

## CLI Production Builds

### Production Build Command

Create optimized production builds using the CLI:

```bash
# Production build command
deodar production

# Alternative alias
deodar p
```

### Production Build Features

The production build command:

- **Minifies Assets**: CSS and JavaScript files are minified
- **Removes Source Maps**: No source maps in production builds
- **Optimizes Compilation**: Uses esbuild for fast compilation
- **Bundles Dependencies**: Combines and optimizes all dependencies

### Build Process

1. **Source Compilation**: Compiles global source files
2. **Block Compilation**: Compiles all block assets
3. **Minification**: Minifies CSS and JavaScript
4. **Optimization**: Optimizes file sizes and performance

### Example Build Output

```bash
$ deodar production

🚀 Starting Deodar Build Process...

✅ Compiled source/styles.scss → build/styles.build.css
✅ Compiled source/scripts.js → build/scripts.build.js
✅ Compiled blocks/core/paragraph/paragraph.scss → blocks/core/paragraph/build/paragraph.build.css
✅ Compiled blocks/core/heading/heading.scss → blocks/core/heading/build/heading.build.css
✅ Compiled blocks/acf/testimonial/testimonial.scss → blocks/acf/testimonial/build/testimonial.build.css

🎉 Build completed successfully!
```

## Bundling

### Bundle Command

Create distributable ZIP archives of your project:

```bash
# Bundle command
deodar bundle

# Alternative alias
deodar b
```

### Bundle Features

The bundle command creates:

- **ZIP Archives**: High compression (level 9) for optimal file sizes
- **Smart Exclusion**: Respects `.bundleignore` patterns
- **Development File Exclusion**: Excludes development files and dependencies
- **Automatic Naming**: Uses project name for archive naming

### Bundle Configuration

Create a `.bundleignore` file to exclude files from bundling:

```gitignore
# .bundleignore
node_modules/
.git/
.gitignore
.bundleignore
*.log
*.tmp
coverage/
tests/
src/
source/
build/
dist/
```

### Bundle Output

Bundles are created in the `dist/` directory:

```
your-project/
├── dist/
│   └── your-project.zip
├── blocks/
├── includes/
└── your-main-file.php
```

### Example Bundle Process

```bash
$ deodar bundle

📦 Creating bundle for your-project...

✅ Scanning project files...
✅ Applying exclusion patterns...
✅ Creating archive...
✅ Compressing with high compression...

🎉 Bundle created: dist/your-project.zip (2.3 MB)
```

## Development vs Production

### Development Mode

```php
// Development configuration
add_filter('deodar', function($config) {
    return [
        'path' => __DIR__,
        'url' => plugin_dir_url(__FILE__),
        'production' => false  // Development mode
    ];
});
```

**Features:**
- No caching (real-time file scanning)
- Source maps enabled
- Unminified assets
- Development-friendly output

### Production Mode

```php
// Production configuration
add_filter('deodar', function($config) {
    return [
        'path' => __DIR__,
        'url' => plugin_dir_url(__FILE__),
        'production' => true   // Production mode
    ];
});
```

**Features:**
- Transient caching enabled
- No source maps
- Minified assets
- Optimized performance

## Build Configuration

### Deodar.json Configuration

Create a `deodar.json` file for build customization:

```json
{
    "externals": {
        "jquery": "jQuery",
        "lodash": "_"
    },
    "skip": [
        "node_modules/**",
        "dist/**",
        "tests/**"
    ]
}
```

### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `externals` | object | External dependencies to exclude from bundling |
| `skip` | array | File patterns to skip during compilation |

## Best Practices

### Production Deployment

1. **Enable Production Mode**: Set `production: true` in configuration
2. **Run Production Build**: Use `deodar production` before deployment
3. **Create Bundle**: Use `deodar bundle` for distribution
4. **Test Performance**: Verify caching and optimization

### Performance Optimization

1. **Use Transients**: Enable production mode for caching
2. **Minify Assets**: Use CLI production builds for minified files
3. **Bundle Efficiently**: Configure `.bundleignore` properly
4. **Monitor Cache**: Clear transients when needed

### Development Workflow

1. **Development Mode**: Use `production: false` during development
2. **Watch Mode**: Use `deodar watch` for real-time compilation
3. **Production Testing**: Test with `production: true` for caching before deployment
4. **Bundle Creation**: Create bundles for distribution

## Troubleshooting

### Common Issues

**Production Build Not Working**
- Verify CLI is installed globally
- Check project directory structure
- Ensure `deodar.json` configuration is valid
- Check file permissions

**Caching Issues**
- Clear WordPress transients
- Verify production mode is enabled
- Check transient names and keys
- Monitor cache expiration

**Bundle Creation Fails**
- Check `.bundleignore` patterns
- Verify file permissions
- Ensure sufficient disk space
- Check for locked files

**Performance Problems**
- Enable production mode
- Use production builds
- Check transient caching
- Monitor memory usage

### Cache Management

**Clear Transients**
```php
// Clear all Deodar transients
global $wpdb;
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_deodar_%'");
$wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_deodar_%'");
```

**Monitor Cache Performance**
```php
// Check if production mode is enabled
$deodar = new Deodar();
if ($deodar->production) {
    echo "Production mode enabled - caching active";
} else {
    echo "Development mode - no caching";
}
```

## Examples

### Complete Production Setup

```php
<?php
/**
 * Production-ready Deodar configuration
 *
 * @package YourPlugin
 * @since 1.0.0
 */

// Enable production mode
add_filter('deodar', function($config) {
    return [
        'path' => __DIR__,
        'url' => plugin_dir_url(__FILE__),
        'production' => true
    ];
});

// Initialize Deodar
require_once __DIR__ . '/deodar/deodar.php';
```

### Build Script Example

```bash
#!/bin/bash
# build.sh - Production build script

echo "🚀 Starting production build..."

# Run production build
deodar production

# Create bundle
deodar bundle

echo "✅ Production build complete!"
echo "📦 Bundle created in dist/ directory"
```

### Package.json Scripts

```json
{
    "scripts": {
        "build": "deodar production",
        "bundle": "deodar bundle",
        "dev": "deodar watch",
        "build:prod": "deodar production && deodar bundle"
    }
}
```

## Next Steps

Now that you understand production builds:

- [Master the CLI Tool](./cli-tool)
- [Learn about Post Types](./post-types)
- [Explore Taxonomies](./taxonomies)
- [Discover Customizations](./customizations)

---

Ready to deploy your project? Let's master the CLI tool for efficient development!
