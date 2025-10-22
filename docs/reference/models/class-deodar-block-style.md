# class-deodar-block-style.php

**File:** `lib/models/class-deodar-block-style.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The `Deodar_Block_Style` class manages WordPress block style registration and enqueuing. It provides a clean interface for registering block styles with WordPress using the `wp_enqueue_block_style` function.

## Class Declaration

```php
class Deodar_Block_Style
```

## Properties

### `$name`
```php
public string $name = '';
```
The name of the block.

### `$block_namespace`
```php
public string $block_namespace = '';
```
The namespace of the block.

## Methods

### Constructor

#### `__construct($name, $block_namespace)`
```php
public function __construct(string $name, string $block_namespace)
```
**Since:** 2.0.0  
**Parameters:**
- `string $name` - The name of the block
- `string $block_namespace` - The namespace of the block

**Returns:** void  

Initializes the block style with the provided name and namespace.

### Public Methods

#### `get_block_type_name()`
```php
public function get_block_type_name(): string
```
**Since:** 2.0.0  
**Returns:** string - The full block type name in format `{namespace}/{name}`

Gets the complete block type name by combining the namespace and block name.

#### `get_variations_path($blocks_dir_path)`
```php
public function get_variations_path(string $blocks_dir_path): string
```
**Since:** 2.0.0  
**Parameters:**
- `string $blocks_dir_path` - The file path of the blocks directory

**Returns:** string - The path to the variations file

Gets the path to the block variations file. Expected file structure:
```php
blocks/
└── {namespace}/
    └── {name}/
        └── {name}.variations.php
```

#### `enqueue($blocks_dir_path, $blocks_dir_url)`
```php
public function enqueue(string $blocks_dir_path, string $blocks_dir_url)
```
**Since:** 2.0.0  
**Parameters:**
- `string $blocks_dir_path` - The file path of the block style
- `string $blocks_dir_url` - The URL path of the block style

**Returns:** void  

Enqueues the block style using WordPress's `wp_enqueue_block_style` function. The method constructs the appropriate file paths and URLs for the block style CSS file.

**File Structure Expected:**
```php
blocks/
└── {namespace}/
    └── {name}/
        └── build/
            └── {name}.build.css
```

## WordPress Integration

This class integrates with WordPress's block system by:

1. **Block Identification**: Uses the namespace and block name to create the full block identifier (`{namespace}/{block-name}`)
2. **Style Registration**: Registers the block style with WordPress using `wp_enqueue_block_style`
3. **File Path Resolution**: Automatically constructs the correct file paths and URLs for the CSS file
4. **Handle Generation**: Creates a unique handle for the style (`deodar-{namespace}-{block-name}`)
5. **Variations Support**: Provides path resolution for block variations files

## Related Classes

- `Deodar` - Main class that automatically manages block styles
- `Deodar_Style` - General stylesheet management
- `Deodar_Enqueuable` - Base class for asset management

## Related Functions

- `wp_enqueue_block_style()` - WordPress function used internally
- `_deodar_scan_for_directories()` - Used by Deodar to discover blocks
- `_deodar_safe_include()` - Used to safely include variation files
