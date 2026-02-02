# Internal Linking Architecture - Usage Guide

## Overview

This internal linking system provides three key features for the Kady Dennis website:

1. **Auto-generated Breadcrumbs** - URL-based navigation breadcrumbs
2. **Related Posts** - Tag-based content recommendations  
3. **Service Cross-linking** - Contextual service recommendations on resource pages

---

## Files

```
/js/breadcrumbs.js       - Auto-generated breadcrumb navigation
/js/related-posts.js     - Related content & service cross-linking
```

---

## 1. Breadcrumbs Usage

### Basic Setup

Add a container element to your HTML:

```html
<!-- In your page header or below navigation -->
<div id="breadcrumbs"></div>

<!-- Include the script -->
<script src="/js/breadcrumbs.js"></script>
```

### How It Works

Breadcrumbs are automatically generated from the URL path:
- `/services/clickup-business-hub.html` → Home › Services › Business Hub
- `/resources/ai-guardrails.html` → Home › Resources › AI Guardrails Guide

### Custom Path Mappings

The script includes friendly names for common paths. To add new mappings:

```javascript
// After including breadcrumbs.js
Breadcrumbs.addMapping('new-page-slug', 'Pretty Page Name');

// Example:
Breadcrumbs.addMapping('vip-services', 'VIP Concierge Services');
```

### JavaScript API

```javascript
// Refresh breadcrumbs (after dynamic navigation)
Breadcrumbs.refresh();

// Get current breadcrumb data
const crumbs = Breadcrumbs.getData();
// Returns: [{label: 'Home', url: '/', isHome: true}, ...]

// Get current page context
const ctx = Breadcrumbs.getCurrentContext();
// Returns: {page, section, path, isServicePage, isResourcePage, ...}

// Get service info by slug
const service = Breadcrumbs.getServiceInfo('clickup-business-hub');
```

---

## 2. Related Posts Usage

### Basic Setup

Add containers to your HTML:

```html
<!-- Related content suggestions -->
<div id="related-posts"></div>

<!-- Previous/Next navigation -->
<div id="post-navigation"></div>

<!-- Service cross-linking (shows on resource pages) -->
<div id="service-crosslink"></div>

<!-- Include the script -->
<script src="/js/related-posts.js"></script>
```

### Adding Page Metadata

For best results, add meta tags to your pages:

```html
<!-- Comma-separated tags for matching -->
<meta name="page-tags" content="clickup, automation, workflow, crm">

<!-- Category for filtering -->
<meta name="page-category" content="services">

<!-- Optional: series for sequential content -->
<meta name="page-series" content="ai-implementation">
```

### How Related Posts Work

1. **Tag Matching**: Pages with shared tags are scored by similarity
2. **Section Priority**: Same-section content is prioritized
3. **Explicit Relations**: You can define `related` arrays in the content database
4. **Service Cross-linking**: Resource pages automatically suggest relevant services

### Customizing the Content Database

To add new content, use the JavaScript API:

```javascript
// Add a new service
RelatedPosts.addContent('services', {
    id: 'new-service',
    title: 'New Service Name',
    description: 'Service description here...',
    url: '/services/new-service.html',
    tags: ['tag1', 'tag2'],
    category: 'premium',
    price: '$999',
    related: ['existing-service-1', 'existing-service-2']
});

// Add a new resource
RelatedPosts.addContent('resources', {
    id: 'new-guide',
    title: 'New Guide',
    description: 'Guide description...',
    url: '/resources/new-guide.html',
    tags: ['security', 'privacy'],
    category: 'guide',
    readTime: '10 min',
    relatedServices: ['system-audit', 'clickup-business-hub']
});
```

### JavaScript API

```javascript
// Refresh all related content
RelatedPosts.refresh();

// Get current page metadata
const meta = RelatedPosts.getCurrentMeta();

// Find related content programmatically
const related = RelatedPosts.findRelated(meta, 'services');
// Returns scored array: [{title, url, score, ...}]

// Get related services
const services = RelatedPosts.findRelatedServices(meta);

// Get prev/next navigation
const nav = RelatedPosts.getNavigation(meta);
// Returns: {prev: {...}, next: {...}, section: 'resources'}

// Update configuration
RelatedPosts.configure({
    maxRelatedPosts: 5,
    maxRelatedServices: 3
});
```

---

## 3. Complete Integration Example

