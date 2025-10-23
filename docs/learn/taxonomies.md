---
sidebar_position: 7
---

# Taxonomies

Custom taxonomies allow you to organize and categorize your content beyond the default categories and tags. Deodar provides seamless integration with ACF Pro for creating and managing custom taxonomies with associated field groups.

## Overview

Deodar's taxonomy system provides:

- **ACF Integration**: Full integration with Advanced Custom Fields Pro
- **JSON Sync**: Automatic synchronization of taxonomy configurations
- **Field Groups**: Support for taxonomy-specific field groups
- **Standardized Structure**: Consistent organization and naming
- **Production Ready**: Optimized for both development and production

## Creating Custom Taxonomies

### Method 1: Using ACF Pro (Recommended)

1. **Create Field Group in WordPress Admin**
   - Go to Custom Fields > Field Groups
   - Create a new field group
   - Set location rules to "Taxonomy is equal to [Your Taxonomy]"
   - Add your custom fields
   - Save and Publish

2. **Deodar Auto-Sync**
   - Deodar automatically detects ACF taxonomy configurations
   - Saves them to `includes/taxonomies/` directory
   - Syncs field groups automatically

### Method 2: Manual Configuration

Create a JSON file in the `includes/taxonomies/` directory:

```json
{
    "key": "taxonomy_68d9f13c984ad",
    "title": "Genres",
    "menu_order": 0,
    "active": true,
    "taxonomy": "genre",
    "labels": {
        "name": "Genres",
        "singular_name": "Genre",
        "menu_name": "Genres",
        "all_items": "All Genres",
        "edit_item": "Edit Genre",
        "view_item": "View Genre",
        "update_item": "Update Genre",
        "add_new_item": "Add New Genre",
        "new_item_name": "New Genre Name",
        "search_items": "Search Genres",
        "popular_items": "Popular Genres",
        "separate_items_with_commas": "Separate genres with commas",
        "add_or_remove_items": "Add or remove genres",
        "choose_from_most_used": "Choose from the most used genres",
        "not_found": "No genres found"
    },
    "description": "Custom taxonomy for movie genres",
    "public": true,
    "publicly_queryable": true,
    "hierarchical": true,
    "show_ui": true,
    "show_in_menu": true,
    "show_in_nav_menus": true,
    "show_tagcloud": true,
    "show_in_quick_edit": true,
    "show_admin_column": true,
    "show_in_rest": true,
    "rest_base": "genres",
    "rest_namespace": "wp/v2",
    "rest_controller_class": "WP_REST_Terms_Controller",
    "object_type": ["movie"],
    "capabilities": {
        "manage_terms": "manage_categories",
        "edit_terms": "manage_categories",
        "delete_terms": "manage_categories",
        "assign_terms": "edit_posts"
    },
    "rewrite": {
        "permalink_rewrite": "taxonomy_key",
        "with_front": "1",
        "hierarchical": "1",
        "ep_mask": "EP_NONE"
    },
    "query_var": "genre",
    "update_count_callback": "",
    "default_term": {
        "name": "Uncategorized",
        "slug": "uncategorized",
        "description": "Default genre for movies"
    }
}
```

## Taxonomy Configuration Options

### Basic Settings

| Option | Type | Description |
|--------|------|-------------|
| `taxonomy` | string | Taxonomy slug (e.g., "genre") |
| `title` | string | Human-readable title |
| `description` | string | Taxonomy description |
| `public` | bool | Whether taxonomy is public |
| `hierarchical` | bool | Whether taxonomy supports hierarchy (like categories) |
| `show_ui` | bool | Show in admin interface |
| `show_in_menu` | bool | Show in admin menu |
| `show_in_rest` | bool | Enable REST API support |

### Labels Configuration

```json
{
    "labels": {
        "name": "Genres",
        "singular_name": "Genre",
        "menu_name": "Genres",
        "all_items": "All Genres",
        "edit_item": "Edit Genre",
        "view_item": "View Genre",
        "update_item": "Update Genre",
        "add_new_item": "Add New Genre",
        "new_item_name": "New Genre Name",
        "search_items": "Search Genres",
        "popular_items": "Popular Genres",
        "separate_items_with_commas": "Separate genres with commas",
        "add_or_remove_items": "Add or remove genres",
        "choose_from_most_used": "Choose from the most used genres",
        "not_found": "No genres found"
    }
}
```

### Object Type Association

```json
{
    "object_type": ["movie", "post", "page"]
}
```

### Capabilities Configuration

```json
{
    "capabilities": {
        "manage_terms": "manage_categories",
        "edit_terms": "manage_categories",
        "delete_terms": "manage_categories",
        "assign_terms": "edit_posts"
    }
}
```

