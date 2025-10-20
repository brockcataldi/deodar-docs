# class-deodar-style.php

**File:** `lib/models/class-deodar-style.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The `Deodar_Style` class extends `Deodar_Enqueuable` to provide CSS stylesheet management functionality. It handles the enqueuing of CSS files with WordPress's `wp_enqueue_style` function.

## Class Declaration

```php
class Deodar_Style extends Deodar_Enqueuable
```

## Properties

### `$media`
```php
private string $media = '';
```
The media attribute of the stylesheet (e.g., 'all', 'screen', 'print').

## Methods

### Constructor

#### `__construct($data)`
```php
public function __construct(array $data)
```
**Since:** 2.0.0  
**Parameters:**
- `array $data` - The style configuration data

**Returns:** void  
**Throws:** `InvalidArgumentException` - If the style configuration is invalid

**Inherited Fields from Deodar_Enqueuable:**
- `handle` (string, required) - The style handle
- `url` (string, optional) - Absolute URL to the stylesheet
- `file` (string, optional) - Relative file path to the stylesheet
- `dependencies` (array, optional) - Style dependencies
- `version` (string|bool|null, optional) - Style version
- `template` (string|array|null, optional) - Template restrictions
- `frontend` (bool, optional) - Load on frontend (default: true)
- `backend` (bool, optional) - Load on backend (default: false)

**Additional Fields:**
- `media` (string, optional) - Media attribute for the stylesheet (default: 'all')

**Note:** Either `url` or `file` must be provided.

### Public Methods

#### `enqueue($url_root, $end)`
```php
public function enqueue(string $url_root, bool $end): void
```
**Since:** 2.0.0  
**Parameters:**
- `string $url_root` - The base source URL
- `bool $end` - Which end is being loaded (true = frontend, false = backend)

**Returns:** void  

Enqueues the stylesheet using WordPress's `wp_enqueue_style` function. The method:
1. Checks if the style should be enqueued using `should_enqueue()`
2. Calls `wp_enqueue_style()` with the appropriate parameters
3. Uses the resolved URL from `get_url()`

## Media Attribute Values

Common media attribute values for stylesheets:

- `'all'` - All media types (default)
- `'screen'` - Computer screens
- `'print'` - Printers and print preview
- `'handheld'` - Handheld devices
- `'projection'` - Projected presentations
- `'tv'` - Television-type devices
- `'braille'` - Braille tactile feedback devices
- `'embossed'` - Paged braille printers
- `'speech'` - Speech synthesizers

## WordPress Integration

This class integrates with WordPress's style system by:

1. **Style Registration**: Uses `wp_enqueue_style()` to register and enqueue stylesheets
2. **Dependency Management**: Handles stylesheet dependencies automatically
3. **Version Control**: Supports versioning for cache busting
4. **Media Control**: Supports media-specific stylesheet loading
5. **Conditional Loading**: Supports template-based and frontend/backend conditional loading

## Configuration Validation

The constructor validates the `media` field and throws `InvalidArgumentException` for:

- Invalid `media` type (must be string or removed)

## Related Classes

- `Deodar_Enqueuable` - Parent class providing base functionality
- `Deodar_Script` - Sister class for JavaScript management
- `Deodar` - Main class that manages style instances

## Related Functions

- `wp_enqueue_style()` - WordPress function used internally
- `_deodar_get_template_name()` - Used for template matching