Here's a complete example for a service page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ClickUp Business Hub | Kady Dennis</title>
    
    <!-- Page metadata for related posts -->
    <meta name="page-tags" content="clickup, crm, workflow, automation, ai">
    <meta name="page-category" content="services">
    
    <!-- Your existing CSS -->
    <link rel="stylesheet" href="/css/fonts.css">
</head>
<body>
    <!-- Navigation -->
    <nav>...</nav>
    
    <!-- Breadcrumbs appear here -->
    <div class="container">
        <div id="breadcrumbs"></div>
    </div>
    
    <!-- Main content -->
    <main>
        <section class="hero">
            <h1>ClickUp Business Hub</h1>
            ...
        </section>
        
        <!-- Your page content -->
        ...
        
        <!-- Service cross-linking (shows other relevant services) -->
        <section>
            <div id="service-crosslink"></div>
        </section>
        
        <!-- Related posts/resources -->
        <section>
            <div id="related-posts"></div>
        </section>
        
        <!-- Previous/Next navigation -->
        <div id="post-navigation"></div>
    </main>
    
    <!-- Footer -->
    <footer>...</footer>
    
    <!-- Scripts -->
    <script src="/js/breadcrumbs.js"></script>
    <script src="/js/related-posts.js"></script>
</body>
</html>
```

---

## 4. Resource Page Example

For blog posts and resource pages, the service cross-linking becomes active:

```html
<!-- In a resource page like /resources/ai-guardrails.html -->
<meta name="page-tags" content="ai, security, ethics, guidelines">
<meta name="page-category" content="resources">

<!-- Containers -->
<div id="breadcrumbs"></div>
<article>...</article>

<!-- This will show relevant services like AI Workflow Design -->
<div id="service-crosslink"></div>

<!-- This will show related resources -->
<div id="related-posts"></div>

<!-- Previous/next resources -->
<div id="post-navigation"></div>
```

---

## 5. Styling

Both scripts inject their own CSS automatically. The styles match the Mission Control theme:

- **Breadcrumbs**: Inline links with `›` separator, cyan accent color
- **Related Cards**: Dark cards with hover lift effect
- **Navigation**: Split prev/next with arrow indicators
- **Cross-linking**: Highlighted box with gradient top border

To override styles, target the specific IDs:

```css
/* Custom breadcrumb styling */
#breadcrumbs .breadcrumb-link {
    color: #your-color;
}

/* Custom related card styling */
#related-posts .related-post-card {
    border-radius: 20px;
}
```

---

## 6. Static Site Generation (Optional)

For better SEO, you can pre-render breadcrumbs server-side:

```javascript
// Node.js example for static generation
function generateBreadcrumbs(path) {
    // Logic from breadcrumbs.js
    // Returns HTML string
}

// Use in your build process
const breadcrumbHTML = generateBreadcrumbs('/services/clickup-setup.html');
// Insert into template
```

The JavaScript will still enhance functionality client-side.

---

## 7. Performance Notes

- Both scripts are self-contained IIFEs (~11KB + ~26KB)
- No external dependencies
- Styles are injected only once
- Content database is inline (can be split to JSON for larger sites)
- Lazy initialization on DOMContentLoaded

---

## 8. Maintenance

### Adding New Pages

1. **For Breadcrumbs**: Add path mapping if needed (friendly names)
2. **For Related Posts**: Add to `SITE_CONTENT` database in `related-posts.js`

### Modifying the Content Database

Edit `related-posts.js` and update these arrays:
- `SITE_CONTENT.services` - Service offerings
- `SITE_CONTENT.resources` - Blog posts and guides
- `SITE_CONTENT.freebies` - Free tools and templates
- `SITE_CONTENT.pages` - Static pages for navigation

Each item should include:
- `id` - Unique identifier
- `title` - Display title
- `description` - Short description
- `url` - Relative URL
- `tags` - Array of strings for matching
- `related` or `relatedServices` - Arrays of IDs for explicit relations

---

## 9. Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used (template literals, arrow functions, destructuring)
- Graceful degradation: containers simply won't render if JS is disabled

---

## Quick Reference

| Feature | Container ID | Script |
|---------|--------------|--------|
| Breadcrumbs | `#breadcrumbs` | `breadcrumbs.js` |
| Related Posts | `#related-posts` | `related-posts.js` |
| Post Navigation | `#post-navigation` | `related-posts.js` |
| Service Cross-linking | `#service-crosslink` | `related-posts.js` |