## Field Groups for Taxonomies

### Creating Taxonomy Field Groups

1. **In WordPress Admin**
   - Go to Custom Fields > Field Groups
   - Create a new field group
   - Name it appropriately (e.g., "Genre Details")

2. **Set Location Rules**
   - Add location rule: "Taxonomy is equal to Genre"
   - This ensures fields appear only for your custom taxonomy

3. **Add Fields**
   ```
   Genre Details
   ├── Color (Color Picker)
   ├── Icon (Image)
   ├── Description (Textarea)
   └── Display Order (Number)
   ```

### Taxonomy Field Group Structure

```
includes/taxonomies/
├── genres.field-group.json      # Taxonomy configuration
├── genre-details.field-group.json  # Field group for genres
└── index.php                    # Security file
```

## Template Files

### Creating Custom Templates

For themes, create template files for your custom taxonomies:

#### Taxonomy Archive Template
```
taxonomy-genre.php
```

```php
<?php
get_header(); ?>

<div class="genre-archive">
    <header class="page-header">
        <h1 class="page-title">
            <?php
            $current_term = get_queried_object();
            echo 'Movies in ' . $current_term->name . ' Genre';
            ?>
        </h1>
        
        <?php if ($current_term->description): ?>
            <div class="genre-description">
                <?php echo wp_kses_post($current_term->description); ?>
            </div>
        <?php endif; ?>
        
        <?php if (get_field('color', $current_term)): ?>
            <div class="genre-color" style="background-color: <?php the_field('color', $current_term); ?>"></div>
        <?php endif; ?>
    </header>
    
    <div class="movies-grid">
        <?php if (have_posts()): ?>
            <?php while (have_posts()): the_post(); ?>
                <article class="movie-card">
                    <?php if (has_post_thumbnail()): ?>
                        <div class="movie-poster">
                            <?php the_post_thumbnail('medium'); ?>
                        </div>
                    <?php endif; ?>
                    
                    <div class="movie-info">
                        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                        <p class="movie-director">Director: <?php the_field('director'); ?></p>
                        <p class="movie-year"><?php the_field('release_date'); ?></p>
                    </div>
                </article>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No movies found in this genre.</p>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
```

#### Single Taxonomy Term Template
```
taxonomy-genre-action.php
```

```php
<?php
get_header(); ?>

<div class="genre-single">
    <header class="page-header">
        <h1 class="page-title">Action Movies</h1>
        
        <?php
        $term = get_queried_object();
        if (get_field('icon', $term)):
            $icon = get_field('icon', $term);
            ?>
            <div class="genre-icon">
                <img src="<?php echo esc_url($icon['url']); ?>" alt="<?php echo esc_attr($term->name); ?>">
            </div>
        <?php endif; ?>
        
        <?php if ($term->description): ?>
            <div class="genre-description">
                <?php echo wp_kses_post($term->description); ?>
            </div>
        <?php endif; ?>
    </header>
    
    <div class="movies-grid">
        <?php if (have_posts()): ?>
            <?php while (have_posts()): the_post(); ?>
                <article class="movie-card">
                    <?php if (has_post_thumbnail()): ?>
                        <div class="movie-poster">
                            <?php the_post_thumbnail('medium'); ?>
                        </div>
                    <?php endif; ?>
                    
                    <div class="movie-info">
                        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                        <p class="movie-director">Director: <?php the_field('director'); ?></p>
                        <p class="movie-year"><?php the_field('release_date'); ?></p>
                    </div>
                </article>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No movies found in this genre.</p>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
```

## Querying Custom Taxonomies

### Basic Query

```php
// Query movies by genre
$action_movies = new WP_Query([
    'post_type' => 'movie',
    'tax_query' => [
        [
            'taxonomy' => 'genre',
            'field' => 'slug',
            'terms' => 'action'
        ]
    ]
]);

if ($action_movies->have_posts()):
    while ($action_movies->have_posts()): $action_movies->the_post();
        // Display movie content
        the_title();
        the_field('director');
    endwhile;
    wp_reset_postdata();
endif;
```

### Advanced Query with Multiple Taxonomies

```php
// Query movies by multiple genres
$movies = new WP_Query([
    'post_type' => 'movie',
    'tax_query' => [
        'relation' => 'AND',
        [
            'taxonomy' => 'genre',
            'field' => 'slug',
            'terms' => ['action', 'drama']
        ],
        [
            'taxonomy' => 'actor',
            'field' => 'slug',
            'terms' => 'tom-hanks'
        ]
    ]
]);
```

### Using get_terms()

