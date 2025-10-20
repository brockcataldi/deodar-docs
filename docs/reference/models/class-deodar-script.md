# class-deodar-script.php

**File:** `lib/models/class-deodar-script.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The `Deodar_Script` class extends `Deodar_Enqueuable` to provide JavaScript file management functionality. It handles the enqueuing of JavaScript files with WordPress's `wp_enqueue_script` function.

## Class Declaration

```php
class Deodar_Script extends Deodar_Enqueuable
```

## Properties

### `$args`
```php
private array|bool $args = false;
```
Arguments for the script. Can be a boolean for 'in_footer' or an array of arguments.

## Methods

### Constructor

#### `__construct($data)`
```php
public function __construct(array $data)
```
**Since:** 2.0.0  
**Parameters:**
- `array $data` - The script configuration data

**Returns:** void  
**Throws:** `InvalidArgumentException` - If the script configuration is invalid

**Inherited Fields from Deodar_Enqueuable:**
- `handle` (string, required) - The script handle
- `url` (string, optional) - Absolute URL to the script
- `file` (string, optional) - Relative file path to the script
- `dependencies` (array, optional) - Script dependencies
- `version` (string|bool|null, optional) - Script version
- `template` (string|array|null, optional) - Template restrictions
- `frontend` (bool, optional) - Load on frontend (default: true)
- `backend` (bool, optional) - Load on backend (default: false)

**Additional Fields:**
- `args` (array|bool, optional) - Script arguments (in_footer or array of arguments)

**Note:** Either `url` or `file` must be provided.

### Public Methods

#### `enqueue($url_root, $end)`
```php
public function enqueue(string $url_root, bool $end): void
```
**Since:** 2.0.0  
**Parameters:**
- `string $url_root` - The base source URL (required if 'file' is used instead of 'url')
- `bool $end` - Which end is being loaded (true = frontend, false = backend)

**Returns:** void  

Enqueues the script using WordPress's `wp_enqueue_script` function. The method:
1. Checks if the script should be enqueued using `should_enqueue()`
2. Calls `wp_enqueue_script()` with the appropriate parameters
3. Uses the resolved URL from `get_url()`

## WordPress Integration

This class integrates with WordPress's script system by:

1. **Script Registration**: Uses `wp_enqueue_script()` to register and enqueue scripts
2. **Dependency Management**: Handles script dependencies automatically
3. **Version Control**: Supports versioning for cache busting
4. **Footer Loading**: Supports loading scripts in the footer
5. **Conditional Loading**: Supports template-based and frontend/backend conditional loading

## Configuration Validation

The constructor validates the `args` field and throws `InvalidArgumentException` for:

- Invalid `args` type (must be array, boolean, or removed)

## Related Classes

- `Deodar_Enqueuable` - Parent class providing base functionality
- `Deodar_Style` - Sister class for stylesheet management
- `Deodar` - Main class that manages script instances

## Related Functions

- `wp_enqueue_script()` - WordPress function used internally
- `_deodar_get_template_name()` - Used for template matching
