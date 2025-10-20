# deodar.php

**File:** `deodar.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The main entry point for the Deodar plugin. This file handles plugin initialization, constant definitions, and automatic loading of all required components.

## Plugin Information

- **Plugin Name:** Deodar
- **Plugin URI:** https://deodar.io
- **Description:** Developer friendly bridge to the ACF Pro and WordPress APIs
- **Version:** 2.0.0
- **Requires at least:** WordPress 6.8
- **Requires PHP:** 8.2
- **Author:** Brock Cataldi
- **Author URI:** https://brockcataldi.com
- **License:** GPL v2 or later
- **License URI:** https://www.gnu.org/licenses/gpl-2.0.html
- **Text Domain:** deodar

## Constants

### DEODAR_PATH
```php
define( 'DEODAR_PATH', plugin_dir_path( __FILE__ ) );
```
The absolute path to the plugin directory.

### DEODAR_LIB_PATH
```php
define( 'DEODAR_LIB_PATH', path_join( DEODAR_PATH, 'lib' ) );
```
The absolute path to the lib directory within the plugin.

### DEODAR_MODELS_PATH
```php
define( 'DEODAR_MODELS_PATH', path_join( DEODAR_LIB_PATH, 'models' ) );
```
The absolute path to the models directory within the lib folder.

### DEODAR_TYPES_PATH
```php
define( 'DEODAR_TYPES_PATH', path_join( DEODAR_LIB_PATH, 'types' ) );
```
The absolute path to the types directory within the lib folder.

## File Loading

The plugin automatically loads the following files in order:

1. **deodar-enums.php** - Enum definitions and type system
2. **deodar-functions.php** - Utility functions
3. **deodar-models.php** - Model class loader
4. **class-deodar.php** - Main plugin class

## Initialization

After all files are loaded, the plugin automatically instantiates and binds the main `Deodar` class:

```php
( new Deodar() )->bind();
```

This single line:
- Creates a new instance of the `Deodar` class
- Calls the `bind()` method to register all WordPress hooks
- Initializes the plugin's functionality

## Security

The file includes WordPress security checks to prevent direct access:

```php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
```

## Usage

This file is automatically loaded by WordPress when the plugin is activated. No manual intervention is required. The plugin will:

1. Define all necessary constants
2. Load all required files
3. Initialize the main `Deodar` class
4. Register all WordPress hooks and filters

## Dependencies

- WordPress 6.8+
- PHP 8.2+
- ACF Pro (recommended)

## Related Files

- `lib/class-deodar.php` - Main plugin class
- `lib/deodar-functions.php` - Utility functions
- `lib/deodar-enums.php` - Enum definitions
- `lib/deodar-models.php` - Model loader
