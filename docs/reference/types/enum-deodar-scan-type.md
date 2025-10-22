# enum-deodar-scan-type.php

**File:** `lib/models/enum-deodar-scan-type.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The `Deodar_Scan_Type` enum defines the return type options for file and directory scanning functions. It provides a flexible way to specify what information should be returned when scanning filesystem directories.

## Enum Declaration

```php
enum Deodar_Scan_Type
```

## Cases

### `PATHS`
```php
case PATHS;
```
Returns full file paths for each item found.

### `NAMES`
```php
case NAMES;
```
Returns only the names of files/directories found.

### `BOTH`
```php
case BOTH;
```
Returns both names and paths as arrays for each item found.

## Methods

### `resolve($name, $base)`
```php
public function resolve(string $name, string $base): string|array
```
**Since:** 2.0.0  
**Parameters:**
- `string $name` - The filename or directory name
- `string $base` - The base path

**Returns:** `string|array` - The resolved value based on the enum case

**Description:** Resolves the return value based on the scan type:
- `NAMES` → Returns the filename/directory name
- `PATHS` → Returns the full file path using `path_join($base, $name)`
- `BOTH` → Returns an array with both name and path

## Usage Examples

### Basic Scanning Operations
```php
use Deodar_Scan_Type;

$directory_path = '/path/to/directory';

// Get only names
$names = _deodar_scan_for_directories($directory_path, Deodar_Scan_Type::NAMES);
// Returns: ['subdir1', 'subdir2', 'subdir3']

// Get only paths
$paths = _deodar_scan_for_directories($directory_path, Deodar_Scan_Type::PATHS);
// Returns: ['/path/to/directory/subdir1', '/path/to/directory/subdir2', '/path/to/directory/subdir3']

// Get both names and paths
$both = _deodar_scan_for_directories($directory_path, Deodar_Scan_Type::BOTH);
// Returns: [
//     ['subdir1', '/path/to/directory/subdir1'],
//     ['subdir2', '/path/to/directory/subdir2'],
//     ['subdir3', '/path/to/directory/subdir3']
// ]
```

### File Scanning Examples
```php
$files_path = '/path/to/files';

// Get file names only
$file_names = _deodar_scan_for_files($files_path, Deodar_Scan_Type::NAMES);
// Returns: ['file1.php', 'file2.js', 'file3.css']

// Get full file paths
$file_paths = _deodar_scan_for_files($files_path, Deodar_Scan_Type::PATHS);
// Returns: ['/path/to/files/file1.php', '/path/to/files/file2.js', '/path/to/files/file3.css']

// Get both names and paths
$file_both = _deodar_scan_for_files($files_path, Deodar_Scan_Type::BOTH);
// Returns: [
//     ['file1.php', '/path/to/files/file1.php'],
//     ['file2.js', '/path/to/files/file2.js'],
//     ['file3.css', '/path/to/files/file3.css']
// ]
```

### Practical Usage Scenarios
```php
// Scenario 1: Load all PHP files in a directory
$php_files = _deodar_scan_for_files('/includes', Deodar_Scan_Type::PATHS);
foreach ($php_files as $file_path) {
    if (str_ends_with($file_path, '.php')) {
        include $file_path;
    }
}

// Scenario 2: Get list of available themes
$theme_names = _deodar_scan_for_directories('/wp-content/themes', Deodar_Scan_Type::NAMES);
foreach ($theme_names as $theme_name) {
    echo "Available theme: $theme_name\n";
}

// Scenario 3: Process files with both name and path
$files = _deodar_scan_for_files('/uploads', Deodar_Scan_Type::BOTH);
foreach ($files as [$filename, $filepath]) {
    $file_size = filesize($filepath);
    echo "File: $filename, Size: $file_size bytes\n";
}
```

### Deodar Integration Examples
```php
// In Deodar class - scanning for ACF blocks
private function get_paths_acf_blocks() {
    $acf_blocks = _deodar_scan_for_directories($this->path_acf_blocks_dir, Deodar_Scan_Type::NAMES);
    $paths_acf_blocks = array();
    
    foreach ($acf_blocks as $acf_block) {
        $paths_acf_blocks[] = path_join($this->path_acf_blocks_dir, $acf_block);
    }
    
    return $paths_acf_blocks;
}

// In Deodar class - scanning for block styles
private function get_block_styles() {
    $blocks_dir_children = _deodar_scan_for_directories(
        $this->path_blocks_dir,
        Deodar_Scan_Type::BOTH
    );
    
    $styles_blocks = array();
    
    foreach ($blocks_dir_children as [$block_namespace, $block_namespace_path]) {
        $child_dir_children = _deodar_scan_for_directories(
            $block_namespace_path,
            Deodar_Scan_Type::NAMES
        );
        
        foreach ($child_dir_children as $block_name) {
            $styles_blocks[] = new Deodar_Block_Style($block_name, $block_namespace);
        }
    }
    
    return $styles_blocks;
}
```

### Advanced Usage with resolve() Method
```php
// Manual usage of the resolve method
$scan_type = Deodar_Scan_Type::PATHS;
$name = 'myfile.php';
$base = '/path/to/directory';

$result = $scan_type->resolve($name, $base);
// Returns: '/path/to/directory/myfile.php'

// Using with different scan types
$scan_types = [
    Deodar_Scan_Type::NAMES,
    Deodar_Scan_Type::PATHS,
    Deodar_Scan_Type::BOTH
];

foreach ($scan_types as $type) {
    $result = $type->resolve('test.php', '/base/path');
    echo "Type: " . $type->name . ", Result: " . var_export($result, true) . "\n";
}

// Output:
// Type: NAMES, Result: 'test.php'
// Type: PATHS, Result: '/base/path/test.php'
// Type: BOTH, Result: array('test.php', '/base/path/test.php')
```

### Conditional Processing Based on Scan Type
```php
function process_scan_results($items, $scan_type) {
    switch ($scan_type) {
        case Deodar_Scan_Type::NAMES:
            // Process as simple names
            return array_map('sanitize_file_name', $items);
            
        case Deodar_Scan_Type::PATHS:
            // Process as full paths
            return array_filter($items, 'file_exists');
            
        case Deodar_Scan_Type::BOTH:
            // Process as name/path pairs
            return array_map(function($item) {
                [$name, $path] = $item;
                return [
                    'name' => sanitize_file_name($name),
                    'path' => $path,
                    'exists' => file_exists($path)
                ];
            }, $items);
    }
}
```

## Performance Considerations

- **NAMES**: Fastest option, returns minimal data
- **PATHS**: Moderate performance, constructs full paths
- **BOTH**: Slowest option, returns most data but provides flexibility

Choose the appropriate scan type based on your needs:

- Use `NAMES` when you only need to know what files/directories exist
- Use `PATHS` when you need full paths for file operations
- Use `BOTH` when you need both pieces of information

## Related Functions

- `_deodar_scan_for_directories()` - Function that uses this enum
- `_deodar_scan_for_files()` - Function that uses this enum
- `path_join()` - WordPress function used in resolve method

## Related Files

- `lib/deodar-functions.php` - Contains the scanning functions
- `lib/deodar-models.php` - Loads this enum definition
