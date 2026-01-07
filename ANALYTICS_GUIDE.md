# Portfolio Analytics Setup Guide

To get free, comprehensive analytics for your portfolio (Visitors, Locations, Heatmaps, Recordings), we have integrated **Google Analytics 4 (GA4)** and **Microsoft Clarity**.

**Cost:** Free forever (both have generous free tiers that will easily cover a portfolio).

## Step 1: Get Google Analytics 4 (GA4) ID
*Best for: Visitor counts, user locations, popular pages.*

1. Go to [analytics.google.com](https://analytics.google.com/).
2. Click **Start measuring** or **Create Property**.
3. **Account Name**: Enter "Portfolio".
4. **Property Name**: Enter "Ahmed Kamel Portfolio".
5. **Business Details**: Choose "Education" or "Tech", size "Small".
6. **Choose Objectives**: Select "Get baseline reports".
7. **Platform**: Choose **Web**.
8. **Website URL**: Enter `akamel-portfolio.netlify.app`.
9. **Stream Name**: Enter "Portfolio Website".
10. Click **Create stream**.
11. You will see a **Measurement ID** in the format `G-XXXXXXXXXX`. **Copy this ID.**

## Step 2: Get Microsoft Clarity ID
*Best for: Heatmaps (clicks), Session Recordings (seeing exactly what they see).*

1. Go to [clarity.microsoft.com](https://clarity.microsoft.com/).
2. Sign up / Sign in.
3. Click **New Project**.
4. **Name**: "Portfolio".
5. **Website**: `https://akamel-portfolio.netlify.app`.
6. Click **Add new project**.
7. Select **"Install manually"** (or just look at the URL).
8. Look for the **Project ID** in the URL of your dashboard (e.g., `clarity.microsoft.com/projects/view/YOUR_ID_HERE/settings`) or in the tracking code snippet (it's the string of random characters like `mixj84...`).
9. **Copy this Project ID.**

## Step 3: Activate in Your Code

1. Open the file `analytics.js` in your portfolio folder.
2. Replace the placeholders with your IDs:

```javascript
/* =========================================
   ANALYTICS CONFIGURATION
   ========================================= */
const ANALYTICS_CONFIG = {
    // Paste your Google Analytics Measurement ID here (e.g., 'G-12345ABCDE')
    GA_MEASUREMENT_ID: 'YOUR_GA_ID_HERE',

    // Paste your Microsoft Clarity Project ID here (e.g., 'ms_clarity_id_123')
    CLARITY_PROJECT_ID: 'YOUR_CLARITY_ID_HERE' 
};
```

3. Save the file.
4. **Commit and Push** your changes to GitHub. Netlify will redeploy automatically.

## Verification
- **Google Analytics**: Real-time reports show up within minutes.
- **Clarity**: Might take 1-2 hours to start showing data.
