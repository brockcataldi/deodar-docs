---
sidebar_position: 8
---

# Customizations

Deodar provides seamless integration with the WordPress Customizer, allowing you to create custom theme options and settings that users can modify through the WordPress admin interface. This guide will show you how to create and manage customizations.

## Overview

Deodar's customization system provides:

- **WordPress Customizer Integration**: Full integration with the WordPress Customizer API
- **Automatic Loading**: Customizations are automatically loaded from the `includes/customizations/` directory
- **Class-Based Structure**: Each customization is a separate class for better organization
- **Standardized Naming**: Consistent naming conventions for customizations
- **Production Ready**: Optimized for both development and production

## Creating Customizations

Create customization files manually in the `includes/customizations/` directory:

```bash
# Navigate to your project directory
cd your-project

# Create the customization file manually
touch includes/customizations/class-header-settings.customization.php
```

1. **Create Customization File**
   ```
   includes/customizations/class-header-settings.customization.php
   ```

2. **Create the Customization Class**
   ```php
   <?php
   /**
    * Header Settings Customization
    *
    * @package YourProject
    * @since 1.0.0
    */
   
   if (!defined('ABSPATH')) {
       exit;
   }
   
   class Header_Settings_Customization {
       
       /**
        * Register customization settings
        *
        * @param WP_Customize_Manager $wp_customize WordPress customizer manager
        * @return void
        */
       public function register($wp_customize) {
           
           // Add Header Settings Panel
           $wp_customize->add_panel('header_settings', [
               'title' => 'Header Settings',
               'description' => 'Customize your header appearance and behavior',
               'priority' => 30
           ]);
           
           // Add Header Logo Section
           $wp_customize->add_section('header_logo', [
               'title' => 'Header Logo',
               'description' => 'Customize your header logo settings',
               'panel' => 'header_settings'
           ]);
           
           // Add Logo Upload Setting
           $wp_customize->add_setting('header_logo_image', [
               'default' => '',
               'sanitize_callback' => 'absint'
           ]);
           
           // Add Logo Upload Control
           $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'header_logo_image', [
               'label' => 'Header Logo',
               'description' => 'Upload your header logo image',
               'section' => 'header_logo',
               'mime_type' => 'image'
           ]));
           
           // Add Logo Width Setting
           $wp_customize->add_setting('header_logo_width', [
               'default' => '200',
               'sanitize_callback' => 'absint'
           ]);
           
           // Add Logo Width Control
           $wp_customize->add_control('header_logo_width', [
               'label' => 'Logo Width (px)',
               'description' => 'Set the width of your header logo',
               'section' => 'header_logo',
               'type' => 'number',
               'input_attrs' => [
                   'min' => 50,
                   'max' => 500,
                   'step' => 10
               ]
           ]);
           
           // Add Header Colors Section
           $wp_customize->add_section('header_colors', [
               'title' => 'Header Colors',
               'description' => 'Customize your header colors',
               'panel' => 'header_settings'
           ]);
           
           // Add Background Color Setting
           $wp_customize->add_setting('header_background_color', [
               'default' => '#ffffff',
               'sanitize_callback' => 'sanitize_hex_color'
           ]);
           
           // Add Background Color Control
           $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_background_color', [
               'label' => 'Header Background Color',
               'section' => 'header_colors'
           ]));
           
           // Add Text Color Setting
           $wp_customize->add_setting('header_text_color', [
               'default' => '#333333',
               'sanitize_callback' => 'sanitize_hex_color'
           ]);
           
           // Add Text Color Control
           $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_text_color', [
               'label' => 'Header Text Color',
               'section' => 'header_colors'
           ]));
       }
   }
   ```

## Customization Structure

### File Organization

```
includes/customizations/
├── class-header-settings.customization.php
├── class-footer-settings.customization.php
├── class-typography-settings.customization.php
└── index.php                    # Security file
```

### Naming Conventions

- **File Name**: `class-[name].customization.php`
- **Class Name**: `[Name]_Customization`
- **Method Name**: `register($wp_customize)`

## Customization Types

### Panels

Panels group related sections together:

```php
$wp_customize->add_panel('header_settings', [
    'title' => 'Header Settings',
    'description' => 'Customize your header appearance and behavior',
    'priority' => 30
]);
```

### Sections

Sections group related controls:

```php
$wp_customize->add_section('header_logo', [
    'title' => 'Header Logo',
    'description' => 'Customize your header logo settings',
    'panel' => 'header_settings'
]);
```

### Settings

Settings store the actual values:

