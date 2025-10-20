# class-deodar.php

**File:** `lib/class-deodar.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The main `Deodar` class is the core of the plugin, handling initialization, configuration, and WordPress hook registration. It provides a modular foundation for WordPress development with ACF Pro integration.

## Class Declaration

```php
class Deodar
```

## Properties

### Public Properties

#### `$name`
```php
public string $name = '';
```
The name of the source (basically the folder name of the plugin or theme).

#### `$path_base`
```php
public string $path_base = '';
```
The file path location of the source.

#### `$path_blocks_dir`
```php
public string $path_blocks_dir = '';
```
The directory path of `/blocks/`.

#### `$path_acf_blocks_dir`
```php
public string $path_acf_blocks_dir = '';
```
The directory path of `/blocks/acf/`.

#### `$path_includes_dir`
```php
public string $path_includes_dir = '';
```
The directory path of `/includes/`.

#### `$path_field_groups_dir`
```php
public string $path_field_groups_dir = '';
```
The directory path of `/includes/field-groups/`.

#### `$path_post_types_dir`
```php
public string $path_post_types_dir = '';
```
The directory path of `/includes/post-types/`.

#### `$path_taxonomies_dir`
```php
public string $path_taxonomies_dir = '';
```
The directory path of `/includes/taxonomies/`.

#### `$path_options_pages_dir`
```php
public string $path_options_pages_dir = '';
```
The directory path of `/includes/options-pages/`.

#### `$url_base`
```php
public string $url_base = '';
```
The URL location of the source.

#### `$url_blocks_dir`
```php
public string $url_blocks_dir = '';
```
The URL path of `/blocks/`.

#### `$menus`
```php
public array $menus = array();
```
Associative array of menus to be registered.

#### `$scripts`
```php
public array $scripts = array();
```
Array of `Deodar_Script` objects bound to the source.

#### `$styles`
```php
public array $styles = array();
```
Array of `Deodar_Style` objects bound to the source.

#### `$supports`
```php
public array $supports = array();
```
Array of `Deodar_Support` objects bound to the source.

### Private Properties

#### `$paths_acf_blocks`
```php
private null|array $paths_acf_blocks = null;
```
Cached ACF block paths.

#### `$styles_blocks`
```php
private null|array $styles_blocks = null;
```
Cached block styles.

#### `$includes`
```php
private array $includes = array();
```
Cache of loaded includes.

## Methods

### Constructor

#### `__construct()`
```php
public function __construct()
```
**Since:** 2.0.0  
**Returns:** void  

Empty constructor meant to be overridden by child classes.

### Public Methods

#### `bind()`
```php
public function bind()
```
**Since:** 2.0.0  
**Returns:** void  

Binds all necessary WordPress hooks and filters:

- `acf/json/save_file_name` - Custom ACF JSON file naming
- `acf/json/save_paths` - ACF JSON save path configuration
- `acf/settings/load_json` - ACF JSON loading paths
- `admin_enqueue_scripts` - Admin script/style enqueuing
- `after_setup_theme` - Theme setup and configuration
- `customize_register` - WordPress customizer registration
- `init` - WordPress initialization
- `wp_enqueue_scripts` - Frontend script/style enqueuing

#### `save_file_name($filename, $post)`
```php
public function save_file_name($filename, $post)
```
**Since:** 2.0.0  
**Parameters:**
- `string $filename` - The current filename
- `array $post` - The field group data

**Returns:** string - The sanitized filename

**Hook:** `acf/json/save_file_name`

Customizes ACF JSON file naming by sanitizing the field group title.

#### `save_paths($paths, $post)`
```php
public function save_paths($paths, $post)
```
**Since:** 2.0.0  
**Parameters:**
- `array $paths` - The paths to save to
- `array $post` - The field group data

**Returns:** array - The save location

**Hook:** `acf/json/save_paths`

Determines where ACF JSON files should be saved based on field group type and location rules.

#### `load_json($paths)`
```php
public function load_json($paths)
```
**Since:** 2.0.0  
**Parameters:**
- `array $paths` - The default load paths

**Returns:** array - The load paths

**Hook:** `acf/settings/load_json`

Configures ACF JSON loading paths for field groups, post types, taxonomies, and options pages.

#### `admin_enqueue_scripts()`
```php
public function admin_enqueue_scripts()
```
**Since:** 2.0.0  
**Returns:** void  

**Hook:** `admin_enqueue_scripts`

Enqueues all registered styles and scripts for the admin area.

#### `after_setup_theme()`
```php
public function after_setup_theme()
```
**Since:** 2.0.0  
**Returns:** void  

**Hook:** `after_setup_theme`

Handles theme setup including:
- Configuration from filter data
- Walker loading
- Theme support registration
- Menu registration
- Block style enqueuing

#### `customize_register($wp_customize)`
```php
public function customize_register(WP_Customize_Manager $wp_customize)
```
**Since:** 2.0.0  
**Parameters:**
- `WP_Customize_Manager $wp_customize` - The WordPress customizer manager

**Returns:** void  

**Hook:** `customize_register`

Registers all customizer customizations.

#### `init()`
```php
public function init()
```
**Since:** 2.0.0  
**Returns:** void  

**Hook:** `init`

Registers all ACF block types.

#### `wp_enqueue_scripts()`
```php
public function wp_enqueue_scripts()
```
**Since:** 2.0.0  
**Returns:** void  

**Hook:** `wp_enqueue_scripts`

Enqueues all registered styles and scripts for the frontend.

### Private Methods

#### `configure($data)`
```php
private function configure($data)
```
**Since:** 2.0.0  
**Parameters:**
- `array $data` - Deodar config array

**Returns:** void  
**Throws:** `InvalidArgumentException` - If path and url aren't set

Configures the Deodar instance with provided data, setting up all paths, URLs, and hydrating objects.

#### `hydrate($items, $class_name)`
```php
private function hydrate(array $items, string $class_name): array
```
**Since:** 2.0.0  
**Parameters:**
- `array $items` - The config data to hydrate
- `string $class_name` - The class to hydrate the data to

**Returns:** array - The hydrated data

Converts configuration arrays into object instances.

#### `get_paths_acf_blocks()`
```php
private function get_paths_acf_blocks()
```
**Since:** 2.0.0  
**Returns:** string[] - Array of ACF block paths

Returns all directories in the `/blocks/acf/` path, cached for performance.

#### `get_block_styles()`
```php
private function get_block_styles()
```
**Since:** 2.0.0  
**Returns:** array - Array of `Deodar_Block_Style` objects

Creates and caches `Deodar_Block_Style` objects for all discovered blocks.

#### `load_includes($type, $pattern)`
```php
private function load_includes(string $type, string $pattern)
```
**Since:** 2.0.0  
**Parameters:**
- `string $type` - The type and folder of the includes
- `string $pattern` - The file regex to match against

**Returns:** void  

Dynamically loads PHP files within a type matching a pattern (e.g., walkers).

#### `get_deodar_includes($type, $pattern, $suffix)`
```php
private function get_deodar_includes(string $type, string $pattern, string $suffix): array
```
**Since:** 2.0.0  
**Parameters:**
- `string $type` - The type and folder of the includes
- `string $pattern` - The file regex to match against
- `string $suffix` - The end of the classname that's enforced

**Returns:** array - Array of loaded includes

Loads and caches Deodar abstract classes within the includes folder.

#### `load_walkers()`
```php
private function load_walkers(): void
```
**Since:** 2.0.0  
**Returns:** void  

Loads all walkers within the walkers folder.

#### `get_customizations()`
```php
private function get_customizations()
```
**Since:** 2.0.0  
**Returns:** array - Array of loaded customizations

Loads and returns all Customization classes.

## Usage Example

```php
// The plugin automatically instantiates and binds
$deodar = new Deodar();
$deodar->bind();
```

## Configuration

The class is configured via the `deodar` filter:

```php
add_filter('deodar', function($data) {
    return [
        'path' => get_template_directory(),
        'url' => get_template_directory_uri(),
        'menus' => [
            'primary' => 'Primary Menu',
            'footer' => 'Footer Menu'
        ],
        'styles' => [
            ['handle' => 'main-style', 'file' => '/css/main.css']
        ],
        'scripts' => [
            ['handle' => 'main-script', 'file' => '/js/main.js']
        ],
        'supports' => [
            'post-thumbnails',
            ['feature' => 'custom-logo', 'args' => ['height' => 100, 'width' => 100]]
        ]
    ];
});
```

## Related Classes

- `Deodar_Script` - Script management
- `Deodar_Style` - Style management  
- `Deodar_Support` - Theme support management
- `Deodar_Block_Style` - Block style management
- `Deodar_Customization` - Customizer management
