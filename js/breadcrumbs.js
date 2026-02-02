/**
 * Breadcrumbs.js - Auto-generated Breadcrumbs from URL Path
 * Kady Dennis - Mission Control Theme
 * 
 * Features:
 * - Auto-generates breadcrumbs from URL path
 * - Custom path mapping for friendly names
 * - Home icon with visual separator
 * - Mobile-responsive with truncation
 * - Matches website's dark theme styling
 * 
 * Usage: Include in any HTML page:
 * <div id="breadcrumbs"></div>
 * <script src="/js/breadcrumbs.js"></script>
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        containerId: 'breadcrumbs',
        homeUrl: '/',
        homeLabel: '🏠 Home',
        separator: '›',
        excludePaths: ['index.html', ''],
        maxSegmentLength: 25,
        maxTotalSegments: 4
    };

    // Path mappings for friendly display names
    // Add custom mappings here for prettier breadcrumb labels
    const PATH_MAPPINGS = {
        'services': 'Services',
        'resources': 'Resources',
        'freebies': 'Free Tools',
        'demos': 'Live Demos',
        'admin': 'Admin',
        'how-we-work': 'How We Work',
        'privacy': 'Privacy Policy',
        'clickup-business-hub': 'Business Hub',
        'system-audit': 'System Audit',
        'clickup-setup': 'ClickUp Setup',
        'ai-workflow-design': 'AI Workflows',
        'ai-guardrails': 'AI Guardrails',
        'data-risk-checklist': 'Data Risk Checklist',
        'data-security-guide': 'Security Guide',
        'pinchy-pact': 'Pinchy Pact',
        'recommended-solutions': 'Recommended Tools',
        'commission-tracker': 'Commission Tracker',
        'subscription-audit': 'Subscription Audit',
        'ai-readiness-checklist': 'AI Readiness'
    };

    // Service pages for cross-linking context
    const SERVICE_PAGES = {
        'clickup-business-hub': {
            title: 'ClickUp Business Hub',
            category: 'Services',
            url: '/services/clickup-business-hub.html'
        },
        'system-audit': {
            title: 'System Audit',
            category: 'Services',
            url: '/services/system-audit.html'
        },
        'clickup-setup': {
            title: 'ClickUp Setup',
            category: 'Services',
            url: '/services/clickup-setup.html'
        },
        'ai-workflow-design': {
            title: 'AI Workflow Design',
            category: 'Services',
            url: '/services/ai-workflow-design.html'
        }
    };

    /**
     * Format a path segment for display
     */
    function formatSegment(segment) {
        // Check custom mappings first
        if (PATH_MAPPINGS[segment]) {
            return PATH_MAPPINGS[segment];
        }
        
        // Remove file extension
        segment = segment.replace(/\.html?$/i, '');
        
        // Replace hyphens and underscores with spaces
        segment = segment.replace(/[-_]/g, ' ');
        
        // Capitalize first letter of each word
        return segment
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    /**
     * Truncate long segments
     */
    function truncateSegment(segment, maxLength = CONFIG.maxSegmentLength) {
        if (segment.length <= maxLength) return segment;
        return segment.substring(0, maxLength - 3) + '...';
    }

    /**
     * Parse the current URL path into breadcrumb segments
     */
    function parsePath() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        
        // Remove excluded paths (like index.html)
        const filtered = segments.filter(seg => 
            !CONFIG.excludePaths.includes(seg.toLowerCase())
        );
        
        return filtered;
    }

    /**
     * Build the breadcrumb data structure
     */
    function buildBreadcrumbs() {
        const segments = parsePath();
        const breadcrumbs = [];
        let accumulatedPath = '';
        
        // Always start with Home
        breadcrumbs.push({
            label: CONFIG.homeLabel,
            url: CONFIG.homeUrl,
            isHome: true
        });
        
        // Build up segments
        segments.forEach((segment, index) => {
            accumulatedPath += '/' + segment;
            
            // Remove .html extension for cleaner URLs
            const cleanSegment = segment.replace(/\.html?$/i, '');
            
            breadcrumbs.push({
                label: truncateSegment(formatSegment(cleanSegment)),
                url: accumulatedPath,
                isLast: index === segments.length - 1,
                raw: cleanSegment
            });
        });
        
        return breadcrumbs;
    }

    /**
     * Create CSS styles for breadcrumbs
     */
    function createStyles() {
        if (document.getElementById('breadcrumbs-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'breadcrumbs-styles';
        styles.textContent = `
            #${CONFIG.containerId} {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 0.85rem;
                color: #8888a0;
                padding: 0.75rem 0;
                margin: 0;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            #${CONFIG.containerId} .breadcrumb-item {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            #${CONFIG.containerId} .breadcrumb-link {
                color: #00d4ff;
                text-decoration: none;
                transition: all 0.3s ease;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                white-space: nowrap;
            }
            
            #${CONFIG.containerId} .breadcrumb-link:hover {
                background: rgba(0, 212, 255, 0.1);
                text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            }
            
            #${CONFIG.containerId} .breadcrumb-link.home {
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
            }
            
            #${CONFIG.containerId} .breadcrumb-current {
                color: #e8e8ec;
                font-weight: 500;
                padding: 0.25rem 0.5rem;
                white-space: nowrap;
            }
            
            #${CONFIG.containerId} .breadcrumb-separator {
                color: #5a5a6e;
                font-size: 0.75rem;
                user-select: none;
            }
            
            /* Mobile truncation */
            @media (max-width: 640px) {
                #${CONFIG.containerId} {
                    font-size: 0.8rem;
                }
                
                #${CONFIG.containerId} .breadcrumb-item:not(:first-child):not(:last-child) {
                    display: none;
                }
                
                #${CONFIG.containerId} .breadcrumb-item:nth-last-child(2) {
                    display: inline-flex !important;
                }
            }
            
            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                #${CONFIG.containerId} .breadcrumb-link {
                    transition: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Render breadcrumbs to the DOM
     */
    function render() {
        const container = document.getElementById(CONFIG.containerId);
        if (!container) return;
        
        const breadcrumbs = buildBreadcrumbs();
        
        // Apply max segments limit (keep first, last, and middle)
        let displayCrumbs = breadcrumbs;
        if (breadcrumbs.length > CONFIG.maxTotalSegments) {
            const first = breadcrumbs[0];
            const last = breadcrumbs[breadcrumbs.length - 1];
            const middle = breadcrumbs.slice(1, -1);
            
            // Show first, ellipsis placeholder, and last 2
            const visibleMiddle = middle.slice(-1);
            displayCrumbs = [first, ...visibleMiddle, last];
        }
        
        // Generate HTML
        const html = displayCrumbs.map((crumb, index) => {
            const isLast = index === displayCrumbs.length - 1;
            const separator = !isLast ? 
                `<span class="breadcrumb-separator" aria-hidden="true">${CONFIG.separator}</span>` : '';
            
            if (isLast) {
                return `
                    <span class="breadcrumb-item">
                        <span class="breadcrumb-current" aria-current="page">${crumb.label}</span>
                    </span>
                `;
            }
            
            const homeClass = crumb.isHome ? 'home' : '';
            return `
                <span class="breadcrumb-item">
                    <a href="${crumb.url}" class="breadcrumb-link ${homeClass}">${crumb.label}</a>
                    ${separator}
                </span>
            `;
        }).join('');
        
        container.innerHTML = html;
        container.setAttribute('aria-label', 'Breadcrumb navigation');
    }

    /**
     * Initialize breadcrumbs
     */
    function init() {
        createStyles();
        render();
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API for external use
    window.Breadcrumbs = {
        /**
         * Re-render breadcrumbs (useful after dynamic navigation)
         */
        refresh: render,
        
        /**
         * Get current breadcrumb data
         */
        getData: buildBreadcrumbs,
        
        /**
         * Add a custom path mapping
         */
        addMapping: function(path, label) {
            PATH_MAPPINGS[path] = label;
            render();
        },
        
        /**
         * Get service page info for cross-linking
         */
        getServiceInfo: function(slug) {
            return SERVICE_PAGES[slug] || null;
        },
        
        /**
         * Get current page context (useful for related posts)
         */
        getCurrentContext: function() {
            const segments = parsePath();
            const currentPage = segments[segments.length - 1] || 'home';
            const parentSection = segments[0] || null;
            
            return {
                page: currentPage.replace(/\.html?$/i, ''),
                section: parentSection,
                path: segments,
                isServicePage: parentSection === 'services',
                isResourcePage: parentSection === 'resources',
                isFreebiePage: parentSection === 'freebies'
            };
        },
        
        version: '1.0.0'
    };

})();