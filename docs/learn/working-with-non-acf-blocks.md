---
sidebar_position: 9
---

# Working with Non-ACF Blocks

Non-ACF blocks in Deodar benefit from automatic asset loading and comprehensive variation support. This page covers how to work with non-ACF blocks, create block variations, and leverage Deodar's automatic CSS loading system for optimal development workflow.

## Overview

Deodar's non-ACF block system provides:

- **Automatic Asset Loading**: CSS build files are automatically enqueued for non-ACF blocks
- **Variation Support**: Full support for WordPress block variations
- **Automatic Discovery**: Blocks and variations are automatically loaded from block directories
- **Styling Integration**: Seamless integration with block styling
- **Zero Configuration**: No manual enqueuing required
- **Production Ready**: Optimized for both development and production

## Automatic Asset Loading

### How Deodar Loads Build Files

Deodar automatically scans your block directories and enqueues build files for non-ACF blocks. This happens automatically without any manual configuration required.

#### Build File Structure

For non-ACF blocks, Deodar expects the following build file structure:

```
blocks/
├── core/
│   ├── paragraph/
│   │   ├── build/
│   │   │   └── paragraph.build.css
│   │   ├── paragraph.scss
│   │   └── paragraph.variations.php
│   └── heading/
│       ├── build/
│       │   └── heading.build.css
│       └── heading.scss
└── acf/
    └── [ACF blocks - handled differently]
```

## Understanding Block Variations

### What are Block Variations?

Block variations are predefined versions of existing blocks (core blocks or blocks from other plugins) that come with:
- **Default Attributes**: Pre-configured block attributes
- **Default Content**: Pre-filled content or structure
- **Custom Styling**: Additional CSS classes and styles
- **Custom Icons**: Unique icons for each variation
- **Custom Descriptions**: Helpful descriptions for users

### When to Use Block Variations

- **Style Variations**: Different visual styles for existing blocks (core or plugin blocks)
- **Alternative Layouts**: Create variations of existing blocks with different layouts
- **Content Templates**: Pre-filled content for common use cases
- **Enhanced Functionality**: Add custom functionality to existing blocks

**Note**: Block variations are only used for non-ACF blocks. ACF blocks have their own variation system through ACF Pro.


#### Automatic Scanning Process

1. **Directory Scanning**: Deodar scans the `blocks/` directory for all subdirectories
2. **Namespace Detection**: Identifies block namespaces (like `core`, `custom`, etc.)
3. **Block Discovery**: Finds individual blocks within each namespace
4. **Build File Detection**: Looks for `build/[block-name].build.css` files
5. **Automatic Enqueuing**: Uses `wp_enqueue_block_style()` to load CSS files

#### Build File Naming Convention

- **CSS Files**: `[block-name].build.css`
- **Source Files**: `[block-name].scss`

#### Example: Paragraph Block

For a paragraph block in `blocks/core/paragraph/`, Deodar will automatically:

1. **Scan** the directory structure
2. **Detect** the `core/paragraph` block
3. **Look for** `blocks/core/paragraph/build/paragraph.build.css`
4. **Enqueue** the CSS file using:
   ```php
   wp_enqueue_block_style(
       'core/paragraph',
       array(
           'handle' => 'deodar-core-paragraph',
           'src'    => '/blocks/core/paragraph/build/paragraph.build.css',
           'path'   => '/path/to/blocks/core/paragraph/build/paragraph.build.css'
       )
   );
   ```

#### Key Benefits

- **Zero Configuration**: No manual enqueuing required
- **Automatic Discovery**: Build files are found automatically
- **Performance Optimized**: Uses WordPress's built-in block style system
- **Production Ready**: Works seamlessly in both development and production
- **Cache Friendly**: Integrates with WordPress caching systems

#### What Gets Loaded Automatically

- **CSS Files**: All `[block-name].build.css` files in block directories
- **Block Variations**: Variation files are loaded when present
- **Non-ACF Blocks Only**: ACF blocks handle their own asset loading

#### What Doesn't Get Loaded

- **ACF Block Assets**: ACF blocks use their own asset loading system
- **Source Files**: Only build files are loaded, not source SCSS files
- **JavaScript Files**: JavaScript files are not automatically loaded for non-ACF blocks
- **Manual Assets**: Assets not following the naming convention

## Creating Block Variations

### Method 1: Manual Creation (Recommended)

Create variation files manually for existing blocks:

```bash
# Navigate to your project directory
cd your-project

# Create variation file for existing blocks
touch blocks/core/paragraph/paragraph.variations.php
```

1. **Create Variation File**
   ```
   blocks/core/paragraph/paragraph.variations.php
   ```

2. **Create the Variation Configuration**
   ```php
   <?php
   /**
    * Paragraph Block Variations
    *
    * @package YourProject
    * @since 1.0.0
    */
   
   if (!defined('ABSPATH')) {
       exit;
   }
   
   // Add custom variations for the paragraph block
   add_filter('deodar_core_paragraph_variations', function($variations) {
       
       // Highlighted Paragraph Variation
       $variations[] = [
           'name' => 'highlighted',
           'title' => 'Highlighted Paragraph',
           'description' => 'A paragraph with highlighted background styling',
           'category' => 'text',
           'keywords' => ['paragraph', 'text', 'highlighted'],
           'attributes' => [
               'className' => 'is-highlighted'
           ]
       ];
       
       // Large Text Paragraph Variation
       $variations[] = [
           'name' => 'large-text',
           'title' => 'Large Text Paragraph',
           'description' => 'A paragraph with larger text styling',
           'category' => 'text',
           'keywords' => ['paragraph', 'text', 'large'],
           'attributes' => [
               'className' => 'is-large-text'
           ]
       ];
       
       return $variations;
   });
   ```

## Variation Configuration Options

### Basic Variation Structure

```php
$variations[] = [
    'name' => 'variation-name',
    'title' => 'Variation Title',
    'description' => 'Variation description',
    'category' => 'design',
    'keywords' => ['keyword1', 'keyword2'],
    'attributes' => [
        'className' => 'custom-class'
    ],
    'innerBlocks' => []
];
```

### Variation Options

| Option | Type | Description |
|--------|------|-------------|
| `name` | string | Unique variation identifier |
| `title` | string | Human-readable title |
| `description` | string | Description for users |
| `category` | string | Block category |
| `keywords` | array | Search keywords |
| `attributes` | object | Default block attributes |
| `innerBlocks` | array | Nested blocks |
| `icon` | string | Custom icon |
| `scope` | array | Where variation is available |

## Advanced Variation Examples

### Quote Block Variations

```php
<?php
/**
 * Quote Block Variations
 *
 * @package YourProject
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_filter('deodar_core_quote_variations', function($variations) {
    
    // Default Quote
    $variations[] = [
        'name' => 'default',
        'title' => 'Default Quote',
        'description' => 'A standard quote block with default styling',
        'category' => 'text',
        'keywords' => ['quote', 'testimonial', 'default'],
        'attributes' => [
            'className' => 'is-default'
        ],
        'innerBlocks' => []
    ];
    
    // Large Quote
    $variations[] = [
        'name' => 'large',
        'title' => 'Large Quote',
        'description' => 'A quote block with larger text styling',
        'category' => 'text',
        'keywords' => ['quote', 'testimonial', 'large'],
        'attributes' => [
            'className' => 'is-large'
        ],
        'innerBlocks' => []
    ];
    
    // Pull Quote
    $variations[] = [
        'name' => 'pull-quote',
        'title' => 'Pull Quote',
        'description' => 'A quote block styled as a pull quote',
        'category' => 'text',
        'keywords' => ['quote', 'testimonial', 'pull-quote'],
        'attributes' => [
            'className' => 'is-pull-quote'
        ],
        'innerBlocks' => []
    ];
    
    // Testimonial Quote
    $variations[] = [
        'name' => 'testimonial',
        'title' => 'Testimonial Quote',
        'description' => 'A quote block styled for testimonials',
        'category' => 'text',
        'keywords' => ['quote', 'testimonial', 'review'],
        'attributes' => [
            'className' => 'is-testimonial'
        ],
        'innerBlocks' => []
    ];
    
    return $variations;
});
```

### Button Block Variations

