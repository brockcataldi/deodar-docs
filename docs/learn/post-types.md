---
sidebar_position: 6
---

# Post Types

Custom post types allow you to create different types of content beyond the default posts and pages. Deodar makes it easy to create and manage custom post types using ACF Pro integration and standardized configuration.

## Overview

Deodar's post type system provides:

- **ACF Integration**: Seamless integration with Advanced Custom Fields Pro
- **JSON Sync**: Automatic synchronization of post type configurations
- **Field Groups**: Automatic field group management
- **Standardized Structure**: Consistent organization and naming
- **Production Ready**: Optimized for both development and production

## Creating Custom Post Types

### Method 1: Using ACF Pro (Recommended)

1. **Create Field Group in WordPress Admin**
   - Go to Custom Fields > Field Groups
   - Create a new field group
   - Set location rules to "Post Type is equal to [Your Post Type]"
   - Add your custom fields
   - Save and Publish

2. **Deodar Auto-Sync**
   - Deodar automatically detects ACF post type configurations
   - Saves them to `includes/post-types/` directory
   - Syncs field groups automatically

### Method 2: Manual Configuration

Create a JSON file in the `includes/post-types/` directory:

```json
{
    "key": "post_type_68d9f13c984ad",
    "title": "Movies",
    "menu_order": 0,
    "active": true,
    "post_type": "movie",
    "labels": {
        "name": "Movies",
        "singular_name": "Movie",
        "menu_name": "Movies",
        "all_items": "All Movies",
        "edit_item": "Edit Movie",
        "view_item": "View Movie",
        "add_new_item": "Add New Movie",
        "add_new": "Add New Movie",
        "new_item": "New Movie",
        "search_items": "Search Movies",
        "not_found": "No movies found",
        "not_found_in_trash": "No movies found in Trash"
    },
    "description": "Custom post type for movies",
    "public": true,
    "hierarchical": false,
    "exclude_from_search": false,
    "publicly_queryable": true,
    "show_ui": true,
    "show_in_menu": true,
    "show_in_admin_bar": true,
    "show_in_nav_menus": true,
    "show_in_rest": true,
    "menu_position": 5,
    "menu_icon": {
        "type": "dashicons",
        "value": "dashicons-admin-post"
    },
    "supports": [
        "title",
        "editor",
        "thumbnail",
        "custom-fields",
        "excerpt"
    ],
    "taxonomies": ["genre", "actor"],
    "has_archive": true,
    "has_archive_slug": "movies",
    "rewrite": {
        "permalink_rewrite": "post_type_key",
        "with_front": "1",
        "feeds": "0",
        "pages": "1"
    },
    "query_var": "movie",
    "can_export": true,
    "delete_with_user": false
}
```

## Post Type Configuration Options

### Basic Settings

| Option | Type | Description |
|--------|------|-------------|
| `post_type` | string | Post type slug (e.g., "movie") |
| `title` | string | Human-readable title |
| `description` | string | Post type description |
| `public` | bool | Whether post type is public |
| `hierarchical` | bool | Whether post type supports hierarchy |
| `show_ui` | bool | Show in admin interface |
| `show_in_menu` | bool | Show in admin menu |
| `show_in_rest` | bool | Enable REST API support **Required to utilize the block editor** |

### Labels Configuration

```json
{
    "labels": {
        "name": "Movies",
        "singular_name": "Movie",
        "menu_name": "Movies",
        "all_items": "All Movies",
        "edit_item": "Edit Movie",
        "view_item": "View Movie",
        "add_new_item": "Add New Movie",
        "add_new": "Add New Movie",
        "new_item": "New Movie",
        "search_items": "Search Movies",
        "not_found": "No movies found",
        "not_found_in_trash": "No movies found in Trash"
    }
}
```

### Menu Configuration

```json
{
    "menu_position": 5,
    "menu_icon": {
        "type": "dashicons",
        "value": "dashicons-admin-post"
    }
}
```

### Supports Configuration

```json
{
    "supports": [
        "title",
        "editor",
        "thumbnail",
        "custom-fields",
        "excerpt",
        "author",
        "comments",
        "revisions"
    ]
}
```

## Field Groups for Post Types

### Creating Field Groups

1. **In WordPress Admin**
   - Go to Custom Fields > Field Groups
   - Create a new field group
   - Name it appropriately (e.g., "Movie Details")

2. **Set Location Rules**
   - Add location rule: "Post Type is equal to Movie"
   - This ensures fields appear only for your custom post type

3. **Add Fields**
   ```
   Movie Details
   ├── Release Date (Date Picker)
   ├── Director (Text)
   ├── Rating (Select: G, PG, PG-13, R, NC-17)
   ├── Runtime (Number)
   ├── Synopsis (Textarea)
   └── Cast (Repeater)
       ├── Actor Name (Text)
       └── Character Name (Text)
   ```

### Field Group Structure

```
includes/post-types/
├── movies.field-group.json      # Post type configuration
├── movies-details.field-group.json  # Field group for movies
└── index.php                    # Security file
```

## Template Files

### Creating Custom Templates

For themes, create template files for your custom post types:

#### Single Post Template
```
single-movie.php
```

