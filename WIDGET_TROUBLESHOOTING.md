# SEO Audit Widget Troubleshooting Guide

## Issue: Unable to Enter URL in Widget

### Quick Checks

1. **Open Browser Console** (F12 → Console tab)
   - Look for any JavaScript errors
   - Check if `SAS_widget` is defined: Type `window.SAS_widget` in console
   - Should return a function, not `undefined`

2. **Check Network Tab** (F12 → Network tab)
   - Reload the page
   - Look for these requests:
     - `style.min.css` from api.seoaudit.software (should be 200 OK)
     - `api.min.js` from api.seoaudit.software (should be 200 OK)
   - If 404 or failed, the widget won't work

3. **Check Widget Element** (F12 → Elements tab)
   - Find: `<div class="sas-widget" id="sas-widget-8cbcaf530edba0a1aa7f31878f8043b8">`
   - Should have child elements added by the widget script
   - If empty, the widget didn't initialize

---

## Common Issues & Solutions

### Issue 1: Script Not Loading

**Symptom**: Console shows `SAS_widget is not defined`

**Solution**:
```tsx
// Change script strategy in layout.tsx from:
strategy="afterInteractive"

// To:
strategy="beforeInteractive"
```

### Issue 2: Widget Not Initializing

**Symptom**: Widget div exists but is empty

**Solution**: Ensure the inline script runs after the main script loads
```tsx
<Script
  src="https://api.seoaudit.software/files/widget/v3.1/js/api.min.js"
  strategy="afterInteractive"
  onLoad={() => {
    if (typeof window !== 'undefined' && (window as any).SAS_widget) {
      new (window as any).SAS_widget('#sas-widget-8cbcaf530edba0a1aa7f31878f8043b8');
    }
  }}
/>
```

### Issue 3: CORS or CSP Issues

**Symptom**: Console shows CORS or Content Security Policy errors

**Solution**: Add to `next.config.js`:
```js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.seoaudit.software; style-src 'self' 'unsafe-inline' https://api.seoaudit.software;"
        }
      ]
    }
  ]
}
```

### Issue 4: Incorrect Widget Key

**Symptom**: Widget loads but shows error message

**Solution**: Verify widget key matches:
- Widget ID: `sas-widget-8cbcaf530edba0a1aa7f31878f8043b8`
- Data Key: `8cbcaf530edba0a1aa7f31878f8043b8`
- Both must match exactly

---

## Alternative Implementation

If the widget still doesn't work, try this direct HTML approach:

### Option A: Create a separate widget page component

Create `/src/components/tools/SEOWidget.tsx`:

```tsx
'use client';

import { useEffect } from 'react';

export default function SEOWidget() {
  useEffect(() => {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://api.seoaudit.software/files/widget/v3.1/css/style.min.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://api.seoaudit.software/files/widget/v3.1/js/api.min.js';
    script.async = true;

    script.onload = () => {
      // Initialize widget after script loads
      if ((window as any).SAS_widget) {
        new (window as any).SAS_widget('#sas-widget-8cbcaf530edba0a1aa7f31878f8043b8');
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="sas-widget"
      id="sas-widget-8cbcaf530edba0a1aa7f31878f8043b8"
      data-url="https://api.seoaudit.software"
      data-key="8cbcaf530edba0a1aa7f31878f8043b8"
    ></div>
  );
}
```

Then use it in SEOAuditTool.tsx:
```tsx
import SEOWidget from './SEOWidget';

// In the hero section:
<div className="bg-white rounded-4 p-4 shadow-lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
  <SEOWidget />
</div>
```

---

## Testing Steps

1. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open in incognito/private window

2. **Test Widget Directly**
   - Create a simple HTML file to test widget works:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="https://api.seoaudit.software/files/widget/v3.1/css/style.min.css">
  <script src="https://api.seoaudit.software/files/widget/v3.1/js/api.min.js"></script>
</head>
<body>
  <div class="sas-widget" id="sas-widget-8cbcaf530edba0a1aa7f31878f8043b8" data-url="https://api.seoaudit.software" data-key="8cbcaf530edba0a1aa7f31878f8043b8"></div>
  <script>
    if(typeof SAS_widget != 'undefined'){
      new SAS_widget('#sas-widget-8cbcaf530edba0a1aa7f31878f8043b8');
    }
  </script>
</body>
</html>
```

   - Open this file in browser
   - If widget works here but not in Next.js, it's a Next.js integration issue

3. **Check Widget Account**
   - Login to SEO Audit Software dashboard
   - Verify widget is active
   - Check domain restrictions (should allow localhost for development)

---

## Expected Behavior

When working correctly:

1. Page loads
2. Widget CSS applies styling
3. Widget JS creates form elements
4. You can see:
   - URL input field
   - Email input field
   - Submit button
   - Widget branding

---

## Contact SEO Audit Software Support

If none of the above works:
- Email: support@seoaudit.software
- Check their documentation: https://seoaudit.software/docs
- Verify widget key is valid for your domain

---

## Current Implementation Status

**Files Modified**:
- `/src/app/layout.tsx` - Widget scripts loaded
- `/src/components/tools/SEOAuditTool.tsx` - Widget container added

**Script Loading**:
- CSS: Loaded in `<head>`
- JS: Loaded with Next.js Script component (afterInteractive)

**Widget Container**:
- ID: `sas-widget-8cbcaf530edba0a1aa7f31878f8043b8`
- Key: `8cbcaf530edba0a1aa7f31878f8043b8`
- URL: `https://api.seoaudit.software`

---

## Next Steps

1. Check browser console for errors
2. Verify scripts load in Network tab
3. Try alternative implementation if needed
4. Contact widget support if issue persists
