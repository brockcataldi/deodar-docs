# deodar-models.php

**File:** `lib/deodar-models.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

This file serves as the loader for all model classes and enums used throughout the Deodar plugin. It conditionally loads model class files to ensure they are available when needed, preventing duplicate class definitions.

## Model Loading

The file conditionally loads model class definitions based on their existence:

### `Deodar_Block_Style` Class

```php
if ( false === class_exists( 'Deodar_Block_Style' ) ) {
    require DEODAR_MODELS_PATH . '/class-deodar-block-style.php';
}
```

**File:** `lib/models/class-deodar-block-style.php`  
**Purpose:** Manages WordPress block style registration and enqueuing.

### `Deodar_Enqueuable` Class

```php
if ( false === class_exists( 'Deodar_Enqueuable' ) ) {
    require DEODAR_MODELS_PATH . '/class-deodar-enqueuable.php';
}
```

**File:** `lib/models/class-deodar-enqueuable.php`  
**Purpose:** Abstract base class for asset management (styles and scripts).

### `Deodar_Script` Class

```php
if ( false === class_exists( 'Deodar_Script' ) ) {
    require DEODAR_MODELS_PATH . '/class-deodar-script.php';
}
```

**File:** `lib/models/class-deodar-script.php`  
**Purpose:** Handles JavaScript file enqueuing and management.

### `Deodar_Style` Class

```php
if ( false === class_exists( 'Deodar_Style' ) ) {
    require DEODAR_MODELS_PATH . '/class-deodar-style.php';
}
```

**File:** `lib/models/class-deodar-style.php`  
**Purpose:** Handles CSS stylesheet enqueuing and management.

### `Deodar_Customization` Class

```php
if ( false === class_exists( 'Deodar_Customization' ) ) {
    require DEODAR_MODELS_PATH . '/class-deodar-customization.php';
}
```

**File:** `lib/models/class-deodar-customization.php`  
**Purpose:** Abstract base class for WordPress customizer functionality.

### `Deodar_Support` Class

```php
if ( false === class_exists( 'Deodar_Support' ) ) {
    require DEODAR_MODELS_PATH . '/class-deodar-support.php';
}
```

**File:** `lib/models/class-deodar-support.php`  
**Purpose:** Manages WordPress theme support features.


## Enum Loading

The file conditionally loads enum definitions based on their existence:

### `Deodar_Array_Type` Enum

```php
if ( false === enum_exists( 'Deodar_Array_Type' ) ) {
    require DEODAR_MODELS_PATH . '/enum-deodar-array-type.php';
}
```

**File:** `lib/models/enum-deodar-array-type.php`  
**Purpose:** Defines array type classifications used by `_deodar_array_type()` function.

**Cases:**
- `NEITHER` - Value is not an array
- `SEQUENTIAL` - Sequential array (list)
- `ASSOCIATIVE` - Associative array

### `Deodar_Scan_Type` Enum

```php
if ( false === enum_exists( 'Deodar_Scan_Type' ) ) {
    require DEODAR_MODELS_PATH . '/enum-deodar-scan-type.php';
}
```

**File:** `lib/models/enum-deodar-scan-type.php`  
**Purpose:** Defines scan type options for file and directory scanning functions.

**Cases:**
- `PATHS` - Return full file paths
- `NAMES` - Return names only
- `BOTH` - Return both names and paths

## Class Hierarchy

```php
Deodar_Enqueuable (abstract)
├── Deodar_Script
└── Deodar_Style

Deodar_Customization (abstract)
└── [Custom implementations]

Deodar_Block_Style (standalone)
Deodar_Support (standalone)
```

## Usage

This file is automatically loaded by the main plugin entry point (`deodar.php`) and ensures all model classes are available throughout the plugin.

### Example Usage

```php
// Create a script instance
$script = new Deodar_Script([
    'handle' => 'my-script',
    'file' => '/js/main.js',
    'dependencies' => ['jquery'],
    'version' => '1.0.0'
]);

// Create a style instance
$style = new Deodar_Style([
    'handle' => 'my-style',
    'file' => '/css/main.css',
    'dependencies' => [],
    'version' => '1.0.0',
    'media' => 'all'
]);

// Create a theme support instance
$support = new Deodar_Support([
    'feature' => 'custom-logo',
    'args' => [
        'height' => 100,
        'width' => 100
    ]
]);

// Create a block style instance
$block_style = new Deodar_Block_Style('my-block', 'my-namespace');

// Array type checking
$array_type = _deodar_array_type($some_value);
switch ($array_type) {
    case Deodar_Array_Type::SEQUENTIAL:
        // Handle sequential array
        break;
    case Deodar_Array_Type::ASSOCIATIVE:
        // Handle associative array
        break;
    case Deodar_Array_Type::NEITHER:
        // Handle non-array value
        break;
}

// File scanning
$files = _deodar_scan_for_files(
    '/path/to/directory',
    Deodar_Scan_Type::NAMES
);
```



## Model Classes Overview

### Asset Management Classes

- **`Deodar_Enqueuable`** - Abstract base class providing common functionality for asset enqueuing
- **`Deodar_Script`** - Extends `Deodar_Enqueuable` for JavaScript file management
- **`Deodar_Style`** - Extends `Deodar_Enqueuable` for CSS file management

### WordPress Integration Classes

- **`Deodar_Support`** - Manages WordPress theme support features
- **`Deodar_Block_Style`** - Handles WordPress block style registration
- **`Deodar_Customization`** - Abstract base for WordPress customizer functionality

### Enum Classes

- **`Deodar_Array_Type`** - Defines array type classifications (NEITHER, SEQUENTIAL, ASSOCIATIVE)
- **`Deodar_Scan_Type`** - Defines scan type options for file/directory operations (PATHS, NAMES, BOTH)

## Related Files

- `lib/models/class-deodar-block-style.php` - Block style management
- `lib/models/class-deodar-enqueuable.php` - Asset management base class
- `lib/models/class-deodar-script.php` - Script management
- `lib/models/class-deodar-style.php` - Style management
- `lib/models/class-deodar-customization.php` - Customizer base class
- `lib/models/class-deodar-support.php` - Theme support management
- `lib/models/enum-deodar-array-type.php` - Array type enum
- `lib/models/enum-deodar-scan-type.php` - Scan type enum
- `lib/class-deodar.php` - Main class that uses these models
