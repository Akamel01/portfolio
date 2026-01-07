/**
 * ANALYTICS SETUP
 * This script initializes Google Analytics 4 (GA4) and Microsoft Clarity.
 */

/* =========================================
   ANALYTICS CONFIGURATION
   ========================================= */
const ANALYTICS_CONFIG = {
    // Provided Google Analytics Measurement ID
    GA_MEASUREMENT_ID: 'G-F5FZJE0BTR',

    // Placeholder for Microsoft Clarity Project ID (Update this later)
    CLARITY_PROJECT_ID: 'YOUR_CLARITY_ID_HERE'
};

/* =========================================
   INITIALIZATION LOGIC
   ========================================= */

(function initAnalytics() {
    const { GA_MEASUREMENT_ID, CLARITY_PROJECT_ID } = ANALYTICS_CONFIG;

    // --- Google Analytics 4 ---
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'YOUR_GA_ID_HERE') {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
        console.log('Google Analytics Initialized with ID:', GA_MEASUREMENT_ID);
    }

    // --- Microsoft Clarity ---
    if (CLARITY_PROJECT_ID && CLARITY_PROJECT_ID !== 'YOUR_CLARITY_ID_HERE') {
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
        console.log('Microsoft Clarity Initialized');
    } else {
        console.log('Microsoft Clarity skipped (Placeholder ID)');
    }

})();
