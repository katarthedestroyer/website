/**
 * Cookie Consent Banner
 * GDPR/CCPA Compliant Cookie Consent
 * Kady Dennis - Mission Control Theme
 * 
 * Usage: Include this script in any HTML page:
 * <script src="/js/cookie-consent.js"></script>
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        storageKey: 'cookie-consent-preference',
        cookieDuration: 365, // days
        privacyPolicyUrl: '/privacy.html',
        bannerId: 'cookie-consent-banner',
        bannerZIndex: 9999
    };

    // CSS Styles for the banner
    const bannerStyles = `
        #${CONFIG.bannerId} {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding: 1.25rem 2rem;
            z-index: ${CONFIG.bannerZIndex};
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            transform: translateY(100%);
            transition: transform 0.4s ease, opacity 0.4s ease;
            opacity: 0;
            box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5), 0 -4px 20px rgba(0, 212, 255, 0.1);
        }
        
        #${CONFIG.bannerId}.visible {
            transform: translateY(0);
            opacity: 1;
        }
        
        #${CONFIG.bannerId} .cookie-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            flex-wrap: wrap;
        }
        
        #${CONFIG.bannerId} .cookie-content {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex: 1;
            min-width: 280px;
        }
        
        #${CONFIG.bannerId} .cookie-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        
        #${CONFIG.bannerId} .cookie-text {
            color: #e8e8ec;
            font-size: 0.9rem;
            line-height: 1.5;
            margin: 0;
        }
        
        #${CONFIG.bannerId} .cookie-text a {
            color: #00d4ff;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.3s ease, text-shadow 0.3s ease;
        }
        
        #${CONFIG.bannerId} .cookie-text a:hover {
            border-bottom-color: #00d4ff;
            text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }
        
        #${CONFIG.bannerId} .cookie-actions {
            display: flex;
            gap: 0.75rem;
            flex-shrink: 0;
        }
        
        #${CONFIG.bannerId} .cookie-btn {
            padding: 0.65rem 1.5rem;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 0.02em;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            outline: none;
            font-family: inherit;
        }
        
        #${CONFIG.bannerId} .cookie-btn:focus {
            outline: 2px solid #00d4ff;
            outline-offset: 2px;
        }
        
        #${CONFIG.bannerId} .cookie-btn-primary {
            background: linear-gradient(135deg, #00d4ff, #7c5cff);
            color: #0a0a0f;
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }
        
        #${CONFIG.bannerId} .cookie-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(124, 92, 255, 0.3);
        }
        
        #${CONFIG.bannerId} .cookie-btn-primary:active {
            transform: translateY(0);
        }
        
        #${CONFIG.bannerId} .cookie-btn-secondary {
            background: transparent;
            color: #8888a0;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        #${CONFIG.bannerId} .cookie-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.05);
            color: #e8e8ec;
            border-color: rgba(255, 255, 255, 0.25);
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
            #${CONFIG.bannerId} {
                padding: 1rem;
            }
            
            #${CONFIG.bannerId} .cookie-container {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
            
            #${CONFIG.bannerId} .cookie-content {
                flex-direction: column;
                gap: 0.75rem;
                min-width: auto;
            }
            
            #${CONFIG.bannerId} .cookie-actions {
                width: 100%;
                justify-content: center;
            }
            
            #${CONFIG.bannerId} .cookie-btn {
                flex: 1;
                max-width: 150px;
            }
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            #${CONFIG.bannerId} {
                transition: none;
            }
            #${CONFIG.bannerId} .cookie-btn {
                transition: none;
            }
        }
    `;

    // Storage helpers
    const Storage = {
        get: function(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                // Fallback to cookies if localStorage fails
                const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
                return match ? JSON.parse(decodeURIComponent(match[2])) : null;
            }
        },
        set: function(key, value, days) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                // Fallback to cookies
                const expires = new Date(Date.now() + days * 864e5).toUTCString();
                document.cookie = key + '=' + encodeURIComponent(JSON.stringify(value)) + '; expires=' + expires + '; path=/; SameSite=Lax';
            }
        }
    };

    // Get privacy policy URL (handle different directory depths)
    function getPrivacyPolicyUrl() {
        const path = window.location.pathname;
        const depth = path.split('/').filter(Boolean).length;
        return depth > 0 ? '../'.repeat(depth - 1) + 'privacy.html' : 'privacy.html';
    }

    // Create banner element
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = CONFIG.bannerId;
        banner.innerHTML = `
            <div class="cookie-container">
                <div class="cookie-content">
                    <span class="cookie-icon" aria-hidden="true">🍪</span>
                    <p class="cookie-text">
                        We use essential cookies for site functionality. View our <a href="${getPrivacyPolicyUrl()}" rel="noopener">Privacy Policy</a> for more information.
                    </p>
                </div>
                <div class="cookie-actions">
                    <button class="cookie-btn cookie-btn-secondary" id="cookie-decline" aria-label="Decline cookies">
                        Decline
                    </button>
                    <button class="cookie-btn cookie-btn-primary" id="cookie-accept" aria-label="Accept cookies">
                        Accept
                    </button>
                </div>
            </div>
        `;
        return banner;
    }

    // Add styles to head
    function injectStyles() {
        if (document.getElementById('cookie-consent-styles')) return;
        const style = document.createElement('style');
        style.id = 'cookie-consent-styles';
        style.textContent = bannerStyles;
        document.head.appendChild(style);
    }

    // Show banner
    function showBanner() {
        const banner = document.getElementById(CONFIG.bannerId);
        if (banner) {
            // Small delay for animation
            requestAnimationFrame(() => {
                banner.classList.add('visible');
            });
        }
    }

    // Hide banner
    function hideBanner() {
        const banner = document.getElementById(CONFIG.bannerId);
        if (banner) {
            banner.classList.remove('visible');
            // Remove after animation
            setTimeout(() => {
                banner.remove();
            }, 400);
        }
    }

    // Handle user choice
    function handleConsent(accepted) {
        Storage.set(CONFIG.storageKey, {
            accepted: accepted,
            timestamp: new Date().toISOString(),
            version: '1.0'
        }, CONFIG.cookieDuration);
        hideBanner();
        
        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('cookieConsent', { 
            detail: { accepted: accepted } 
        }));
    }

    // Check if user has already made a choice
    function hasConsentChoice() {
        const consent = Storage.get(CONFIG.storageKey);
        return consent !== null;
    }

    // Initialize
    function init() {
        // Don't show if already decided
        if (hasConsentChoice()) return;

        // Inject styles
        injectStyles();

        // Create and append banner
        const banner = createBanner();
        document.body.appendChild(banner);

        // Add event listeners
        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => handleConsent(true));
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', () => handleConsent(false));
        }

        // Show after a short delay (respect user experience)
        setTimeout(showBanner, 500);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API for external use
    window.CookieConsent = {
        // Get current consent status
        getStatus: function() {
            return Storage.get(CONFIG.storageKey);
        },
        // Reset consent (for testing)
        reset: function() {
            localStorage.removeItem(CONFIG.storageKey);
            document.cookie = CONFIG.storageKey + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            location.reload();
        },
        // Show banner again
        show: function() {
            init();
        },
        // Version
        version: '1.0.0'
    };

})();