```php
<?php
/**
 * Button Block Variations
 *
 * @package YourProject
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_filter('deodar_core_button_variations', function($variations) {
    
    // Default Button
    $variations[] = [
        'name' => 'default',
        'title' => 'Default Button',
        'description' => 'A standard button with default styling',
        'category' => 'design',
        'keywords' => ['button', 'link', 'default'],
        'attributes' => [
            'className' => 'is-default'
        ],
        'innerBlocks' => []
    ];
    
    // Primary Button
    $variations[] = [
        'name' => 'primary',
        'title' => 'Primary Button',
        'description' => 'A primary button with highlighted styling',
        'category' => 'design',
        'keywords' => ['button', 'link', 'primary'],
        'attributes' => [
            'className' => 'is-primary'
        ],
        'innerBlocks' => []
    ];
    
    // Outline Button
    $variations[] = [
        'name' => 'outline',
        'title' => 'Outline Button',
        'description' => 'A button with outline styling',
        'category' => 'design',
        'keywords' => ['button', 'link', 'outline'],
        'attributes' => [
            'className' => 'is-outline'
        ],
        'innerBlocks' => []
    ];
    
    return $variations;
});
```

## Styling Block Variations

### Automatic CSS Loading Integration

Block variations work seamlessly with Deodar's automatic asset loading system. When you create variations for non-ACF blocks, the corresponding CSS files are automatically enqueued and available for styling.

#### How It Works

1. **Variation Creation**: You create variation files (e.g., `paragraph.variations.php`)
2. **Build Process**: Your SCSS files are compiled to build files (e.g., `paragraph.build.css`)
3. **Automatic Enqueuing**: Deodar automatically loads the build CSS file
4. **Style Application**: CSS classes from variations are applied to blocks

#### CSS Classes

Each variation automatically gets a CSS class based on its name:

```scss
// Paragraph block variations
.wp-block-paragraph {
    // Base styles
    
    &.is-default {
        // Default variation styles
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    &.is-highlighted {
        // Highlighted variation styles
        background-color: #f8f9fa;
        padding: 1rem;
        border-left: 4px solid #007cba;
        border-radius: 4px;
    }
    
    &.is-large-text {
        // Large text variation styles
        font-size: 1.25rem;
        line-height: 1.5;
        font-weight: 500;
    }
}

// Quote block variations
.wp-block-quote {
    // Base styles
    
    &.is-large {
        // Large quote variation styles
        font-size: 1.5rem;
        padding: 2rem;
        background-color: #f8f9fa;
        border-radius: 8px;
    }
    
    &.is-pull-quote {
        // Pull quote variation styles
        border-left: 4px solid #007cba;
        padding-left: 1.5rem;
        margin: 2rem 0;
        font-style: italic;
    }
    
    &.is-testimonial {
        // Testimonial variation styles
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        
        cite {
            display: block;
            margin-top: 1rem;
            font-style: normal;
            font-weight: 600;
            color: #666;
        }
    }
}

// Button block variations
.wp-block-button {
    &.is-default {
        // Default button variation styles
        .wp-block-button__link {
            background-color: #007cba;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.3s ease;
            
            &:hover {
                background-color: #005a87;
            }
        }
    }
    
    &.is-primary {
        // Primary button variation styles
        .wp-block-button__link {
            background-color: #28a745;
            color: white;
            padding: 1rem 2rem;
            border-radius: 6px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            
            &:hover {
                background-color: #218838;
            }
        }
    }
    
    &.is-outline {
        // Outline button variation styles
        .wp-block-button__link {
            background-color: transparent;
            color: #007cba;
            border: 2px solid #007cba;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            
            &:hover {
                background-color: #007cba;
                color: white;
            }
        }
    }
}
```

### Responsive Variations

```scss
// Responsive variation styles
.wp-block-paragraph {
    &.is-highlighted {
        @media (max-width: 768px) {
            padding: 0.75rem;
            margin: 1rem 0;
        }
    }
    
    &.is-large-text {
        @media (max-width: 768px) {
            font-size: 1.125rem;
        }
    }
}

.wp-block-quote {
    &.is-large {
        @media (max-width: 768px) {
            font-size: 1.25rem;
            padding: 1.5rem;
        }
    }
    
    &.is-testimonial {
        @media (max-width: 768px) {
            padding: 1.5rem;
            margin: 1rem 0;
        }
    }
}

.wp-block-button {
    &.is-primary {
        @media (max-width: 768px) {
            .wp-block-button__link {
                padding: 0.75rem 1.5rem;
                font-size: 0.9rem;
            }
        }
    }
    
    &.is-outline {
        @media (max-width: 768px) {
            .wp-block-button__link {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }
        }
    }
}
```

## Using Variations in Templates

### CSS Integration

Block variations work automatically through CSS classes. The variation classes are applied to the block automatically, and the corresponding CSS files are automatically loaded by Deodar:

