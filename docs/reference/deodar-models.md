# deodar-models.php

**File:** `lib/deodar-models.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

This file serves as the loader for all model classes used throughout the Deodar plugin. It conditionally loads model class files to ensure they are available when needed, preventing duplicate class definitions.

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

## Related Files

- `lib/models/class-deodar-block-style.php` - Block style management
- `lib/models/class-deodar-enqueuable.php` - Asset management base class
- `lib/models/class-deodar-script.php` - Script management
- `lib/models/class-deodar-style.php` - Style management
- `lib/models/class-deodar-customization.php` - Customizer base class
- `lib/models/class-deodar-support.php` - Theme support management
- `lib/class-deodar.php` - Main class that uses these models