```php
$wp_customize->add_setting('header_logo_image', [
    'default' => '',
    'sanitize_callback' => 'absint'
]);
```

### Controls

Controls provide the user interface:

```php
$wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'header_logo_image', [
    'label' => 'Header Logo',
    'description' => 'Upload your header logo image',
    'section' => 'header_logo',
    'mime_type' => 'image'
]));
```

## Control Types

### Text Controls

```php
// Text Input
$wp_customize->add_control('header_title', [
    'label' => 'Header Title',
    'section' => 'header_text',
    'type' => 'text'
]);

// Textarea
$wp_customize->add_control('header_description', [
    'label' => 'Header Description',
    'section' => 'header_text',
    'type' => 'textarea'
]);

// Number Input
$wp_customize->add_control('header_logo_width', [
    'label' => 'Logo Width (px)',
    'section' => 'header_logo',
    'type' => 'number',
    'input_attrs' => [
        'min' => 50,
        'max' => 500,
        'step' => 10
    ]
]);
```

### Color Controls

```php
// Color Picker
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_background_color', [
    'label' => 'Header Background Color',
    'section' => 'header_colors'
]));
```

### Media Controls

```php
// Image Upload
$wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'header_logo_image', [
    'label' => 'Header Logo',
    'section' => 'header_logo',
    'mime_type' => 'image'
]));

// File Upload
$wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'header_background_video', [
    'label' => 'Header Background Video',
    'section' => 'header_media',
    'mime_type' => 'video'
]));
```

### Select Controls

```php
// Select Dropdown
$wp_customize->add_control('header_layout', [
    'label' => 'Header Layout',
    'section' => 'header_layout',
    'type' => 'select',
    'choices' => [
        'horizontal' => 'Horizontal',
        'vertical' => 'Vertical',
        'centered' => 'Centered'
    ]
]);

// Radio Buttons
$wp_customize->add_control('header_alignment', [
    'label' => 'Header Alignment',
    'section' => 'header_layout',
    'type' => 'radio',
    'choices' => [
        'left' => 'Left',
        'center' => 'Center',
        'right' => 'Right'
    ]
]);

// Checkbox
$wp_customize->add_control('header_sticky', [
    'label' => 'Sticky Header',
    'section' => 'header_layout',
    'type' => 'checkbox'
]);
```

## Advanced Customizations

### Custom Control Classes

Create custom control classes for complex UI elements:

```php
class Custom_Range_Control extends WP_Customize_Control {
    
    public $type = 'range';
    
    public function render_content() {
        ?>
        <label>
            <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
            <input type="range" <?php $this->input_attrs(); ?> value="<?php echo esc_attr($this->value()); ?>" <?php $this->link(); ?> />
            <span class="customize-control-description"><?php echo esc_html($this->description); ?></span>
        </label>
        <?php
    }
}

// Use the custom control
$wp_customize->add_control(new Custom_Range_Control($wp_customize, 'header_opacity', [
    'label' => 'Header Opacity',
    'section' => 'header_colors',
    'input_attrs' => [
        'min' => 0,
        'max' => 100,
        'step' => 5
    ]
]));
```

### Conditional Controls

Show/hide controls based on other settings:

```php
// Add a setting to control visibility
$wp_customize->add_setting('show_header_logo', [
    'default' => true,
    'sanitize_callback' => 'wp_validate_boolean'
]);

// Add the control
$wp_customize->add_control('show_header_logo', [
    'label' => 'Show Header Logo',
    'section' => 'header_logo',
    'type' => 'checkbox'
]);

// Add JavaScript to control visibility
add_action('customize_controls_enqueue_scripts', function() {
    wp_enqueue_script('customize-controls', get_template_directory_uri() . '/js/customize-controls.js', ['jquery'], '1.0.0', true);
});
```

### JavaScript for Conditional Controls

```javascript
// customize-controls.js
(function($) {
    wp.customize('show_header_logo', function(value) {
        value.bind(function(newval) {
            if (newval) {
                $('#customize-control-header_logo_image').show();
                $('#customize-control-header_logo_width').show();
            } else {
                $('#customize-control-header_logo_image').hide();
                $('#customize-control-header_logo_width').hide();
            }
        });
    });
})(jQuery);
```

## Using Customization Values

### In Templates

```php
// Get customization values
$logo_image = get_theme_mod('header_logo_image');
$logo_width = get_theme_mod('header_logo_width', 200);
$background_color = get_theme_mod('header_background_color', '#ffffff');
$text_color = get_theme_mod('header_text_color', '#333333');

// Use in template
if ($logo_image):
    $logo_url = wp_get_attachment_image_url($logo_image, 'full');
    ?>
    <img src="<?php echo esc_url($logo_url); ?>" alt="Logo" style="width: <?php echo esc_attr($logo_width); ?>px;">
    <?php
endif;
```

