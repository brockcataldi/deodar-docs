---
sidebar_position: 4
---

# Styles and Scripts

Deodar provides a powerful asset management system that handles SCSS compilation, JavaScript bundling, and proper enqueuing for both frontend and backend. This guide will show you how to add and manage styles and scripts in your Deodar project.

## Overview

Deodar's asset management system offers:

- **SCSS Compilation**: Automatic compilation with source maps
- **JavaScript Bundling**: Modern ES6+ support with bundling
- **Conditional Loading**: Load assets on frontend, backend, or both
- **Dependency Management**: Handle script dependencies properly
- **Development & Production**: Different builds for different environments
- **Watch Mode**: Real-time compilation during development

## Configuration

Styles and scripts are configured in your main project file using the `deodar` filter:

```php
add_filter('deodar', function($data) {
    return [
        'path' => get_template_directory(), // or plugin_dir_path(__FILE__)
        'url' => get_template_directory_uri(), // or plugin_dir_url(__FILE__)
        'production' => false,
        'styles' => [
            // Your styles configuration
        ],
        'scripts' => [
            // Your scripts configuration
        ]
    ];
});
```

## Styles Configuration

### Basic Style Configuration

```php
'styles' => [
    [
        'handle' => 'main-style',
        'file' => '/source/index.scss',
        'frontend' => true,
        'backend' => false
    ]
]
```

### Style Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `handle` | string | ✅ | Unique identifier for the style |
| `file` | string | ✅ | Path to the SCSS file (relative to project root) |
| `frontend` | bool | ❌ | Load on frontend (default: true) |
| `backend` | bool | ❌ | Load on backend/admin (default: false) |
| `dependencies` | array | ❌ | Array of style handles this depends on |
| `version` | string | ❌ | Version string for cache busting |
| `media` | string | ❌ | CSS media type (default: 'all') |

### Advanced Style Configuration

```php
'styles' => [
    [
        'handle' => 'google-fonts',
        'url' => 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap',
        'frontend' => true,
        'backend' => false
    ],
    [
        'handle' => 'main-style',
        'file' => '/source/index.scss',
        'dependencies' => ['google-fonts'],
        'version' => '1.0.0',
        'media' => 'all',
        'frontend' => true,
        'backend' => false
    ],
    [
        'handle' => 'admin-style',
        'file' => '/source/admin.scss',
        'frontend' => false,
        'backend' => true
    ]
]
```

## Scripts Configuration

### Basic Script Configuration

```php
'scripts' => [
    [
        'handle' => 'main-script',
        'file' => '/source/index.js',
        'frontend' => true,
        'backend' => false
    ]
]
```

### Script Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `handle` | string | ✅ | Unique identifier for the script |
| `file` | string | ✅ | Path to the JavaScript file (relative to project root) |
| `frontend` | bool | ❌ | Load on frontend (default: true) |
| `backend` | bool | ❌ | Load on backend/admin (default: false) |
| `dependencies` | array | ❌ | Array of script handles this depends on |
| `version` | string | ❌ | Version string for cache busting |
| `args` | bool | ❌ | Load in footer (default: false) |

### Advanced Script Configuration

```php
'scripts' => [
    [
        'handle' => 'jquery',
        'url' => 'https://code.jquery.com/jquery-3.6.0.min.js',
        'frontend' => true,
        'backend' => true
    ],
    [
        'handle' => 'main-script',
        'file' => '/source/index.js',
        'dependencies' => ['jquery'],
        'version' => '1.0.0',
        'args' => true, // Load in footer
        'frontend' => true,
        'backend' => false
    ],
    [
        'handle' => 'admin-script',
        'file' => '/source/admin.js',
        'dependencies' => ['jquery'],
        'frontend' => false,
        'backend' => true
    ]
]
```

## File Structure

### Recommended Structure

```
your-project/
├── source/                      # Source files
│   ├── index.scss              # Global styles
│   ├── index.js                # Global scripts
│   ├── admin.scss              # Admin-only styles
│   └── admin.js                # Admin-only scripts
├── build/                      # Compiled assets (auto-generated)
│   ├── index.build.css
│   ├── index.build.css.map
│   ├── index.build.js
│   └── index.build.js.map
└── your-main-file.php          # Main plugin/theme file
```

### SCSS File Organization

```scss
// source/index.scss
@import 'variables';
@import 'mixins';
@import 'base';
@import 'components';
@import 'layouts';
@import 'utilities';
```

## External Dependencies

### CDN Resources

You can include external resources from CDNs:

```php
'styles' => [
    [
        'handle' => 'bootstrap',
        'url' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
        'frontend' => true,
        'backend' => false
    ]
],
'scripts' => [
    [
        'handle' => 'bootstrap',
        'url' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
        'dependencies' => ['jquery'],
        'frontend' => true,
        'backend' => false
    ]
]
```

