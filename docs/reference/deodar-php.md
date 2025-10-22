# deodar.php

**File:** `deodar.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The main entry point for the Deodar plugin. This file contains the plugin header information, constant definitions, and initializes the plugin by loading required files and instantiating the main `Deodar` class.

## Plugin Header

```php
/**
 * Plugin Name:       Deodar
 * Plugin URI:        https://deodar.io
 * Description:       Developer friendly bridge to the ACF Pro and WordPress APIs
 * Version:           2.0.0
 * Requires at least: 6.8
 * Requires PHP:      8.2
 * Author:            Brock Cataldi
 * Author URI:        https://brockcataldi.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       deodar
 */
```

## Constants

The file defines several constants used throughout the plugin:

### `DEODAR_PATH`
```php
define( 'DEODAR_PATH', plugin_dir_path( __FILE__ ) );
```
The absolute path to the plugin directory.

### `DEODAR_LIB_PATH`
```php
define( 'DEODAR_LIB_PATH', path_join( DEODAR_PATH, 'lib' ) );
```
The absolute path to the `lib` directory within the plugin.

### `DEODAR_MODELS_PATH`
```php
define( 'DEODAR_MODELS_PATH', path_join( DEODAR_LIB_PATH, 'models' ) );
```
The absolute path to the `models` directory within the `lib` directory.

### `DEODAR_TYPES_PATH`
```php
define( 'DEODAR_TYPES_PATH', path_join( DEODAR_LIB_PATH, 'types' ) );
```
The absolute path to the `types` directory within the `lib` directory.

## File Loading

The plugin loads the following files in order:

### 1. Utility Functions
```php
require DEODAR_LIB_PATH . '/deodar-functions.php';
```
Loads all utility functions used throughout the plugin.

### 2. Model Classes
```php
require DEODAR_LIB_PATH . '/deodar-models.php';
```
Loads all model classes and enums used by the plugin.

### 3. Main Class
```php
require DEODAR_LIB_PATH . '/class-deodar.php';
```
Loads the main `Deodar` class.

## Plugin Initialization

The plugin is initialized by instantiating the `Deodar` class and calling its `bind()` method:

```php
( new Deodar() )->bind();
```

This single line:
1. Creates a new instance of the `Deodar` class
2. Calls the `bind()` method to register all WordPress hooks and filters
3. Sets up the plugin to respond to WordPress events

## Security

The file includes a security check to prevent direct access:

```php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
```

This ensures the file can only be loaded through WordPress's plugin system.

## Requirements

- **WordPress:** 6.8 or higher
- **PHP:** 8.2 or higher
- **ACF Pro:** Recommended for full functionality

## File Structure

The plugin follows this directory structure:

```
deodar/
├── deodar.php              # Main entry point (this file)
├── lib/
│   ├── class-deodar.php    # Main plugin class
│   ├── deodar-functions.php # Utility functions
│   ├── deodar-models.php   # Model loader
│   └── models/             # Model classes and enums
│       ├── class-deodar-block-style.php
│       ├── class-deodar-customization.php
│       ├── class-deodar-enqueuable.php
│       ├── class-deodar-script.php
│       ├── class-deodar-style.php
│       ├── class-deodar-support.php
│       ├── enum-deodar-array-type.php
│       └── enum-deodar-scan-type.php
├── vendor/                 # Composer dependencies
└── reference/              # API documentation
```

## Related Files

- `lib/class-deodar.php` - Main plugin class
- `lib/deodar-functions.php` - Utility functions
- `lib/deodar-models.php` - Model loader
- `composer.json` - Composer configuration
- `README.md` - Plugin documentation