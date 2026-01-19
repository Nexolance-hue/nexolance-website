# Google PageSpeed API Setup Guide

You have a Google Cloud service account with credentials. Here's how to enable the PageSpeed Insights API and get it working.

## Service Account Details
- **Project ID**: `axiomatic-set-484118-m5`
- **Service Account Email**: `nexoll@axiomatic-set-484118-m5.iam.gserviceaccount.com`
- **Credentials File**: `axiomatic-set-484118-m5-915795e5aede.json`

---

## Quick Setup (5 minutes)

### Step 1: Enable PageSpeed Insights API

1. Go to Google Cloud Console:
   ```
   https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com?project=axiomatic-set-484118-m5
   ```

2. Click **"Enable"** button

3. Wait for confirmation (usually instant)

### Step 2: Create an API Key (Not Service Account)

**Important**: For PageSpeed Insights API from browser/client-side, you need an **API Key**, not service account credentials.

1. Go to Credentials page:
   ```
   https://console.cloud.google.com/apis/credentials?project=axiomatic-set-484118-m5
   ```

2. Click **"+ CREATE CREDENTIALS"** → Select **"API key"**

3. Copy the generated API key (looks like: `AIzaSyC...`)

4. Click **"Edit API key"** to restrict it:

   **API restrictions:**
   - Select "Restrict key"
   - Check ONLY: ☑️ PageSpeed Insights API

   **Application restrictions:**
   - Select "HTTP referrers (web sites)"
   - Add these referrers:
     ```
     nexolance.agency/*
     *.nexolance.agency/*
     localhost:3000/*
     ```

5. Click **"Save"**

### Step 3: Add API Key to Environment Variables

1. Open `.env.local` file

2. Uncomment and update this line:
   ```env
   NEXT_PUBLIC_GOOGLE_PAGESPEED_API_KEY=AIzaSyC_your_actual_api_key_here
   ```

3. Save the file

4. Restart your Next.js dev server:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

---

## Why Not Use Service Account?

The service account credentials you have (`axiomatic-set-484118-m5-915795e5aede.json`) are for **server-side** API calls.

- ❌ **Cannot be used in browser**: Private key would be exposed
- ❌ **Cannot be used with PageSpeed API**: Requires OAuth2 flow
- ✅ **Use API Key instead**: Designed for client-side/public API calls

**Keep the service account for**:
- Server-side operations (Node.js backend)
- Admin SDK operations
- Other Google Cloud services

---

## Rate Limits After Setup

### Without API Key:
- 25 requests per day (shared, often exhausted quickly)

### With API Key:
- ✅ **25,000 requests per day**
- ✅ **100 requests per 100 seconds**
- ✅ Dedicated quota for your project

---

## Testing Your Setup

After adding the API key and restarting:

1. Open your SEO Audit Tool: `http://localhost:3000/tools/seo-audit`

2. Test with any website (e.g., `google.com`)

3. Check browser console (F12) → Network tab → Look for PageSpeed API call

4. You should see `?key=AIza...` in the URL, meaning API key is being used

5. Check quota usage:
   ```
   https://console.cloud.google.com/apis/api/pagespeedonline.googleapis.com/quotas?project=axiomatic-set-484118-m5
   ```

---

## Troubleshooting

### Error: "API key not valid"
- Check that PageSpeed Insights API is enabled
- Verify API key restrictions allow your domain
- Make sure `.env.local` is updated and server restarted

### Error: "This API key is not authorized"
- API key restrictions may be too strict
- Try temporarily removing all restrictions to test
- Then add back domain restrictions

### Still getting rate limits?
- Check that API key is actually being used (look at network requests)
- Verify the environment variable is spelled correctly: `NEXT_PUBLIC_GOOGLE_PAGESPEED_API_KEY`
- Make sure you're using the correct project in Google Cloud Console

---

## Cost Estimate

- **Free tier**: 25,000 requests/day
- **Overage**: $5 per 1,000 requests after free tier

**For typical usage** (100-200 users/day):
- ~500-1,000 requests/day
- Well within free tier
- **Cost: $0/month**

---

## Security Best Practices

✅ **Do:**
- Use API key restrictions (domains only)
- Enable only PageSpeed Insights API
- Monitor quota usage regularly

❌ **Don't:**
- Commit API key to public repos (use `.env.local`)
- Share API key publicly
- Use same key for multiple projects

---

## Quick Reference

**Enable API:**
https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com?project=axiomatic-set-484118-m5

**Create API Key:**
https://console.cloud.google.com/apis/credentials?project=axiomatic-set-484118-m5

**Check Quotas:**
https://console.cloud.google.com/apis/api/pagespeedonline.googleapis.com/quotas?project=axiomatic-set-484118-m5

**Environment Variable:**
```env
NEXT_PUBLIC_GOOGLE_PAGESPEED_API_KEY=your_api_key_here
```

---

## Summary

1. ✅ Enable PageSpeed Insights API in Google Cloud Console
2. ✅ Create API Key (not service account)
3. ✅ Restrict API key to PageSpeed API + your domains
4. ✅ Add to `.env.local`
5. ✅ Restart dev server
6. ✅ Test the tool
7. ✅ Monitor quotas

**Time to complete**: ~5-10 minutes
**Benefit**: 1000x more API requests (25 → 25,000/day)
