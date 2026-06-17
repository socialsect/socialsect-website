# Supabase submission logging
Every form submission follows this order:

1. **Team email** → `RESEND_NOTIFY_EMAILS`
2. **Visitor confirmation** → submitter’s email
3. **Supabase row** → `public.submissions` (one unified table)

If Supabase is misconfigured, emails still send; a warning is logged in the server console.

---

## 1. Create the table

1. Open [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. Go to **SQL Editor** → **New query**.
3. Paste the contents of `supabase/migrations/001_unified_submissions.sql` and click **Run**.

You should see table **`public.submissions`** under **Table Editor**.

---

## 2. Get API credentials

1. In the project, go to **Project Settings** (gear) → **API**.
2. Copy:
   - **Project URL** → `SUPABASE_URL` (must end at `.supabase.co` — **do not** add `/rest/v1/`)
   - **service_role** key (under *Project API keys*) → `SUPABASE_SERVICE_ROLE_KEY`

Use the **service_role** key only on the server (Vercel env + local `.env`). Never put it in the React app or commit it to git.

---

## 3. Add to local `.env`

In `socialsect-website/.env` (same folder as `package.json`):

```env
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Restart `npm run dev` after saving.

---

## 4. Production (Vercel)

1. Vercel project → **Settings** → **Environment Variables**.
2. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for Production (and Preview if you want).
3. Redeploy.

---

## 5. Test

1. Submit any form on the site (e.g. reference request on a specialty page).
2. In Supabase → **Table Editor** → **submissions** → you should see a new row.
3. Check `form_type`, `source_page_url`, `created_at`, and `payload` (full JSON).

---

## Exporting / tallies

- **Table Editor** → select `submissions` → **Export CSV**.
- Or **SQL Editor**:

```sql
select
  created_at,
  form_type,
  source_page_path,
  submitter_name,
  submitter_email,
  practice_name,
  specialty
from public.submissions
order by created_at desc;
```

Count by form:

```sql
select form_type, count(*) as total
from public.submissions
group by form_type
order by total desc;
```

Count by page:

```sql
select source_page_path, form_type, count(*) as total
from public.submissions
group by source_page_path, form_type
order by total desc;
```

Paste CSV into Google Sheets or Excel for charts and pivot tables.

---

## Column reference

| Column | Meaning |
|--------|---------|
| `created_at` | When submitted (UTC) |
| `form_type` | Book a call, Reference request, Resource download, Newsletter |
| `endpoint` | API route, e.g. `/api/reference-request` |
| `source_page_url` | Full URL user was on |
| `source_page_path` | Path + query only, e.g. `/who-we-help/plastic-surgeons` |
| `submitter_name`, `submitter_email`, `practice_name` | Main contact fields |
| `specialty`, `practice_location`, … | Form-specific columns |
| `team_email_sent`, `visitor_email_sent` | Delivery flags |
| `team_email_id` | Resend message id for the team alert |
| `user_agent` | Browser/device hint |
| `environment` | `development`, `production`, `preview`, etc. |
| `payload` | Full submission JSON (goals, challenge, resource title, etc.) |
