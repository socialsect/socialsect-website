# Deployment Guide: Chat Widget + LLM Architecture

## What's Being Deployed

- ✅ Backend: Intent router + LLM response generator
- ✅ Frontend: Chat widget with icons, "Coming Soon" badge, responsive design
- ✅ API: Updated `/api/chat` endpoint with conversation history support
- ✅ Icons: SVG icons (no emojis)

---

## Vercel Environment Variables

Add these to your Vercel project settings:

### Required (Must Add)

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**How to get it**:
1. Go to https://openrouter.ai
2. Sign up if you don't have account
3. Go to Settings → API Keys
4. Create new API key
5. Copy and paste into Vercel

### Optional (Already Have)

These should already be in your .env:
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
```

### Optional (For Audits, if implementing)

If you later enable the audit feature:
```
GOOGLE_PAGESPEED_API_KEY=...
CALENDLY_BOOKING_URL=https://calendly.com/socialsect/strategy
```

---

## Deployment Steps

### Step 1: Backend Code

```bash
# Make sure these files are committed:
- lib/ai/conversation-generator.js (new)
- lib/ai/SYSTEM_PROMPT.md (new, informational)
- lib/handlers/chat.js (modified)
- api/chat.js (unchanged, but verify it's there)
```

### Step 2: Frontend Code

```bash
# Make sure these files are committed:
- src/components/growth-auditor/GrowthAuditorWidget.jsx (modified - icons, badges)
- src/components/growth-auditor/GrowthAuditorWidget.css (modified - badge styles)
- src/components/growth-auditor/GrowthAuditorLauncher.jsx (should be unchanged)
```

### Step 3: Add Environment Variable

1. Go to Vercel dashboard
2. Select your project (socialsect-website)
3. Settings → Environment Variables
4. Add:
   - Name: `OPENROUTER_API_KEY`
   - Value: (your API key)
5. Select which environments: Production (and Staging if you have it)
6. Click "Save"

### Step 4: Deploy

```bash
# From your local repo
git add .
git commit -m "feat: Add LLM chat widget with system prompt and icons"
git push origin main
```

**Vercel will auto-deploy**. Check:
- Vercel dashboard for deploy status
- Check for build errors
- Test the chat widget

### Step 5: Test

1. Visit your site (staging or production)
2. Click the chat widget
3. Verify:
   - Icons show (no emojis)
   - "Learn About Socialsect" button works
   - "Audit My Website" button is disabled with "Coming Soon" badge
   - "Ask a Question" button works
   - Responsive on mobile (full screen)
   - Test a message: should get contextual LLM response (not canned)

---

## Vercel Environment Variables (Full List)

For reference, here's what your Vercel settings should look like:

| Variable | Value | Required |
|----------|-------|----------|
| `OPENROUTER_API_KEY` | (your key) | ✅ Yes |
| `SUPABASE_URL` | (existing) | ✅ Yes |
| `SUPABASE_ANON_KEY` | (existing) | ✅ Yes |
| `RESEND_API_KEY` | (existing) | ✅ Yes (if emails) |
| `RESEND_FROM_EMAIL` | (existing) | ✅ Yes (if emails) |
| `RESEND_NOTIFY_EMAILS` | (existing) | ⏳ Optional |
| `GOOGLE_PAGESPEED_API_KEY` | (for audits) | ⏳ Not yet |
| `CALENDLY_BOOKING_URL` | (for audits) | ⏳ Not yet |

---

## Frontend Changes Summary

### Icons (SVG, No Emojis)

**Before**:
```jsx
📚 Learn About Socialsect
🔍 Audit My Website
❓ Ask a Question
```

**After**:
```jsx
<svg>...</svg> Learn About Socialsect
<svg>...</svg> Audit My Website (disabled + Coming Soon badge)
<svg>...</svg> Ask a Question
```

### "Coming Soon" Badge

- Appears on "Audit My Website" button
- Purple badge with white text
- Positioned top-right of button
- Button is disabled (grayed out)

### Responsive Design

- Desktop: Widget 420px wide, bottom-right corner
- Mobile: Full screen (100vw × 100vh)
- All styles already in place (no additional CSS needed)

---

## Testing Checklist

### Pre-Deployment

- [ ] Backend code committed
- [ ] Frontend code committed
- [ ] Local build passes: `npm run build`
- [ ] No TypeScript errors
- [ ] No console errors

### Post-Deployment

- [ ] Visit staging/production
- [ ] Click chat button → widget opens
- [ ] Icons show (not emojis)
- [ ] "Audit My Website" is disabled + shows badge
- [ ] "Learn About Socialsect" works
- [ ] "Ask a Question" works
- [ ] Send a message → get LLM response (not canned)
- [ ] Mobile: widget full-screen
- [ ] Mobile: buttons and input work
- [ ] No console errors

### API Testing

```bash
# Test the endpoint directly (via curl or Postman)

# Request
curl -X POST https://yourdomain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I am a dentist in Texas, can you help me?",
    "conversationHistory": []
  }'

