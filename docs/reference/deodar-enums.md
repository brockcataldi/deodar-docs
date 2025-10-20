# deodar-enums.php

**File:** `lib/deodar-enums.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

This file serves as the loader for all enum definitions used throughout the Deodar plugin. It conditionally loads enum files to ensure they are available when needed.

## Enum Loading

The file conditionally loads enum definitions based on their existence:

### `Deodar_Array_Type` Enum

```php
if ( false === enum_exists( 'Deodar_Array_Type' ) ) {
    require DEODAR_TYPES_PATH . '/enum-deodar-array-type.php';
}
```

**File:** `lib/types/enum-deodar-array-type.php`  
**Purpose:** Defines array type classifications used by `_deodar_array_type()` function.

**Cases:**
- `NEITHER` - Value is not an array
- `SEQUENTIAL` - Sequential array (list)
- `ASSOCIATIVE` - Associative array

### `Deodar_Scan_Type` Enum

```php
if ( false === enum_exists( 'Deodar_Scan_Type' ) ) {
    require DEODAR_TYPES_PATH . '/enum-deodar-scan-type.php';
}
```

**File:** `lib/types/enum-deodar-scan-type.php`  
**Purpose:** Defines scan type options for file and directory scanning functions.

**Cases:**
- `PATHS` - Return full file paths
- `NAMES` - Return names only
- `BOTH` - Return both names and paths

## Usage

This file is automatically loaded by the main plugin entry point (`deodar.php`) and ensures all enum definitions are available throughout the plugin.

### Example Usage

```php
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

## Related Files

- `lib/types/enum-deodar-array-type.php` - Array type enum definition
- `lib/types/enum-deodar-scan-type.php` - Scan type enum definition
- `lib/deodar-functions.php` - Functions that use these enums
- `lib/class-deodar.php` - Main class that uses these enums
