# enum-deodar-array-type.php

**File:** `lib/types/enum-deodar-array-type.php`  
**Package:** Deodar  
**Since:** 2.0.0  
**Author:** Brock Cataldi  

## Overview

The `Deodar_Array_Type` enum defines the possible types of arrays that can be returned by the `_deodar_array_type()` function. It provides type-safe classification of array structures in PHP.

## Enum Declaration

```php
enum Deodar_Array_Type
```

## Cases

### `NEITHER`
```php
case NEITHER;
```
Indicates that the value is not an array or doesn't exist.

### `SEQUENTIAL`
```php
case SEQUENTIAL;
```
Indicates that the value is a sequential array (also known as a list or indexed array).

### `ASSOCIATIVE`
```php
case ASSOCIATIVE;
```
Indicates that the value is an associative array (with string keys).

## Usage Examples

### Basic Array Type Checking
```php
use Deodar_Array_Type;

// Sequential array
$sequential = [1, 2, 3, 4, 5];
$type = _deodar_array_type($sequential);
// Returns: Deodar_Array_Type::SEQUENTIAL

// Associative array
$associative = ['name' => 'John', 'age' => 30, 'city' => 'New York'];
$type = _deodar_array_type($associative);
// Returns: Deodar_Array_Type::ASSOCIATIVE

// Non-array value
$string = 'Hello World';
$type = _deodar_array_type($string);
// Returns: Deodar_Array_Type::NEITHER

// Null value
$null = null;
$type = _deodar_array_type($null);
// Returns: Deodar_Array_Type::NEITHER
```

### Switch Statement Usage
```php
function process_array($data) {
    $array_type = _deodar_array_type($data);
    
    switch ($array_type) {
        case Deodar_Array_Type::SEQUENTIAL:
            // Handle sequential array
            foreach ($data as $index => $value) {
                echo "Index $index: $value\n";
            }
            break;
            
        case Deodar_Array_Type::ASSOCIATIVE:
            // Handle associative array
            foreach ($data as $key => $value) {
                echo "$key: $value\n";
            }
            break;
            
        case Deodar_Array_Type::NEITHER:
            // Handle non-array value
            echo "Not an array: " . var_export($data, true) . "\n";
            break;
    }
}
```

### Conditional Logic
```php
function validate_config($config) {
    $config_type = _deodar_array_type($config);
    
    if ($config_type === Deodar_Array_Type::NEITHER) {
        throw new InvalidArgumentException('Config must be an array');
    }
    
    if ($config_type === Deodar_Array_Type::SEQUENTIAL) {
        // Process as list of items
        return array_map('process_item', $config);
    }
    
    if ($config_type === Deodar_Array_Type::ASSOCIATIVE) {
        // Process as key-value pairs
        return array_map('process_key_value', $config);
    }
}
```

### Array Type Validation
```php
function require_associative_array($data) {
    if (_deodar_array_type($data) !== Deodar_Array_Type::ASSOCIATIVE) {
        throw new InvalidArgumentException('Expected associative array');
    }
    return $data;
}

function require_sequential_array($data) {
    if (_deodar_array_type($data) !== Deodar_Array_Type::SEQUENTIAL) {
        throw new InvalidArgumentException('Expected sequential array');
    }
    return $data;
}
```

### Deodar Integration Examples
```php
// In Deodar configuration
add_filter('deodar', function($data) {
    // Validate that data is associative
    if (_deodar_array_type($data) !== Deodar_Array_Type::ASSOCIATIVE) {
        return [];
    }
    
    // Process styles array
    if (isset($data['styles'])) {
        $styles_type = _deodar_array_type($data['styles']);
        
        if ($styles_type === Deodar_Array_Type::SEQUENTIAL) {
            // Process as list of style configurations
            $data['styles'] = array_map('process_style_config', $data['styles']);
        }
    }
    
    return $data;
});
```

## Array Type Detection Logic

The `_deodar_array_type()` function uses PHP's `array_is_list()` function to determine array types:

- **NEITHER**: Value is not an array or is null
- **SEQUENTIAL**: `array_is_list($value)` returns true
- **ASSOCIATIVE**: Value is an array but `array_is_list($value)` returns false

### Examples of Each Type

#### Sequential Arrays
```php
[1, 2, 3]                    // Sequential
['a', 'b', 'c']              // Sequential
[0 => 'a', 1 => 'b', 2 => 'c'] // Sequential (explicit numeric keys)
```

#### Associative Arrays
```php
['name' => 'John', 'age' => 30]           // Associative
[0 => 'a', 2 => 'b', 3 => 'c']           // Associative (non-sequential keys)
['a', 'b', 'c' => 'd']                   // Associative (mixed keys)
```

#### Neither
```php
'string'     // Not an array
123          // Not an array
null         // Not an array
false        // Not an array
```

## Type Safety Benefits

Using this enum provides several benefits:

1. **Type Safety**: Prevents invalid array type comparisons
2. **IDE Support**: Better autocomplete and type checking
3. **Documentation**: Clear indication of possible return values
4. **Maintainability**: Centralized array type definitions

## Related Functions

- `_deodar_array_type()` - Function that returns this enum
- `array_is_list()` - PHP function used internally for detection

## Related Files

- `lib/deodar-functions.php` - Contains the `_deodar_array_type()` function
- `lib/deodar-enums.php` - Loads this enum definition