```html
<!-- Default paragraph block -->
<p class="wp-block-paragraph">Default paragraph content</p>

<!-- Paragraph block with highlighted variation -->
<p class="wp-block-paragraph is-highlighted">Highlighted paragraph content</p>

<!-- Paragraph block with large text variation -->
<p class="wp-block-paragraph is-large-text">Large text paragraph content</p>

<!-- Quote block with testimonial variation -->
<blockquote class="wp-block-quote is-testimonial">
    <p>Testimonial quote content</p>
    <cite>Author Name</cite>
</blockquote>

<!-- Button block with primary variation -->
<div class="wp-block-button is-primary">
    <a class="wp-block-button__link" href="#">Primary Button</a>
</div>

<!-- Button block with outline variation -->
<div class="wp-block-button is-outline">
    <a class="wp-block-button__link" href="#">Outline Button</a>
</div>
```


## Best Practices

### Variation Design

1. **Clear Naming**: Use descriptive names for variations
2. **Consistent Structure**: Maintain consistent variation structure
3. **Logical Grouping**: Group related variations together
4. **User-Friendly**: Provide clear titles and descriptions

### Performance

1. **Minimal Overhead**: Keep variations lightweight
2. **Efficient Loading**: Load variations only when needed
3. **Optimized Assets**: Optimize variation-specific assets
4. **Caching**: Cache variation configurations

### Accessibility

1. **Semantic HTML**: Use proper semantic markup
2. **ARIA Labels**: Add appropriate ARIA labels
3. **Keyboard Navigation**: Ensure keyboard accessibility
4. **Screen Readers**: Test with screen readers

## Examples

### Complete Variation Example

```php
<?php
/**
 * Complete Paragraph Block Variations
 *
 * @package YourProject
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_filter('deodar_paragraph_variations', function($variations) {
    
    // Default Paragraph
    $variations[] = [
        'name' => 'default',
        'title' => 'Default Paragraph',
        'description' => 'A standard paragraph with default styling',
        'category' => 'text',
        'keywords' => ['paragraph', 'text', 'default'],
        'attributes' => [
            'className' => 'is-default'
        ],
        'innerBlocks' => []
    ];
    
    // Highlighted Paragraph
    $variations[] = [
        'name' => 'highlighted',
        'title' => 'Highlighted Paragraph',
        'description' => 'A paragraph with highlighted background styling',
        'category' => 'text',
        'keywords' => ['paragraph', 'text', 'highlighted'],
        'attributes' => [
            'className' => 'is-highlighted'
        ],
        'innerBlocks' => []
    ];
    
    // Large Text Paragraph
    $variations[] = [
        'name' => 'large-text',
        'title' => 'Large Text Paragraph',
        'description' => 'A paragraph with larger text styling',
        'category' => 'text',
        'keywords' => ['paragraph', 'text', 'large'],
        'attributes' => [
            'className' => 'is-large-text'
        ],
        'innerBlocks' => []
    ];
    
    return $variations;
});
```

## Troubleshooting

### Common Issues

**Variations Not Appearing**
- Check file naming convention
- Verify filter hook names
- Ensure proper file structure
- Check WordPress admin for errors

**Styles Not Loading**
- Verify CSS class names
- Check SCSS compilation
- Ensure proper file paths
- Test with different variations

**Build Files Not Loading Automatically**
- Verify build file naming: `[block-name].build.css`
- Check build file location: `blocks/[namespace]/[block]/build/`
- Ensure build files exist after compilation
- Check file permissions
- Verify Deodar is scanning the correct directory

**CSS Not Being Enqueued**
- Confirm the block is non-ACF (ACF blocks handle assets differently)
- Check if build files are in the correct location
- Verify the block namespace and name match the directory structure
- Ensure WordPress `wp_enqueue_block_style()` is working
- Check browser developer tools for 404 errors


**Build Process Issues**
- Ensure SCSS files are being compiled to build files
- Check build tool configuration
- Verify source file naming matches build file naming
- Test compilation manually

## Next Steps

Now that you understand working with non-ACF blocks:

- [Master the CLI Tool](./cli-tool)
- [Learn about Production Builds](./production-builds)
- [Learn about Post Types](./post-types)
- [Explore Taxonomies](./taxonomies)
- [Discover Customizations](./customizations)

---

Ready to work with non-ACF blocks and create amazing variations? Let's master the CLI tool next!