```php
<?php
get_header(); ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
        <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
        
        <div class="movie-meta">
            <p><strong>Director:</strong> <?php the_field('director'); ?></p>
            <p><strong>Release Date:</strong> <?php the_field('release_date'); ?></p>
            <p><strong>Rating:</strong> <?php the_field('rating'); ?></p>
            <p><strong>Runtime:</strong> <?php the_field('runtime'); ?> minutes</p>
        </div>
    </header>
    
    <div class="entry-content">
        <?php if (get_field('synopsis')): ?>
            <div class="movie-synopsis">
                <h2>Synopsis</h2>
                <p><?php the_field('synopsis'); ?></p>
            </div>
        <?php endif; ?>
        
        <?php if (have_rows('cast')): ?>
            <div class="movie-cast">
                <h2>Cast</h2>
                <ul>
                    <?php while (have_rows('cast')): the_row(); ?>
                        <li>
                            <strong><?php the_sub_field('actor_name'); ?></strong> 
                            as <?php the_sub_field('character_name'); ?>
                        </li>
                    <?php endwhile; ?>
                </ul>
            </div>
        <?php endif; ?>
        
        <?php the_content(); ?>
    </div>
</article>

<?php get_footer(); ?>
```

#### Archive Template
```
archive-movie.php
```

```php
<?php
get_header(); ?>

<div class="movies-archive">
    <header class="page-header">
        <h1 class="page-title">Movies</h1>
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
                        <p class="movie-rating">Rating: <?php the_field('rating'); ?></p>
                    </div>
                </article>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No movies found.</p>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
```

## Best Practices

### Post Type Design

1. **Naming**: Use descriptive, singular names
2. **Slugs**: Keep slugs short and memorable
3. **Labels**: Provide clear, user-friendly labels
4. **Supports**: Only enable features you need
5. **Publicity**: Consider public vs. private carefully

### Field Organization

1. **Grouping**: Group related fields together
2. **Validation**: Add field validation rules
3. **Conditional Logic**: Use conditional field display
4. **Default Values**: Provide sensible defaults
5. **Documentation**: Document complex field setups

### Performance Optimization

1. **Indexing**: Add database indexes for meta fields
2. **Caching**: Use caching for expensive queries
3. **Pagination**: Implement proper pagination
4. **Lazy Loading**: Load content as needed
5. **Image Optimization**: Optimize featured images

## Examples

### Complete Movie Post Type Example

```json
{
    "key": "post_type_68d9f13c984ad",
    "title": "Movies",
    "menu_order": 0,
    "active": true,
    "post_type": "movie",
    "labels": {
        "name": "Movies",
        "singular_name": "Movie",
        "menu_name": "Movies",
        "all_items": "All Movies",
        "edit_item": "Edit Movie",
        "view_item": "View Movie",
        "add_new_item": "Add New Movie",
        "add_new": "Add New Movie",
        "new_item": "New Movie",
        "search_items": "Search Movies",
        "not_found": "No movies found",
        "not_found_in_trash": "No movies found in Trash"
    },
    "description": "Custom post type for movies and film content",
    "public": true,
    "hierarchical": false,
    "exclude_from_search": false,
    "publicly_queryable": true,
    "show_ui": true,
    "show_in_menu": true,
    "show_in_admin_bar": true,
    "show_in_nav_menus": true,
    "show_in_rest": true,
    "menu_position": 5,
    "menu_icon": {
        "type": "dashicons",
        "value": "dashicons-admin-post"
    },
    "supports": [
        "title",
        "editor",
        "thumbnail",
        "custom-fields",
        "excerpt",
        "author",
        "comments",
        "revisions"
    ],
    "taxonomies": ["genre", "actor"],
    "has_archive": true,
    "has_archive_slug": "movies",
    "rewrite": {
        "permalink_rewrite": "post_type_key",
        "with_front": "1",
        "feeds": "0",
        "pages": "1"
    },
    "query_var": "movie",
    "can_export": true,
    "delete_with_user": false
}
```

### Movie Field Group Example

```json
{
    "key": "group_movie_details",
    "title": "Movie Details",
    "fields": [
        {
            "key": "field_release_date",
            "label": "Release Date",
            "name": "release_date",
            "type": "date_picker",
            "required": 1
        },
        {
            "key": "field_director",
            "label": "Director",
            "name": "director",
            "type": "text",
            "required": 1
        },
        {
            "key": "field_rating",
            "label": "Rating",
            "name": "rating",
            "type": "select",
            "choices": {
                "G": "G",
                "PG": "PG",
                "PG-13": "PG-13",
                "R": "R",
                "NC-17": "NC-17"
            },
            "required": 1
        },
        {
            "key": "field_runtime",
            "label": "Runtime (minutes)",
            "name": "runtime",
            "type": "number",
            "required": 1
        },
        {
            "key": "field_synopsis",
            "label": "Synopsis",
            "name": "synopsis",
            "type": "textarea",
            "rows": 4
        },
        {
            "key": "field_cast",
            "label": "Cast",
            "name": "cast",
            "type": "repeater",
            "sub_fields": [
                {
                    "key": "field_actor_name",
                    "label": "Actor Name",
                    "name": "actor_name",
                    "type": "text"
                },
                {
                    "key": "field_character_name",
                    "label": "Character Name",
                    "name": "character_name",
                    "type": "text"
                }
            ]
        }
    ],
    "location": [
        [
            {
                "param": "post_type",
                "operator": "==",
                "value": "movie"
            }
        ]
    ]
}
```

## Troubleshooting

### Common Issues

**Post Type Not Appearing**
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

## Next Steps

Now that you understand post types:

- [Learn about Taxonomies](./taxonomies)
- [Explore Customizations](./customizations)
- [Discover Block Variations](./working-with-non-acf-blocks)
- [Master the CLI Tool](./cli-tool)

---

Ready to create custom content? Let's explore taxonomies next!
