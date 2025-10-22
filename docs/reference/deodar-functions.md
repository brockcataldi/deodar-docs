# deodar-functions.php

**File:** `lib/deodar-functions.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

This file contains all utility functions used throughout the Deodar plugin. These functions provide common functionality for array type checking, string classification, file system operations, and ACF integration.

## Functions

### `_deodar_array_type()`

```php
function _deodar_array_type(mixed $value): Deodar_Array_Type
```

**Since:** 2.0.0  
**Parameters:**
- `mixed $value` - The value to be checked

**Returns:** `Deodar_Array_Type` - The array type classification

**Description:** Determines if the value is an array and what type it is.

**Return Types:**
- `Deodar_Array_Type::NEITHER` - Either doesn't exist or isn't an array
- `Deodar_Array_Type::SEQUENTIAL` - Sequential array (list)
- `Deodar_Array_Type::ASSOCIATIVE` - Associative array

**Example:**
```php
$sequential = [1, 2, 3];
$associative = ['key' => 'value'];
$not_array = 'string';

_deodar_array_type($sequential);  // Returns Deodar_Array_Type::SEQUENTIAL
_deodar_array_type($associative); // Returns Deodar_Array_Type::ASSOCIATIVE
_deodar_array_type($not_array);   // Returns Deodar_Array_Type::NEITHER
```

### `_deodar_classify()`

```php
function _deodar_classify(string $value): string
```

**Since:** 2.0.0  
**Parameters:**
- `string $value` - The string to classify

**Returns:** `string` - The classified string in valid PHP class format

**Description:** Similar to slugify but converts it to a valid PHP Class format. Converts kebab-case or snake_case to PascalCase.

**Example:**
```php
_deodar_classify('my-custom-class');    // Returns 'My_Custom_Class'
_deodar_classify('my_custom_class');    // Returns 'My_Custom_Class'
_deodar_classify('my-custom_class');    // Returns 'My_Custom_Class'
```

### `_deodar_scan_for_directories()`

```php
function _deodar_scan_for_directories(
    string $path,
    Deodar_Scan_Type $type = Deodar_Scan_Type::PATHS
): array
```

**Since:** 2.0.0  
**Parameters:**
- `string $path` - The path to search
- `Deodar_Scan_Type $type` - The expected return value (defaults to PATHS)

**Returns:** `array` - Array of directory information based on scan type

**Description:** Gets all directories at a given path. Will return empty array even if the path doesn't exist.

**Scan Types:**
- `Deodar_Scan_Type::PATHS` - Returns full file paths
- `Deodar_Scan_Type::NAMES` - Returns directory names only
- `Deodar_Scan_Type::BOTH` - Returns both names and paths as arrays

**Example:**
```php
// Get full paths
$paths = _deodar_scan_for_directories('/path/to/dir');
// Returns: ['/path/to/dir/subdir1', '/path/to/dir/subdir2']

// Get names only
$names = _deodar_scan_for_directories('/path/to/dir', Deodar_Scan_Type::NAMES);
// Returns: ['subdir1', 'subdir2']

// Get both
$both = _deodar_scan_for_directories('/path/to/dir', Deodar_Scan_Type::BOTH);
// Returns: [['subdir1', '/path/to/dir/subdir1'], ['subdir2', '/path/to/dir/subdir2']]
```

### `_deodar_scan_for_files()`

```php
function _deodar_scan_for_files(
    string $path,
    Deodar_Scan_Type $type = Deodar_Scan_Type::BOTH,
    bool $include_index = false
): array
```

**Since:** 2.0.0  
**Parameters:**
- `string $path` - The path to search
- `Deodar_Scan_Type $type` - The expected return value (defaults to BOTH)
- `bool $include_index` - Whether to include index.php files (defaults to false)

**Returns:** `array` - Array of file information based on scan type

**Description:** Gets all files at a given path. Will return empty array even if the path doesn't exist. By default, excludes index.php files.

**Example:**
```php
// Get both names and paths (default)
$files = _deodar_scan_for_files('/path/to/dir');
// Returns: [['file1.php', '/path/to/dir/file1.php'], ['file2.php', '/path/to/dir/file2.php']]

// Get names only
$names = _deodar_scan_for_files('/path/to/dir', Deodar_Scan_Type::NAMES);
// Returns: ['file1.php', 'file2.php']

