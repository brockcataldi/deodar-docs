---
sidebar_position: 5
---

# Creating Blocks

Deodar supports two types of blocks: ACF provider blocks and Core provider blocks. This guide will show you how to create both types and understand when to use each approach. To modify core or other provider blocks check out [Working with Non ACF Blocks](./working-with-non-acf-blocks.md)

## Block Types Overview

### ACF Provider Blocks
- **Use Case**: Blocks that require custom fields and complex data
- **Features**: ACF Pro integration, custom field management, advanced data handling
- **Location**: `blocks/acf/` directory
- **Files**: `block.json`, `{block-name}.php`, `block.scss`, `block.js` (optional)

## ACF Provider Blocks

### Creating an ACF Block

#### Method 1: Using the CLI Tool (Recommended)

```bash
# Navigate to your project directory
cd your-project

# Create a new block
deodar new hero-section

# Follow the interactive prompts:
# - Block name: hero-section
# - Display title: Hero Section
# - Category: design
# - Include JavaScript: yes
```

#### Method 2: Manual Creation

1. **Create Block Directory**
   ```
   blocks/acf/hero-section/
   ```

2. **Create block.json**
   ```json
   {
       "name": "your-project/hero-section",
       "title": "Hero Section",
       "description": "A hero section block with custom fields",
       "style": ["file:./build/hero-section.css"],
       "category": "design",
       "icon": "admin-comments",
       "keywords": ["hero", "banner", "header"],
       "acf": {
           "mode": "preview",
           "renderTemplate": "hero-section.php"
       },
       "supports": {
           "anchor": true
       }
   }
   ```

3. **Create hero-section.php**
   ```php
   <?php
   $title = get_field('title') ?: 'Default Title';
   $subtitle = get_field('subtitle') ?: 'Default Subtitle';
   $background_image = get_field('background_image');
   $button_text = get_field('button_text') ?: 'Learn More';
   $button_url = get_field('button_url') ?: '#';
   ?>
   
   <section class="hero-section" <?php if ($background_image): ?>style="background-image: url('<?php echo $background_image['url']; ?>')"<?php endif; ?>>
       <div class="hero-section__content">
           <h1 class="hero-section__title"><?php echo esc_html($title); ?></h1>
           <p class="hero-section__subtitle"><?php echo esc_html($subtitle); ?></p>
           <a href="<?php echo esc_url($button_url); ?>" class="hero-section__button">
               <?php echo esc_html($button_text); ?>
           </a>
       </div>
   </section>
   ```

4. **Create block.scss**
   ```scss
   .hero-section {
       position: relative;
       min-height: 500px;
       display: flex;
       align-items: center;
       justify-content: center;
       background-size: cover;
       background-position: center;
       background-repeat: no-repeat;
       
       &__content {
           text-align: center;
           color: white;
           max-width: 800px;
           padding: 2rem;
       }
       
       &__title {
           font-size: 3rem;
           margin-bottom: 1rem;
           font-weight: 700;
       }
       
       &__subtitle {
           font-size: 1.25rem;
           margin-bottom: 2rem;
           opacity: 0.9;
       }
       
       &__button {
           display: inline-block;
           padding: 1rem 2rem;
           background-color: #007cba;
           color: white;
           text-decoration: none;
           border-radius: 4px;
           font-weight: 600;
           transition: background-color 0.3s ease;
           
           &:hover {
               background-color: #005a87;
           }
       }
   }
   ```

5. **Create block.js (Optional)**
   ```javascript
   // Hero section JavaScript functionality
   document.addEventListener('DOMContentLoaded', function() {
       const heroSections = document.querySelectorAll('.hero-section');
       
       heroSections.forEach(section => {
           // Add any JavaScript functionality here
           console.log('Hero section loaded:', section);
       });
   });
   ```

### ACF Field Group Configuration

Create an ACF field group for your block:

1. **In WordPress Admin**: Go to Custom Fields > Field Groups
2. **Create New Field Group**: Name it "Hero Section"
3. **Add Fields**:
   - Title (Text)
   - Subtitle (Textarea)
   - Background Image (Image)
   - Button Text (Text)
   - Button URL (URL)
4. **Set Location Rules**: Block is equal to Hero Section
5. **Save and Publish**

### ACF Block Structure