# Expected response
{
  "success": true,
  "intent": "casual_chat",
  "response": "Absolutely. We work with practices all over Texas..."
}
```

---

## Rollback Plan

If something breaks:

```bash
# 1. Identify the issue from Vercel logs
# 2. Revert to previous deployment
#    - Vercel dashboard → Deployments → select previous → click "Redeploy"
# 3. Or revert code and redeploy
git revert HEAD
git push origin main
```

---

## Cost Monitoring

After deployment, monitor your OpenRouter usage:

1. Visit https://openrouter.ai
2. Go to dashboard
3. Check "Usage" tab
4. You should see requests coming in
5. Monthly cost should be ~$10-15 (not $100+)

If cost is high:
- Check rate limiting
- Verify system prompt isn't too verbose
- Check if there's a bug causing repeated calls

---

## Common Issues

### Issue: "OPENROUTER_API_KEY not configured"

**Solution**: 
- Check Vercel environment variables
- Make sure variable name is exactly: `OPENROUTER_API_KEY`
- Redeploy after adding env var
- Wait a few minutes for it to take effect

### Issue: Chat returns generic responses

**Solution**:
- Backend is calling LLM but using old system prompt
- Check: `lib/ai/conversation-generator.js` has full system prompt
- Verify system prompt wasn't truncated
- Check OpenRouter API key is valid

### Issue: Icons not showing

**Solution**:
- CSS not loading? Check browser console for 404s
- SVG syntax wrong? Check GrowthAuditorWidget.jsx for valid SVG
- Build didn't include CSS? Rebuild and redeploy

### Issue: Audit button not disabled

**Solution**:
- Check: `<button ... disabled>` attribute in JSX
- Verify className includes `chat-menu__button--disabled`
- Check CSS has `.chat-menu__button--disabled { opacity: 0.6; cursor: not-allowed; }`

### Issue: Badge not showing

**Solution**:
- Check wrapper div: `<div className="chat-menu__button-wrapper">`
- Check badge span: `<span className="chat-menu__badge">`
- Verify CSS `.chat-menu__badge` has positioning styles
- Check CSS has `position: absolute` and `top: -8px; right: -8px;`

---

## Mobile Testing

### Desktop
1. Open site
2. Click chat button
3. Widget should be 420px wide, bottom-right corner

### Mobile (iPhone)
1. Open site on iPhone
2. Click chat button
3. Widget should be full-screen (100vw × 100vh)
4. Buttons should be full-width
5. Input field should be full-width

### Mobile (Android)
Same as iPhone

### Tablet
Widget should be responsive, probably 600px wide or full-screen depending on device

---

## After Deployment

### Week 1: Monitor

- [ ] Check for errors in Vercel logs
- [ ] Monitor OpenRouter API usage
- [ ] Get user feedback on chat quality
- [ ] Verify mobile responsiveness

### Week 2-4: Iterate

- [ ] If responses need improvement: update system prompt
- [ ] If buttons need adjustment: tweak CSS
- [ ] If audit feature is ready: enable it (remove "Coming Soon")
- [ ] Collect conversion metrics

---

## Future: Enable Audit Feature

When you're ready to enable audits:

1. Remove `disabled` attribute from audit button
2. Remove `chat-menu__button--disabled` class
3. Remove badge `<span className="chat-menu__badge">`
4. Update `handleModeSelect` to allow audit mode
5. Implement audit flow logic
6. Add `GOOGLE_PAGESPEED_API_KEY` to Vercel env
7. Deploy

---

## Support

If you have issues:

1. Check Vercel logs: Dashboard → Deployments → click deploy → view logs
2. Check browser console: F12 → Console tab
3. Check network tab: F12 → Network tab → look for failed requests
4. Read error messages carefully
5. Refer to troubleshooting section above

---

## Pushing to Production

**TL;DR**: 
1. Commit code: `git add . && git commit -m "..."`
2. Push: `git push origin main`
3. Add env var: Vercel dashboard → Environment Variables → `OPENROUTER_API_KEY`
4. Vercel auto-deploys
5. Test the chat widget
6. Done!

---

## What's Next (After This Deploys)

- [ ] Track LLM response quality
- [ ] Monitor OpenRouter usage/cost
- [ ] Get user feedback
- [ ] Prepare audit feature for "Coming Soon"
- [ ] Update system prompt based on user feedback
- [ ] A/B test responses if needed
- [ ] Add more icons if needed

---

**Questions? Check the docs**:
- `IMPLEMENTATION_SUMMARY_INTENT_LLM.md` - What was built
- `ARCHITECTURE_REFINED.md` - How it works
- `SYSTEM_PROMPT.md` - LLM system prompt
- `MIGRATION_INTENT_TO_LLM.md` - Migration details