// Include index.php files
$all_files = _deodar_scan_for_files('/path/to/dir', Deodar_Scan_Type::NAMES, true);
// Returns: ['file1.php', 'file2.php', 'index.php']
```

### `_deodar_get_template_name()`

```php
function _deodar_get_template_name(): string
```

**Since:** 2.0.0  
**Returns:** `string` - The template name including extension

**Description:** Returns the name of the PHP template used on the current page, including the extension.

**Example:**
```php
$template = _deodar_get_template_name();
// Returns: 'page-about.php', 'single-post.php', 'index.php', etc.
```

### `_deodar_flatten_location()`

```php
function _deodar_flatten_location(array $location): array
```

**Since:** 2.0.0  
**Parameters:**
- `array $location` - The ACF location data

**Returns:** `array` - The flattened locations array

**Description:** Returns the locations array and flattens it from ACF's nested structure into a simple array of rules.

**Example:**
```php
$acf_location = [
    [
        [
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'page'
        ]
    ],
    [
        [
            'param' => 'page_template',
            'operator' => '==',
            'value' => 'page-about.php'
        ]
    ]
];

$flattened = _deodar_flatten_location($acf_location);
// Returns: [
//     ['param' => 'post_type', 'operator' => '==', 'value' => 'page'],
//     ['param' => 'page_template', 'operator' => '==', 'value' => 'page-about.php']
// ]
```

### `_deodar_get_type_from_key()`

```php
function _deodar_get_type_from_key(string $key): string|null
```

**Since:** 2.0.0  
**Parameters:**
- `string $key` - The ACF key

**Returns:** `string|null` - The type extracted from the key or null if none found

**Description:** Gets the type of save based on the ACF key by extracting the part before the last underscore.

**Example:**
```php
_deodar_get_type_from_key('group_post_type_123');  // Returns 'group_post_type'
_deodar_get_type_from_key('field_taxonomy_456');   // Returns 'field_taxonomy'
_deodar_get_type_from_key('simple_key');           // Returns null
```

### `_deodar_safe_include()`

```php
function _deodar_safe_include(string $path): bool
```

**Since:** 2.0.0  
**Parameters:**
- `string $path` - The path to the file

**Returns:** `bool` - True if the file was included, false otherwise

**Description:** Safely include a file with error handling. Checks if the file exists and is readable before including it.

**Example:**
```php
$result = _deodar_safe_include('/path/to/file.php');
if ($result) {
    // File was successfully included
} else {
    // File could not be included (doesn't exist, not readable, or error occurred)
}
```

### `_deodar_2d_array_search()`

```php
function _deodar_2d_array_search(array $data_array, int|string $key, mixed $value): int|false
```

**Since:** 2.0.0  
**Parameters:**
- `array $data_array` - The array to search
- `int|string $key` - The key to search for
- `mixed $value` - The value to search for

**Returns:** `int|false` - The key of the value or false if not found

**Description:** Search for a key/value pair in a 2D array. Returns the index of the first matching item.

**Example:**
```php
$data = [
    ['name' => 'John', 'age' => 30],
    ['name' => 'Jane', 'age' => 25],
    ['name' => 'Bob', 'age' => 35]
];

$index = _deodar_2d_array_search($data, 'name', 'Jane');  // Returns 1
$index = _deodar_2d_array_search($data, 'age', 30);       // Returns 0
$index = _deodar_2d_array_search($data, 'name', 'Alice'); // Returns false
```

## Usage Examples

### Array Type Checking
```php
$config = [
    'styles' => ['style1.css', 'style2.css'],  // Sequential
    'scripts' => ['handle1' => 'script1.js']   // Associative
];

if (_deodar_array_type($config['styles']) === Deodar_Array_Type::SEQUENTIAL) {
    // Handle sequential array
    foreach ($config['styles'] as $style) {
        // Process each style
    }
}
```

### File System Operations
```php
// Load all PHP files in a directory
$php_files = _deodar_scan_for_files('/path/to/includes', Deodar_Scan_Type::PATHS);
foreach ($php_files as $file_path) {
    if (str_ends_with($file_path, '.php')) {
        include $file_path;
    }
}

// Get all subdirectories
$subdirs = _deodar_scan_for_directories('/path/to/blocks', Deodar_Scan_Type::NAMES);
foreach ($subdirs as $dir_name) {
    // Process each directory
}
```

### ACF Integration
```php
// Determine where to save ACF JSON based on field group type
$field_group_key = 'group_post_type_123';
$type = _deodar_get_type_from_key($field_group_key);

switch ($type) {
    case 'group_post_type':
        $save_path = '/includes/post-types/';
        break;
    case 'group_taxonomy':
        $save_path = '/includes/taxonomies/';
        break;
    default:
        $save_path = '/includes/field-groups/';
}
```

## Related Files

- `lib/models/enum-deodar-array-type.php` - Array type enum
- `lib/models/enum-deodar-scan-type.php` - Scan type enum
- `lib/class-deodar.php` - Main class that uses these functions