```php
// Get all genres with their counts
$genres = get_terms([
    'taxonomy' => 'genre',
    'hide_empty' => true,
    'orderby' => 'count',
    'order' => 'DESC'
]);

foreach ($genres as $genre):
    echo '<h3>' . $genre->name . ' (' . $genre->count . ')</h3>';
endforeach;
```

## Best Practices

### Taxonomy Design

1. **Naming**: Use descriptive, plural names
2. **Hierarchy**: Consider hierarchical vs. flat structure
3. **Labels**: Provide clear, user-friendly labels
4. **Associations**: Associate with appropriate post types
5. **Publicity**: Consider public vs. private carefully

### Field Organization

1. **Grouping**: Group related fields together
2. **Validation**: Add field validation rules
3. **Conditional Logic**: Use conditional field display
4. **Default Values**: Provide sensible defaults
5. **Documentation**: Document complex field setups

### Performance Optimization

1. **Indexing**: Add database indexes for taxonomy queries
2. **Caching**: Use caching for expensive queries
3. **Pagination**: Implement proper pagination
4. **Lazy Loading**: Load content as needed
5. **Image Optimization**: Optimize taxonomy images

## Examples

### Complete Genre Taxonomy Example

```json
{
    "key": "taxonomy_68d9f13c984ad",
    "title": "Genres",
    "menu_order": 0,
    "active": true,
    "taxonomy": "genre",
    "labels": {
        "name": "Genres",
        "singular_name": "Genre",
        "menu_name": "Genres",
        "all_items": "All Genres",
        "edit_item": "Edit Genre",
        "view_item": "View Genre",
        "update_item": "Update Genre",
        "add_new_item": "Add New Genre",
        "new_item_name": "New Genre Name",
        "search_items": "Search Genres",
        "popular_items": "Popular Genres",
        "separate_items_with_commas": "Separate genres with commas",
        "add_or_remove_items": "Add or remove genres",
        "choose_from_most_used": "Choose from the most used genres",
        "not_found": "No genres found"
    },
    "description": "Custom taxonomy for movie genres",
    "public": true,
    "publicly_queryable": true,
    "hierarchical": true,
    "show_ui": true,
    "show_in_menu": true,
    "show_in_nav_menus": true,
    "show_tagcloud": true,
    "show_in_quick_edit": true,
    "show_admin_column": true,
    "show_in_rest": true,
    "rest_base": "genres",
    "rest_namespace": "wp/v2",
    "rest_controller_class": "WP_REST_Terms_Controller",
    "object_type": ["movie"],
    "capabilities": {
        "manage_terms": "manage_categories",
        "edit_terms": "manage_categories",
        "delete_terms": "manage_categories",
        "assign_terms": "edit_posts"
    },
    "rewrite": {
        "permalink_rewrite": "taxonomy_key",
        "with_front": "1",
        "hierarchical": "1",
        "ep_mask": "EP_NONE"
    },
    "query_var": "genre",
    "update_count_callback": "",
    "default_term": {
        "name": "Uncategorized",
        "slug": "uncategorized",
        "description": "Default genre for movies"
    }
}
```

### Genre Field Group Example

```json
{
    "key": "group_genre_details",
    "title": "Genre Details",
    "fields": [
        {
            "key": "field_genre_color",
            "label": "Genre Color",
            "name": "color",
            "type": "color_picker",
            "required": 1
        },
        {
            "key": "field_genre_icon",
            "label": "Genre Icon",
            "name": "icon",
            "type": "image",
            "return_format": "array"
        },
        {
            "key": "field_genre_description",
            "label": "Genre Description",
            "name": "description",
            "type": "textarea",
            "rows": 4
        },
        {
            "key": "field_genre_display_order",
            "label": "Display Order",
            "name": "display_order",
            "type": "number",
            "default_value": 0
        }
    ],
    "location": [
        [
            {
                "param": "taxonomy",
                "operator": "==",
                "value": "genre"
            }
        ]
    ]
}
```

## Troubleshooting

### Common Issues

**Taxonomy Not Appearing**
- Check JSON syntax in configuration file
- Verify file is in correct directory
- Ensure ACF Pro is active
- Check WordPress admin for errors

**Fields Not Saving**
- Verify field group location rules
- Check field names and keys
- Ensure proper permissions
- Test in different contexts

**Template Not Loading**
- Verify template file naming
- Check template hierarchy
- Ensure proper file permissions
- Test with default theme

**Terms Not Associating**
- Check object_type configuration
- Verify post type associations
- Ensure proper capabilities
- Test with different user roles

## Next Steps

Now that you understand taxonomies:

- [Explore Customizations](./customizations)
- [Discover Block Variations](./working-with-non-acf-blocks)
- [Master the CLI Tool](./cli-tool)
- [Learn about Post Types](./post-types)

---

Ready to organize your content? Let's explore customizations next!