### In CSS

```php
// Add dynamic CSS
add_action('wp_head', function() {
    $background_color = get_theme_mod('header_background_color', '#ffffff');
    $text_color = get_theme_mod('header_text_color', '#333333');
    
    if ($background_color || $text_color):
        ?>
        <style>
            .site-header {
                <?php if ($background_color): ?>
                    background-color: <?php echo esc_attr($background_color); ?>;
                <?php endif; ?>
                <?php if ($text_color): ?>
                    color: <?php echo esc_attr($text_color); ?>;
                <?php endif; ?>
            }
        </style>
        <?php
    endif;
});
```

## Best Practices

### Organization

1. **Group Related Settings**: Use panels and sections to organize settings
2. **Logical Naming**: Use descriptive names for settings and controls
3. **Consistent Structure**: Follow consistent patterns across customizations
4. **Documentation**: Document complex customizations

### Security

1. **Sanitization**: Always sanitize user input
2. **Validation**: Validate data before saving
3. **Capabilities**: Check user capabilities when needed
4. **Nonces**: Use nonces for custom AJAX requests

### Performance

1. **Lazy Loading**: Load customizations only when needed
2. **Caching**: Cache expensive operations
3. **Minimal Overhead**: Keep customizations lightweight
4. **Efficient Queries**: Optimize database queries

## Examples

### Complete Header Customization Example

```php
<?php
/**
 * Header Settings Customization
 *
 * @package YourProject
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class Header_Settings_Customization {
    
    public function register($wp_customize) {
        
        // Add Header Settings Panel
        $wp_customize->add_panel('header_settings', [
            'title' => 'Header Settings',
            'description' => 'Customize your header appearance and behavior',
            'priority' => 30
        ]);
        
        // Add Header Logo Section
        $wp_customize->add_section('header_logo', [
            'title' => 'Header Logo',
            'description' => 'Customize your header logo settings',
            'panel' => 'header_settings'
        ]);
        
        // Logo Image Setting
        $wp_customize->add_setting('header_logo_image', [
            'default' => '',
            'sanitize_callback' => 'absint'
        ]);
        
        $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'header_logo_image', [
            'label' => 'Header Logo',
            'description' => 'Upload your header logo image',
            'section' => 'header_logo',
            'mime_type' => 'image'
        ]));
        
        // Logo Width Setting
        $wp_customize->add_setting('header_logo_width', [
            'default' => '200',
            'sanitize_callback' => 'absint'
        ]);
        
        $wp_customize->add_control('header_logo_width', [
            'label' => 'Logo Width (px)',
            'description' => 'Set the width of your header logo',
            'section' => 'header_logo',
            'type' => 'number',
            'input_attrs' => [
                'min' => 50,
                'max' => 500,
                'step' => 10
            ]
        ]);
        
        // Add Header Colors Section
        $wp_customize->add_section('header_colors', [
            'title' => 'Header Colors',
            'description' => 'Customize your header colors',
            'panel' => 'header_settings'
        ]);
        
        // Background Color Setting
        $wp_customize->add_setting('header_background_color', [
            'default' => '#ffffff',
            'sanitize_callback' => 'sanitize_hex_color'
        ]);
        
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_background_color', [
            'label' => 'Header Background Color',
            'section' => 'header_colors'
        ]));
        
        // Text Color Setting
        $wp_customize->add_setting('header_text_color', [
            'default' => '#333333',
            'sanitize_callback' => 'sanitize_hex_color'
        ]);
        
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_text_color', [
            'label' => 'Header Text Color',
            'section' => 'header_colors'
        ]));
    }
}
```

## Troubleshooting

### Common Issues

**Customization Not Appearing**
- Check file naming convention
- Verify class name matches file name
- Ensure `register` method exists
- Check WordPress admin for errors

**Settings Not Saving**
- Verify sanitize_callback functions
- Check user capabilities
- Ensure proper control types
- Test with different user roles

**Values Not Updating**
- Check template code for proper function usage
- Verify setting names match
- Ensure proper escaping
- Test with different contexts

## Next Steps

Now that you understand customizations:

- [Discover Block Variations](./working-with-non-acf-blocks)
- [Master the CLI Tool](./cli-tool)
- [Learn about Post Types](./post-types)
- [Explore Taxonomies](./taxonomies)

---

Ready to customize your theme? Let's explore block variations next!