```
blocks/acf/hero-section/
├── block.json              # Block configuration
├── hero-section.php        # PHP template (matches folder basename)
├── block.scss              # Stylesheet
├── block.js                # JavaScript (optional)
├── hero-section.field-group.json  # ACF field group (auto-generated)
└── build/                  # Compiled assets (auto-generated)
    ├── hero-section.build.css
    ├── hero-section.build.css.map # Development file
    ├── hero-section.build.js
    └── hero-section.build.js.map  # Development file
```

## Block Configuration Options

### block.json Configuration

| Option | Type | Description |
|--------|------|-------------|
| `name` | string | Block namespace/name (e.g., "your-project/hero-section") |
| `title` | string | Human-readable block title |
| `description` | string | Block description |
| `category` | string | Block category (text, media, design, widgets, theme, custom) |
| `icon` | string | Block icon (Dashicon name) |
| `keywords` | array | Search keywords for the block |
| `style` | array | Stylesheet files |
| `script` | array | JavaScript files |
| `supports` | object | Block supports (anchor, align, etc.) |
| `acf` | object | ACF-specific configuration |

### Block Categories

- **text**: Text-based blocks
- **media**: Media and image blocks
- **design**: Layout and design blocks
- **widgets**: Widget-like blocks
- **theme**: Theme-specific blocks
- **custom**: Custom category (specify name)

### Block Supports

```json
{
    "supports": {
        "anchor": true,
        "align": ["wide", "full"],
        "className": true,
        "customClassName": true,
        "html": false
    }
}
```

## Build Process

### Using the CLI Tool

```bash
# Development build
deodar development

# Production build
deodar production

# Watch mode for development
deodar watch
```

### Manual Build Process

1. **SCSS Compilation**: SCSS files are compiled to CSS
2. **JavaScript Bundling**: JS files are bundled and minified
3. **Source Maps**: Generated for development debugging
4. **File Generation**: Build files are created in `build/` directories

## Best Practices

### Block Development

1. **Naming Conventions**: Use kebab-case for block names
2. **File Organization**: Keep related files together
3. **Security**: Always escape output in PHP templates
4. **Performance**: Optimize images and assets
5. **Accessibility**: Follow WCAG guidelines

### ACF Field Management

1. **Field Naming**: Use descriptive field names
2. **Field Groups**: Organize fields logically
3. **Validation**: Add field validation rules
4. **Conditional Logic**: Use conditional field display
5. **Default Values**: Provide sensible defaults

### Styling Guidelines

1. **CSS Classes**: Use BEM methodology
2. **Responsive Design**: Mobile-first approach
3. **Performance**: Minimize CSS specificity
4. **Consistency**: Follow design system patterns
5. **Browser Support**: Test across browsers

## Examples

### Complete ACF Block Example

```php
// blocks/acf/testimonial/testimonial.php
<?php
    $quote = get_field('quote') ?: 'Default testimonial quote';
    $author = get_field('author') ?: 'Default Author';
    $company = get_field('company') ?: 'Default Company';
    $avatar = get_field('avatar');
?>

<div class="testimonial-block">
    <blockquote class="testimonial-block__quote">
        "<?php echo esc_html($quote); ?>"
    </blockquote>
    <div class="testimonial-block__author">
        <?php if ($avatar): ?>
            <img src="<?php echo esc_url($avatar['url']); ?>" alt="<?php echo esc_attr($author); ?>" class="testimonial-block__avatar">
        <?php endif; ?>
        <div class="testimonial-block__info">
            <cite class="testimonial-block__name"><?php echo esc_html($author); ?></cite>
            <span class="testimonial-block__company"><?php echo esc_html($company); ?></span>
        </div>
    </div>
</div>
```

## Troubleshooting

### Common Issues

**Block Not Appearing**
- Check block.json syntax
- Verify file paths
- Ensure ACF Pro is active
- Check WordPress block editor

**Styles Not Loading**
- Verify SCSS compilation
- Check build process
- Ensure proper file paths
- Check browser console

**Fields Not Saving**
- Verify ACF field group configuration
- Check location rules
- Ensure proper field names
- Test in different contexts

## Next Steps

Now that you can create blocks:
- [Working with Non ACF Blocks](./working-with-non-acf-blocks)
- [Learn about Post Types](./post-types)
- [Explore Taxonomies](./taxonomies)
- [Learn about Production Builds](./production-builds)
- [Master the CLI Tool](./cli-tool)

---

Ready to create amazing blocks? Start with the CLI tool and build something incredible!
