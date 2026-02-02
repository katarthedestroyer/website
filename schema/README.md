# Schema Markup Foundation for kadydennis.com

Complete JSON-LD schema markup collection for SEO optimization.

## 📁 File Structure

### Individual Schema Components (JSON)
These are the raw schema components for reference and customization:

| File | Purpose |
|------|---------|
| `01-organization.json` | Organization schema for kadydennis.com |
| `02a-service-tern-setup.json` | Service schema - Tern Setup & Optimization |
| `02b-service-crm-migration.json` | Service schema - CRM Migration |
| `02c-service-workflow-automation.json` | Service schema - Workflow Automation |
| `02d-service-training-support.json` | Service schema - Training & Support |
| `03-localbusiness.json` | LocalBusiness / ProfessionalService schema |
| `04a-breadcrumb-home.json` | Breadcrumb for homepage |
| `04b-breadcrumb-services.json` | Breadcrumb for services page |
| `04c-breadcrumb-about.json` | Breadcrumb for about page |
| `04d-breadcrumb-contact.json` | Breadcrumb for contact page |
| `04e-breadcrumb-service-detail.json` | Breadcrumb for service detail pages |

### HTML Templates (Copy-Paste Ready)
These are complete, ready-to-use templates. Copy the entire `<script>` block into your HTML `<head>`:

| File | Page Type |
|------|-----------|
| `10-template-homepage.html` | Homepage |
| `11-template-services.html` | Services listing page |
| `12-template-about.html` | About page |
| `13-template-contact.html` | Contact page |
| `14-template-service-detail.html` | Individual service pages (customizable) |
| `15-template-blog-post.html` | Blog posts (customizable) |
| `16-template-faq.html` | FAQ page with structured FAQ schema |

## 🚀 Quick Start

1. **Copy the template** for your page type
2. **Paste into `<head>`** section of your HTML
3. **Customize** any placeholder values (marked with CAPS or comments)
4. **Validate** using Google's Rich Results Test: https://search.google.com/test/rich-results

## 📝 Customization Checklist

### Before Going Live, Update These Values:

- [ ] Replace `https://kadydennis.com` with your actual domain if different
- [ ] Replace `hello@kadydennis.com` with actual contact email
- [ ] Update `logo.png` path to actual logo file
- [ ] Update `og-image.jpg` path to actual Open Graph image
- [ ] Add LinkedIn profile URL to `sameAs` arrays
- [ ] Verify founding date (currently set to 2024)
- [ ] Add physical address to LocalBusiness schema if applicable
- [ ] Update opening hours if different

### For Service Detail Pages:

1. Replace `SERVICE-NAME` with URL slug (e.g., "tern-setup")
2. Replace `SERVICE TITLE` with page title
3. Replace `SERVICE DESCRIPTION` with compelling description
4. Update pricing in `OfferCatalog` items
5. Update breadcrumb item 3 to match service name

### For Blog Posts:

1. Replace `POST-SLUG` with URL-friendly slug
2. Replace `POST TITLE` with actual title
3. Update `datePublished` and `dateModified` with ISO 8601 dates
4. Replace `POST-IMAGE.jpg` with featured image filename
5. Update keywords array for the specific topic

## 🔍 Schema Types Used

| Schema Type | Purpose |
|-------------|---------|
| `Organization` | Business entity information |
| `ProfessionalService` | Local business / service provider |
| `Service` | Individual services with pricing |
| `Offer` / `OfferCatalog` | Pricing packages |
| `WebSite` | Website entity |
| `WebPage` | Individual page entity |
| `Person` | About page / author info |
| `BreadcrumbList` | Navigation breadcrumbs |
| `BlogPosting` | Blog article markup |
| `FAQPage` | FAQ structured data |
| `ContactPage` | Contact page markup |

## ✅ Validation

Always validate your schema markup before deploying:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console**: Check for structured data errors after deployment

## 📊 Expected Rich Results

With this schema markup, your pages may be eligible for:

- **Sitelinks Searchbox** (homepage)
- **Breadcrumbs** in search results
- **FAQ Rich Results** (FAQ page)
- **Article Rich Results** (blog posts)
- **Service Rich Results** (service pages)
- **Knowledge Panel** (organization)

## 🔄 Maintenance

When updating your site:

1. **New service?** Copy `14-template-service-detail.html` and customize
2. **New blog post?** Copy `15-template-blog-post.html` and customize
3. **Price changes?** Update all relevant service schema files
4. **New testimonials?** Add `Review` schema to service pages
5. **New packages?** Add to `OfferCatalog` in service schemas

## 📚 Resources

- [Schema.org Full Hierarchy](https://schema.org/docs/full.html)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [JSON-LD Specification](https://json-ld.org/)

---

Created: 2026-02-01
For: kadydennis.com
