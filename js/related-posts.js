/**
 * Related Posts & Internal Linking Module
 * Kady Dennis - Mission Control Theme
 * 
 * Features:
 * 1. Related posts suggestions based on tags/categories
 * 2. Previous/next post navigation for blog posts
 * 3. Service cross-linking recommendations
 * 4. Contextual "You might also like" sections
 * 
 * Usage: 
 * Include in any HTML page:
 * <div id="related-posts"></div>
 * <script src="/js/related-posts.js"></script>
 * 
 * Data Structure:
 * Pages should have meta tags for optimal functionality:
 * <meta name="page-tags" content="clickup, automation, workflow">
 * <meta name="page-category" content="services">
 * <meta name="page-series" content="ai-workflows">
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        maxRelatedPosts: 3,
        maxRelatedServices: 2,
        containerId: 'related-posts',
        navContainerId: 'post-navigation',
        servicesContainerId: 'service-crosslink',
        enableNav: true,
        enableServices: true
    };

    // Site content database - populated from crawling or manual definition
    // In production, this could be loaded from a JSON file
    const SITE_CONTENT = {
        // Services
        services: [
            {
                id: 'clickup-business-hub',
                title: 'ClickUp Business Hub',
                description: 'Complete business operating system with AI-powered workflows for luxury travel advisors.',
                url: '/services/clickup-business-hub.html',
                tags: ['clickup', 'crm', 'workflow', 'automation', 'ai', 'business-system'],
                category: 'premium',
                price: '$1,297+',
                related: ['clickup-setup', 'system-audit', 'ai-workflow-design']
            },
            {
                id: 'system-audit',
                title: 'System Audit',
                description: 'Comprehensive analysis of your current tools, workflows, and opportunities for AI integration.',
                url: '/services/system-audit.html',
                tags: ['audit', 'analysis', 'optimization', 'review'],
                category: 'diagnostic',
                price: '$497',
                related: ['clickup-business-hub', 'clickup-setup']
            },
            {
                id: 'clickup-setup',
                title: 'ClickUp Setup',
                description: 'Professional ClickUp workspace configuration tailored to your travel business.',
                url: '/services/clickup-setup.html',
                tags: ['clickup', 'setup', 'configuration', 'crm'],
                category: 'implementation',
                price: '$797',
                related: ['clickup-business-hub', 'system-audit']
            },
            {
                id: 'ai-workflow-design',
                title: 'AI Workflow Design',
                description: 'Custom AI-powered automation workflows that integrate with your existing systems.',
                url: '/services/ai-workflow-design.html',
                tags: ['ai', 'automation', 'workflow', 'n8n', 'make', 'zapier'],
                category: 'automation',
                price: '$997',
                related: ['clickup-business-hub', 'system-audit']
            }
        ],

        // Resources/Blog posts
        resources: [
            {
                id: 'ai-guardrails',
                title: 'AI Guardrails Guide',
                description: 'Essential frameworks for implementing AI safely in your travel business.',
                url: '/resources/ai-guardrails.html',
                tags: ['ai', 'security', 'ethics', 'guidelines'],
                category: 'guide',
                readTime: '8 min',
                relatedServices: ['ai-workflow-design', 'clickup-business-hub']
            },
            {
                id: 'data-risk-checklist',
                title: 'Data Risk Checklist',
                description: 'Protect your client data with this comprehensive security checklist.',
                url: '/resources/data-risk-checklist.html',
                tags: ['security', 'data', 'privacy', 'compliance'],
                category: 'checklist',
                readTime: '5 min',
                relatedServices: ['system-audit']
            },
            {
                id: 'data-security-guide',
                title: 'Data Security Guide',
                description: 'Best practices for securing sensitive travel client information.',
                url: '/resources/data-security-guide.html',
                tags: ['security', 'data', 'privacy', 'best-practices'],
                category: 'guide',
                readTime: '12 min',
                relatedServices: ['system-audit', 'clickup-business-hub']
            },
            {
                id: 'recommended-solutions',
                title: 'Recommended Tools',
                description: 'Curated tech stack recommendations for luxury travel advisors.',
                url: '/resources/recommended-solutions.html',
                tags: ['tools', 'software', 'recommendations', 'stack'],
                category: 'resource',
                readTime: '6 min',
                relatedServices: ['system-audit', 'clickup-setup']
            },
            {
                id: 'pinchy-pact',
                title: 'The Pinchy Pact',
                description: 'Our ethical commitment to responsible AI implementation.',
                url: '/resources/pinchy-pact.html',
                tags: ['ethics', 'ai', 'commitment', 'values'],
                category: 'manifesto',
                readTime: '4 min',
                relatedServices: ['ai-workflow-design']
            }
        ],

        // Free tools
        freebies: [
            {
                id: 'commission-tracker',
                title: 'Commission Tracker',
                description: 'Free spreadsheet template to track your travel commissions.',
                url: '/freebies/commission-tracker.html',
                tags: ['commission', 'finance', 'tracking', 'template'],
                category: 'template',
                relatedServices: ['clickup-business-hub']
            },
            {
                id: 'subscription-audit',
                title: 'Subscription Audit',
                description: 'Audit your monthly software subscriptions and find savings.',
                url: '/freebies/subscription-audit.html',
                tags: ['audit', 'expenses', 'subscriptions', 'savings'],
                category: 'worksheet',
                relatedServices: ['system-audit']
            },
            {
                id: 'ai-readiness-checklist',
                title: 'AI Readiness Checklist',
                description: 'Assess if your business is ready for AI implementation.',
                url: '/freebies/ai-readiness-checklist.html',
                tags: ['ai', 'readiness', 'assessment', 'checklist'],
                category: 'checklist',
                relatedServices: ['ai-workflow-design', 'system-audit']
            }
        ],

        // Other pages with ordering for prev/next navigation
        pages: [
            { id: 'home', title: 'Home', url: '/', order: 0 },
            { id: 'how-we-work', title: 'How We Work', url: '/how-we-work.html', order: 1 },
            { id: 'services', title: 'Services', url: '/services/', order: 2 },
            { id: 'resources', title: 'Resources', url: '/resources/', order: 3 },
            { id: 'freebies', title: 'Free Tools', url: '/freebies/', order: 4 },
            { id: 'demos', title: 'Demos', url: '/demos/', order: 5 }
        ]
    };

    /**
     * Get current page metadata from DOM
     */
    function getCurrentPageMeta() {
        // Try to get from meta tags
        const tagsMeta = document.querySelector('meta[name="page-tags"]');
        const categoryMeta = document.querySelector('meta[name="page-category"]');
        const seriesMeta = document.querySelector('meta[name="page-series"]');
        
        // Extract from URL as fallback
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(Boolean);
        const section = pathParts[0] || 'home';
        const pageId = pathParts[pathParts.length - 1]?.replace(/\.html?$/i, '') || 'home';
        
        return {
            id: pageId,
            section: section,
            path: path,
            tags: tagsMeta ? tagsMeta.content.split(',').map(t => t.trim()) : [],
            category: categoryMeta ? categoryMeta.content : null,
            series: seriesMeta ? seriesMeta.content : null,
            title: document.title.split('|')[0].trim()
        };
    }

    /**
     * Calculate tag similarity score between two items
     */
    function calculateSimilarity(item1, item2) {
        const tags1 = item1.tags || [];
        const tags2 = item2.tags || [];
        
        if (tags1.length === 0 || tags2.length === 0) return 0;
        
        const intersection = tags1.filter(tag => tags2.includes(tag));
        const union = [...new Set([...tags1, ...tags2])];
        
        return intersection.length / union.length;
    }

    /**
     * Find related content based on tags
     */
    function findRelatedContent(currentMeta, contentType = 'all') {
        const allContent = [];
        
        // Gather content based on type
        if (contentType === 'all' || contentType === 'services') {
            allContent.push(...SITE_CONTENT.services.map(s => ({ ...s, type: 'service' })));
        }
        if (contentType === 'all' || contentType === 'resources') {
            allContent.push(...SITE_CONTENT.resources.map(r => ({ ...r, type: 'resource' })));
        }
        if (contentType === 'all' || contentType === 'freebies') {
            allContent.push(...SITE_CONTENT.freebies.map(f => ({ ...f, type: 'freebie' })));
        }
        
        // Filter out current page
        const filtered = allContent.filter(item => {
            const itemPath = item.url.replace(/\.html?$/i, '').replace(/\/$/, '');
            const currentPath = currentMeta.path.replace(/\.html?$/i, '').replace(/\/$/, '');
            return itemPath !== currentPath;
        });
        
        // Calculate similarity scores
        const scored = filtered.map(item => ({
            ...item,
            score: calculateSimilarity(
                { tags: currentMeta.tags },
                { tags: item.tags }
            )
        }));
        
        // Sort by score descending
        scored.sort((a, b) => b.score - a.score);
        
        return scored;
    }

    /**
     * Find related services for a resource page
     */
    function findRelatedServices(currentMeta) {
        // Check if current page has explicit related services
        const currentPage = [...SITE_CONTENT.resources, ...SITE_CONTENT.freebies]
            .find(p => p.id === currentMeta.id);
        
        if (currentPage && currentPage.relatedServices) {
            return currentPage.relatedServices
                .map(id => SITE_CONTENT.services.find(s => s.id === id))
                .filter(Boolean);
        }
        
        // Otherwise, find by tag similarity
        const services = SITE_CONTENT.services.map(s => ({ ...s, type: 'service' }));
        const scored = services.map(service => ({
            ...service,
            score: calculateSimilarity(
                { tags: currentMeta.tags },
                { tags: service.tags }
            )
        }));
        
        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, CONFIG.maxRelatedServices);
    }

    /**
     * Find previous and next pages for navigation
     */
    function findPrevNext(currentMeta) {
        // Try to find in the same section first
        const section = currentMeta.section;
        let sectionItems = [];
        
        if (section === 'services') {
            sectionItems = SITE_CONTENT.services.map((s, i) => ({ ...s, order: i }));
        } else if (section === 'resources') {
            sectionItems = SITE_CONTENT.resources.map((r, i) => ({ ...r, order: i }));
        } else if (section === 'freebies') {
            sectionItems = SITE_CONTENT.freebies.map((f, i) => ({ ...f, order: i }));
        }
        
        // Find current index
        const currentIndex = sectionItems.findIndex(item => item.id === currentMeta.id);
        
        if (currentIndex >= 0) {
            return {
                prev: currentIndex > 0 ? sectionItems[currentIndex - 1] : null,
                next: currentIndex < sectionItems.length - 1 ? sectionItems[currentIndex + 1] : null,
                section: section
            };
        }
        
        // Fallback to main pages
        const pageIndex = SITE_CONTENT.pages.findIndex(p => p.id === currentMeta.id || p.url === currentMeta.path);
        if (pageIndex >= 0) {
            return {
                prev: pageIndex > 0 ? SITE_CONTENT.pages[pageIndex - 1] : null,
                next: pageIndex < SITE_CONTENT.pages.length - 1 ? SITE_CONTENT.pages[pageIndex + 1] : null,
                section: null
            };
        }
        
        return { prev: null, next: null, section: null };
    }

    /**
     * Create CSS styles
     */
    function createStyles() {
        if (document.getElementById('related-posts-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'related-posts-styles';
        styles.textContent = `
            /* Related Posts Container */
            #${CONFIG.containerId} {
                margin: 3rem 0;
            }
            
            .related-posts-header {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.75rem;
                color: #00d4ff;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .related-posts-header::before {
                content: '';
                flex: 1;
                height: 1px;
                background: linear-gradient(90deg, rgba(0, 212, 255, 0.3), transparent);
            }
            
            .related-posts-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 1.5rem;
            }
            
            .related-post-card {
                background: #12121a;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 1.5rem;
                transition: all 0.3s ease;
                text-decoration: none;
                display: block;
            }
            
            .related-post-card:hover {
                border-color: rgba(0, 212, 255, 0.3);
                transform: translateY(-4px);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 212, 255, 0.1);
            }
            
            .related-post-type {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.65rem;
                color: #d4a853;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 0.5rem;
            }
            
            .related-post-title {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 1.1rem;
                color: #e8e8ec;
                margin-bottom: 0.5rem;
                line-height: 1.3;
            }
            
            .related-post-desc {
                font-size: 0.85rem;
                color: #8888a0;
                line-height: 1.5;
            }
            
            .related-post-meta {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
                font-size: 0.75rem;
                color: #5a5a6e;
            }
            
            .related-post-price {
                color: #00ff88;
                font-weight: 600;
            }
            
            /* Post Navigation */
            #${CONFIG.navContainerId} {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                margin: 3rem 0;
                padding-top: 2rem;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
            }
            
            .post-nav-link {
                flex: 1;
                max-width: 45%;
                padding: 1.25rem;
                background: #12121a;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                text-decoration: none;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .post-nav-link:hover {
                border-color: rgba(0, 212, 255, 0.3);
                background: #1a1a24;
            }
            
            .post-nav-link.prev {
                align-items: flex-start;
            }
            
            .post-nav-link.next {
                align-items: flex-end;
                text-align: right;
            }
            
            .post-nav-label {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.7rem;
                color: #00d4ff;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            
            .post-nav-title {
                font-size: 0.95rem;
                color: #e8e8ec;
                font-weight: 500;
            }
            
            /* Service Cross-linking */
            #${CONFIG.servicesContainerId} {
                background: linear-gradient(135deg, #12121a, #1a1a24);
                border: 1px solid rgba(0, 212, 255, 0.2);
                border-radius: 16px;
                padding: 2rem;
                margin: 3rem 0;
                position: relative;
                overflow: hidden;
            }
            
            #${CONFIG.servicesContainerId}::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, #00d4ff, #7c5cff);
            }
            
            .crosslink-header {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 1.25rem;
                color: #e8e8ec;
                margin-bottom: 0.5rem;
            }
            
            .crosslink-subtitle {
                font-size: 0.9rem;
                color: #8888a0;
                margin-bottom: 1.5rem;
            }
            
            .crosslink-services {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .crosslink-service {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 1.25rem;
                background: rgba(0, 212, 255, 0.05);
                border: 1px solid rgba(0, 212, 255, 0.1);
                border-radius: 8px;
                text-decoration: none;
                transition: all 0.3s ease;
            }
            
            .crosslink-service:hover {
                background: rgba(0, 212, 255, 0.1);
                border-color: rgba(0, 212, 255, 0.3);
            }
            
            .crosslink-service-info h4 {
                font-size: 1rem;
                color: #e8e8ec;
                margin-bottom: 0.25rem;
            }
            
            .crosslink-service-info p {
                font-size: 0.8rem;
                color: #8888a0;
            }
            
            .crosslink-service-cta {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.7rem;
                color: #00d4ff;
                white-space: nowrap;
            }
            
            /* Responsive */
            @media (max-width: 640px) {
                .related-posts-grid {
                    grid-template-columns: 1fr;
                }
                
                #${CONFIG.navContainerId} {
                    flex-direction: column;
                }
                
                .post-nav-link {
                    max-width: 100%;
                }
                
                .post-nav-link.next {
                    align-items: flex-start;
                    text-align: left;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Render related posts
     */
    function renderRelatedPosts(currentMeta) {
        const container = document.getElementById(CONFIG.containerId);
        if (!container) return;
        
        const related = findRelatedContent(currentMeta, 'all');
        const topRelated = related.slice(0, CONFIG.maxRelatedPosts);
        
        if (topRelated.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        const html = `
            <div class="related-posts-header">You Might Also Like</div>
            <div class="related-posts-grid">
                ${topRelated.map(item => `
                    <a href="${item.url}" class="related-post-card">
                        <div class="related-post-type">${item.type}</div>
                        <h3 class="related-post-title">${item.title}</h3>
                        <p class="related-post-desc">${item.description}</p>
                        ${item.price ? `<div class="related-post-meta"><span class="related-post-price">${item.price}</span></div>` : ''}
                        ${item.readTime ? `<div class="related-post-meta"><span>⏱ ${item.readTime} read</span></div>` : ''}
                    </a>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = html;
    }

    /**
     * Render previous/next navigation
     */
    function renderNavigation(currentMeta) {
        const container = document.getElementById(CONFIG.navContainerId);
        if (!container || !CONFIG.enableNav) return;
        
        const { prev, next } = findPrevNext(currentMeta);
        
        if (!prev && !next) {
            container.style.display = 'none';
            return;
        }
        
        let html = '';
        
        if (prev) {
            html += `
                <a href="${prev.url}" class="post-nav-link prev">
                    <span class="post-nav-label">← Previous</span>
                    <span class="post-nav-title">${prev.title}</span>
                </a>
            `;
        } else {
            html += `<div></div>`;
        }
        
        if (next) {
            html += `
                <a href="${next.url}" class="post-nav-link next">
                    <span class="post-nav-label">Next →</span>
                    <span class="post-nav-title">${next.title}</span>
                </a>
            `;
        }
        
        container.innerHTML = html;
    }

    /**
     * Render service cross-linking (for resource pages)
     */
    function renderServiceCrosslink(currentMeta) {
        const container = document.getElementById(CONFIG.servicesContainerId);
        if (!container || !CONFIG.enableServices) return;
        
        // Only show on resource or freebie pages
        if (currentMeta.section !== 'resources' && currentMeta.section !== 'freebies') {
            container.style.display = 'none';
            return;
        }
        
        const relatedServices = findRelatedServices(currentMeta);
        
        if (relatedServices.length === 0) {
            container.style.display = 'none'            ;
            return;
        }
        
        const html = `
            <h3 class="crosslink-header">Ready to implement this?</h3>
            <p class="crosslink-subtitle">Our services can help you put these concepts into action.</p>
            <div class="crosslink-services">
                ${relatedServices.map(service => `
                    <a href="${service.url}" class="crosslink-service">
                        <div class="crosslink-service-info">
                            <h4>${service.title}</h4>
                            <p>${service.description.substring(0, 80)}...</p>
                        </div>
                        <span class="crosslink-service-cta">Learn More →</span>
                    </a>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = html;
    }

    /**
     * Initialize the module
     */
    function init() {
        createStyles();
        
        const currentMeta = getCurrentPageMeta();
        
        renderRelatedPosts(currentMeta);
        renderNavigation(currentMeta);
        renderServiceCrosslink(currentMeta);
        
        // Expose current meta for debugging
        window.RelatedPosts.__meta = currentMeta;
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose public API
    window.RelatedPosts = {
        /**
         * Refresh all related content
         */
        refresh: init,
        
        /**
         * Get current page metadata
         */
        getCurrentMeta: getCurrentPageMeta,
        
        /**
         * Find related content programmatically
         */
        findRelated: findRelatedContent,
        
        /**
         * Find related services for current page
         */
        findRelatedServices: findRelatedServices,
        
        /**
         * Get prev/next navigation
         */
        getNavigation: findPrevNext,
        
        /**
         * Add custom content to the database
         */
        addContent: function(type, content) {
            if (SITE_CONTENT[type]) {
                SITE_CONTENT[type].push(content);
                init();
            }
        },
        
        /**
         * Update configuration
         */
        configure: function(options) {
            Object.assign(CONFIG, options);
            init();
        },
        
        version: '1.0.0'
    };

})();