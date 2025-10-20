# class-deodar-support.php

**File:** `lib/models/class-deodar-support.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The `Deodar_Support` class provides a utility for managing WordPress theme support features. It handles the registration of theme supports with optional arguments, providing a clean interface for adding theme functionality.

## Class Declaration

```php
class Deodar_Support
```

## Properties

### `$feature`
```php
private string|null $feature;
```
The feature (name) of the theme support.

### `$args`
```php
private string|array|null $args = null;
```
The arguments for the theme support.

## Methods

### Constructor

#### `__construct($data)`
```php
public function __construct(string|array $data)
```
**Since:** 2.0.0  
**Parameters:**
- `string|array $data` - The theme support data

**Returns:** void  
**Throws:** `InvalidArgumentException` - If the data is invalid

**String Format:**
```php
new Deodar_Support('post-thumbnails');
```

**Array Format:**
```php
new Deodar_Support([
    'feature' => 'custom-logo',
    'args' => [
        'height' => 100,
        'width' => 100
    ]
]);
```

### Public Methods

#### `add()`
```php
public function add()
```
**Since:** 2.0.0  
**Returns:** void  

Adds the theme support using WordPress's `add_theme_support()` function. If no arguments are provided, it calls the function with just the feature name. If arguments are provided, it passes them as the second parameter.

## Common Theme Support Features

### Basic Features
- `'post-thumbnails'` - Featured images for posts
- `'title-tag'` - Automatic title tag generation
- `'custom-background'` - Custom background color/image
- `'custom-header'` - Custom header image
- `'custom-logo'` - Custom site logo
- `'html5'` - HTML5 markup support
- `'post-formats'` - Post format support
- `'editor-styles'` - Editor style support

### Advanced Features
- `'responsive-embeds'` - Responsive embed support
- `'wp-block-styles'` - Block style support
- `'align-wide'` - Wide alignment support
- `'editor-color-palette'` - Custom color palette
- `'editor-font-sizes'` - Custom font sizes
- `'editor-gradient-presets'` - Custom gradients

## WordPress Integration

This class integrates with WordPress's theme support system by:

1. **Automatic Registration**: Deodar automatically registers theme supports during `after_setup_theme`
2. **Hook Integration**: Uses the `after_setup_theme` hook for registration
3. **Function Integration**: Uses WordPress's `add_theme_support()` function

## Configuration Validation

The constructor validates configuration data and throws `InvalidArgumentException` for:

- Invalid data type (must be string or associative array)
- Missing `feature` field in array format
- Invalid `feature` type (must be string)
- Invalid `args` type (must be array if provided)

## Related Classes

- `Deodar` - Main class that manages support instances
- WordPress Theme Support Functions

## Related Functions

- `add_theme_support()` - WordPress function used internally
- `current_theme_supports()` - Check if theme supports a feature
- `get_theme_support()` - Get theme support arguments
