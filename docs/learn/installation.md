---
sidebar_position: 2
---

# Installation

This guide will walk you through installing the core Deodar plugin on your WordPress site.

## Prerequisites

Before installing Deodar, ensure you have:

- **WordPress 6.7.2 or higher**
- **PHP 8.2 or higher**
- **Advanced Custom Fields Pro** (required for full functionality)
- **Node.js and npm** (for CLI tool and asset compilation)

## Installation Methods

### Method 1: Direct Upload (Recommended)

1. **Download the Plugin**
   - Download the latest version of the Deodar plugin
   - You'll receive a ZIP file (e.g., `deodar.zip`)

2. **Upload to WordPress**
   - Log into your WordPress admin dashboard
   - Navigate to **Plugins > Add New**
   - Click **Upload Plugin**
   - Choose the `deodar.zip` file
   - Click **Install Now**

3. **Activate the Plugin**
   - After installation, click **Activate Plugin**

### Method 2: FTP Upload

1. **Extract the ZIP File**
   - Extract the downloaded ZIP file to your local computer
   - You should see a `deodar` folder

2. **Upload via FTP**
   - Connect to your server via FTP
   - Navigate to `/wp-content/plugins/`
   - Upload the entire `deodar` folder

3. **Activate the Plugin**
   - Log into your WordPress admin dashboard
   - Navigate to **Plugins**
   - Find "Deodar" in the plugin list
   - Click **Activate**

### Method 3: WP-CLI (For Developers)

If you have WP-CLI installed, you can install Deodar via command line:

```bash
wp plugin install deodar.zip --activate
```

## Verification

After installation, verify that Deodar is working correctly:

1. **Check Plugin Status**
   - Go to **Plugins** in your WordPress admin
   - Confirm "Deodar" is listed and active

2. **Verify ACF Pro Integration**
   - Ensure Advanced Custom Fields Pro is installed and active
   - Deodar will automatically integrate with ACF Pro

3. **Check for Errors**
   - Look for any error messages in the WordPress admin
   - Check your error logs if you encounter issues

## Post-Installation Setup

Once Deodar is installed, you'll need to set up your first project:

### 1. Create Your Project Structure

Decide whether you want to create a theme or plugin project:

- **Theme Project**: For custom themes that use Deodar
- **Plugin Project**: For custom functionality that can work with any theme

### 2. Configure Your Project

Set up your project configuration using the `deodar` filter in your main file:

```php
// In your theme's functions.php or plugin's main file
add_filter('deodar', function($data) {
    return [
        'path' => get_template_directory(), // or plugin_dir_path(__FILE__)
        'url' => get_template_directory_uri(), // or plugin_dir_url(__FILE__)
        'production' => false, // Set to true in production
        // Add your configuration here
    ];
});
```

### 3. Install the CLI Tool

For enhanced development experience, install the Deodar CLI tool:

```bash
npm install -g deodar-cli
```

Or use it directly with npx:

```bash
npx deodar-cli new my-block
```

## Troubleshooting

### Common Issues

**Plugin Activation Failed**
- Check PHP version compatibility (requires PHP 8.2+)
- Verify WordPress version (requires 6.7.2+)
- Check for plugin conflicts

**ACF Pro Not Detected**
- Ensure Advanced Custom Fields Pro is installed and active
- Verify ACF Pro license is valid
- Check for ACF Pro version compatibility

**Permission Errors**
- Ensure proper file permissions (755 for directories, 644 for files)
- Check that your web server has write access to the plugins directory

### Getting Help

If you encounter issues:

1. **Check the Error Logs**
   - WordPress debug logs
   - Server error logs
   - Browser console for frontend issues

2. **Verify Requirements**
   - PHP version: `php -v`
   - WordPress version: Check in admin dashboard
   - ACF Pro status: Check in plugins list

3. **Contact Support**
   - Check the [GitHub repository](https://github.com/brockcataldi/deodar) for issues
   - Create a new issue if you don't find a solution



## System Requirements

### Minimum Requirements
- WordPress 6.7.2
- PHP 8.2
- MySQL 5.6 or MariaDB 10.1
- Advanced Custom Fields Pro 6.0+

### Recommended Requirements
- WordPress 6.8+
- PHP 8.3+
- MySQL 8.0 or MariaDB 10.6+
- Advanced Custom Fields Pro 6.3+
- Node.js 18+ (for CLI tool)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Next Steps

Ready to start building? Check out our [Theme vs Plugin guide](./theme-vs-plugin) to decide your development approach!

Here are some other guides to aid your Deodar Journey:

- [Choose between Theme or Plugin development](./theme-vs-plugin)
- [Set up your first project configuration](./styles-and-scripts)
- [Create your first custom block](./creating-blocks)
- [Learn about the CLI tool](./cli-tool)