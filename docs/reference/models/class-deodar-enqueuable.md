# class-deodar-enqueuable.php

**File:** `lib/models/class-deodar-enqueuable.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The `Deodar_Enqueuable` class is an abstract base class that provides common functionality for managing static assets (stylesheets and scripts) in WordPress. It handles URL resolution, template-based loading, and frontend/backend control.

## Class Declaration

```php
abstract class Deodar_Enqueuable
```

## Properties

### Public Properties

#### `$handle`
```php
public string|null $handle = null;
```
The handle (name) of the enqueuable asset.

#### `$dependencies`
```php
public array $dependencies = array();
```
Array of asset dependencies.

#### `$version`
```php
public string|bool|null $version = false;
```
The version number of the asset. Can be a string, boolean (false), or null.

### Private Properties

#### `$url`
```php
private string|null $url = null;
```
The absolute URL of the asset.

#### `$file`
```php
private string|null $file = null;
```
The relative file path of the asset.

#### `$template`
```php
private string|array|null $template = null;
```
The template(s) the asset will load against. If null, it will always load.

#### `$frontend`
```php
private bool $frontend = true;
```
Whether the asset should be loaded on the frontend.

#### `$backend`
```php
private bool $backend = false;
```
Whether the asset should be loaded on the backend (admin).

## Methods

### Constructor

#### `__construct($data)`
```php
public function __construct(array $data)
```
**Since:** 2.0.0  
**Parameters:**
- `array $data` - The enqueuable configuration data

**Returns:** void  
**Throws:** `InvalidArgumentException` - If the configuration is invalid

**Required Fields:**
- `handle` (string) - The asset handle

**Optional Fields:**
- `url` (string) - Absolute URL to the asset
- `file` (string) - Relative file path to the asset
- `dependencies` (array) - Asset dependencies
- `version` (string|bool|null) - Asset version
- `template` (string|array|null) - Template restrictions
- `frontend` (bool) - Load on frontend (default: true)
- `backend` (bool) - Load on backend (default: false)

**Note:** Either `url` or `file` must be provided.

### Abstract Methods

#### `enqueue($url_root, $end)`
```php
abstract public function enqueue(string $url_root, bool $end): void
```
**Since:** 2.0.0  
**Parameters:**
- `string $url_root` - The root URL for relative paths
- `bool $end` - Which end is being loaded (true = frontend, false = backend)

**Returns:** void  

Must be implemented by child classes to handle the actual enqueuing logic.

### Public Methods

#### `get_url($url_root)`
```php
public function get_url(string $url_root): string
```
**Since:** 2.0.0  
**Parameters:**
- `string $url_root` - The root URL for relative paths

**Returns:** `string` - The full URL

Converts relative file paths to usable URLs by combining with the root URL.

#### `should_enqueue($end)`
```php
public function should_enqueue(bool $end): bool
```
**Since:** 2.0.0  
**Parameters:**
- `bool $end` - Which end is being loaded (true = frontend, false = backend)

**Returns:** `bool` - Whether the asset should be enqueued

Determines if the asset should be enqueued based on:
- Frontend/backend settings
- Template restrictions

## Configuration Validation

The constructor validates all configuration data and throws `InvalidArgumentException` for:

- Missing required `handle` field
- Invalid `handle` type (must be string)
- Missing both `url` and `file` fields
- Invalid `url` type (must be string)
- Invalid `file` type (must be string)
- Invalid `dependencies` type (must be array)
- Invalid `version` type (must be string, bool, or null)
- Invalid `template` type (must be string, array, or null)
- Invalid `frontend` type (must be bool)
- Invalid `backend` type (must be bool)

## Template Matching

When `template` is set, the asset will only load if the current page template matches:

- **String**: Exact template name match
- **Array**: Template name must be in the array
- **Null**: No template restriction (always loads)

Template name is determined by `_deodar_get_template_name()` function.

## Related Classes

- `Deodar_Script` - Extends this class for JavaScript management
- `Deodar_Style` - Extends this class for CSS management
- `Deodar` - Main class that uses these enqueuable assets

## Related Functions

- `_deodar_get_template_name()` - Gets current template name
- `wp_enqueue_script()` - WordPress function for scripts
- `wp_enqueue_style()` - WordPress function for styles
