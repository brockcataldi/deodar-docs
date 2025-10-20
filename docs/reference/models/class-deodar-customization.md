# class-deodar-customization.php

**File:** `lib/models/class-deodar-customization.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The `Deodar_Customization` class is an abstract base class for creating WordPress customizer functionality. It provides a foundation for extending WordPress's customizer with custom options and controls.

## Class Declaration

```php
abstract class Deodar_Customization
```

## Methods

### Constructor

#### `__construct()`
```php
public function __construct()
```
**Since:** 2.0.0  
**Returns:** void  

Empty constructor that can be overridden by child classes.

### Abstract Methods

#### `register($wp_customize)`
```php
abstract public function register(WP_Customize_Manager $wp_customize): void
```
**Since:** 2.0.0  
**Parameters:**
- `WP_Customize_Manager $wp_customize` - The WordPress customizer manager

**Returns:** void  

**Description:** Must be implemented by child classes to register customizer options, sections, settings, and controls.

**WordPress Reference:** [Customizer Objects](https://developer.wordpress.org/themes/customize-api/customizer-objects/)

## File Structure

Customization classes should be placed in the `includes/customizations/` directory and follow this naming convention:

```php
includes/
└── customizations/
    ├── class-my-theme-customization.php
    ├── class-header-customization.php
    └── class-footer-customization.php
```

**File naming pattern:** `class-{name}.customization.php`

**Class naming pattern:** `{Name}_Customization`

## WordPress Customizer Integration

This class integrates with WordPress's customizer system by:

1. **Automatic Registration**: Deodar automatically discovers and registers customization classes
2. **Hook Integration**: Uses the `customize_register` hook for registration
3. **Manager Access**: Provides access to the `WP_Customize_Manager` for full customizer functionality

## Customizer Objects

The `register()` method has access to all WordPress customizer objects:

- **Sections** - Group related controls
- **Settings** - Store customizer values
- **Controls** - User interface elements
- **Panels** - Group multiple sections

## Sanitization

Always use appropriate sanitization callbacks for settings:

- `sanitize_text_field()` - Text inputs
- `sanitize_email()` - Email inputs
- `sanitize_url()` - URL inputs
- `sanitize_hex_color()` - Color inputs
- `absint()` - Integer inputs
- `esc_url_raw()` - Image/URL inputs

## Related Classes

- `Deodar` - Main class that manages customization instances
- `WP_Customize_Manager` - WordPress customizer manager
- `WP_Customize_Control` - WordPress customizer control base class

## Related Functions

- `add_action('customize_register', ...)` - WordPress hook used internally
- `get_theme_mod()` - Retrieve customizer values
- `set_theme_mod()` - Set customizer values