### WordPress Dependencies

Use WordPress core dependencies:

```php
'scripts' => [
    [
        'handle' => 'custom-script',
        'file' => '/source/index.js',
        'dependencies' => ['jquery', 'wp-api'],
        'frontend' => true,
        'backend' => false
    ]
]
```

## Build Configuration

### deodar.json Configuration

Create a `deodar.json` file in your project root to customize the build process:

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
        ".git/**"
    ]
}
```

### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `externals` | object | External dependencies to exclude from bundling |
| `skip` | array | File patterns to skip during compilation |

## Development Workflow

### 1. Create Source Files

Create your SCSS and JavaScript files in the `source/` directory:

```scss
// source/index.scss
$primary-color: #007cba;
$secondary-color: #f0f0f0;

body {
    font-family: 'Roboto', sans-serif;
    color: $primary-color;
}

.button {
    background-color: $primary-color;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    
    &:hover {
        background-color: darken($primary-color, 10%);
    }
}
```

```javascript
// source/index.js
import $ from 'jquery';

$(document).ready(function() {
    console.log('Deodar project loaded!');
    
    // Your JavaScript code here
    $('.button').on('click', function() {
        console.log('Button clicked!');
    });
});
```

### 2. Configure in Main File

Add the styles and scripts to your Deodar configuration:

```php
add_filter('deodar', function($data) {
    return [
        'path' => get_template_directory(),
        'url' => get_template_directory_uri(),
        'production' => false,
        'styles' => [
            [
                'handle' => 'main-style',
                'file' => '/source/index.scss',
                'frontend' => true,
                'backend' => false
            ]
        ],
        'scripts' => [
            [
                'handle' => 'main-script',
                'file' => '/source/index.js',
                'dependencies' => ['jquery'],
                'frontend' => true,
                'backend' => false
            ]
        ]
    ];
});
```

### 3. Build Assets

Use the Deodar CLI to build your assets:

```bash
# Development build
deodar development

# Production build
deodar production

# Watch mode for development
deodar watch
```

## Best Practices

### Performance Optimization

1. **Minimize Dependencies**: Only include what you need
2. **Use CDNs Wisely**: Balance performance vs. reliability
3. **Conditional Loading**: Load assets only where needed
4. **Version Control**: Use version strings for cache busting

### Code Organization

1. **Modular SCSS**: Break styles into logical components
2. **ES6 Modules**: Use modern JavaScript features
3. **Consistent Naming**: Use consistent naming conventions
4. **Documentation**: Document complex configurations

### Development Workflow

1. **Use Watch Mode**: For real-time development
2. **Test Both Environments**: Test frontend and backend loading
3. **Version Control**: Track source files, not build files
4. **Error Handling**: Handle missing files gracefully

## Troubleshooting

### Common Issues

**Styles Not Loading**
- Check file paths in configuration
- Verify SCSS compilation
- Check browser console for errors

**Scripts Not Working**
- Verify JavaScript file paths
- Check for JavaScript errors in console
- Ensure dependencies are loaded

**Build Errors**
- Check SCSS syntax
- Verify JavaScript syntax
- Check deodar.json configuration

### Debug Mode

Enable debug mode to see detailed information:

```php
'production' => false, // Set to false for development
```

## Examples

### Complete Configuration Example

```php
add_filter('deodar', function($data) {
    return [
        'path' => get_template_directory(),
        'url' => get_template_directory_uri(),
        'production' => false,
        'styles' => [
            [
                'handle' => 'google-fonts',
                'url' => 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap',
                'frontend' => true,
                'backend' => false
            ],
            [
                'handle' => 'main-style',
                'file' => '/source/index.scss',
                'dependencies' => ['google-fonts'],
                'version' => '1.0.0',
                'frontend' => true,
                'backend' => false
            ],
            [
                'handle' => 'admin-style',
                'file' => '/source/admin.scss',
                'frontend' => false,
                'backend' => true
            ]
        ],
        'scripts' => [
            [
                'handle' => 'main-script',
                'file' => '/source/index.js',
                'dependencies' => ['jquery'],
                'version' => '1.0.0',
                'args' => true,
                'frontend' => true,
                'backend' => false
            ],
            [
                'handle' => 'admin-script',
                'file' => '/source/admin.js',
                'dependencies' => ['jquery'],
                'frontend' => false,
                'backend' => true
            ]
        ]
    ];
});
```

## Next Steps

Now that you understand how to manage styles and scripts:

- [Create your first custom block](./creating-blocks)
- [Learn about the CLI tool](./cli-tool)
- [Explore block variations](./working-with-non-acf-blocks)
- [Learn about Production Builds](./production-builds)

---

Ready to build something amazing? Let's create your first custom block!
