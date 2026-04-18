# Deployment Guide — PMS VNU-HCM Frontend

**Last Updated**: 2026-04-18
**Version**: 0.1.0
**Status**: Demo Ready (Local Dev + Docker Template Provided)

## Local Development

### Prerequisites
- Node.js 18+ (check: `node --version`)
- npm 9+ (check: `npm --version`)
- Git installed

### Setup

1. **Navigate to web directory:**
   ```bash
   cd /Users/coolstar/inseclab/khoa-hoc-cong-nghe/web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in browser. HMR enabled via Turbopack.

4. **Test build locally:**
   ```bash
   npm run build
   npm run start
   ```

### Development Workflow

**Code changes auto-reload:**
- Edit `/app/**/*.tsx`, `/components/**/*.tsx`, `/lib/**/*.ts` → HMR updates live
- Edit `/tailwind.config.ts` → Page refresh needed
- Edit theme tokens in `globals.css` → Live update via CSS variables

**Linting:**
```bash
npm run lint
```
Fix with ESLint (no --fix auto-format yet).

**Debug in browser DevTools:**
- Chrome DevTools: Inspect React components, debug JS, check Network
- `console.log()` shows in DevTools Console
- React DevTools browser extension recommended

## Build for Production

### Local Production Build

```bash
npm run build    # Create optimized `.next/` directory
npm run start    # Start Node.js production server (http://localhost:3000)
```

**Output**:
- `.next/` directory (source map + optimized bundles)
- Server runs on port 3000 (configurable via `PORT` env var)

### Build Artifacts

- **App files**: Next.js pre-renders static routes, dynamic routes rendered on-demand
- **Bundle size**: ~139 KB gzipped (shared JS)
- **Image optimization**: Next.js `<Image>` auto-optimizes (not used currently)
- **Font subsetting**: Inter font subset vietnamese (8 font files in .next)

### Performance Checklist

- [ ] No console errors or warnings in DevTools
- [ ] Lighthouse score >85 (Performance, Accessibility, Best Practices)
- [ ] Build warnings addressed (if any)
- [ ] Environment variables set
- [ ] Mock data replaced with real API calls (future)

## Deployment Platforms

### Option 1: Vercel (Recommended for Next.js)

**Why Vercel:**
- Zero-config Next.js deployment
- Automatic HTTPS, CDN, edge functions
- Built-in git integration
- Free tier sufficient for demo

**Steps:**

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_ORG/pms-vnu-hcm-frontend
   git branch -M main
   git push -u origin main
   ```

2. **Create Vercel account** (https://vercel.com)

3. **Connect repository:**
   - Click "New Project" → select GitHub repo
   - Vercel auto-detects Next.js
   - Click "Deploy"

4. **Set environment variables** (if needed):
   - Dashboard → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` (for future backend)

5. **Access deployed app:**
   - URL: `https://YOUR_PROJECT.vercel.app`
   - Custom domain: Add in Settings → Domains

**Cost:** Free tier (5 deployments/month, suitable for demo)

---

### Option 2: Docker + Cloud Run (Google Cloud)

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app
COPY .next ./.next
COPY public ./public
COPY next.config.ts ./

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "run", "start"]
```

**Build & push:**
```bash
docker build -t pms-vnu-hcm .
docker run -p 3000:3000 pms-vnu-hcm
# Test: http://localhost:3000
```

**Deploy to Google Cloud Run:**
```bash
# Authenticate
gcloud auth login

# Build & push to Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT/pms-vnu-hcm

# Deploy
gcloud run deploy pms-vnu-hcm \
  --image gcr.io/YOUR_PROJECT/pms-vnu-hcm \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated
```

**Cost:** ~$0.25–1/day for demo traffic (first 2M requests/month free)

---

### Option 3: Self-Hosted (Node.js Server)

**Requirements:**
- Linux server (Ubuntu 22.04 LTS recommended)
- Node.js 18+ installed
- Nginx reverse proxy (for SSL + domain)

**Setup:**

1. **SSH into server:**
   ```bash
   ssh user@server.ip
   ```

2. **Clone repo:**
   ```bash
   git clone https://github.com/YOUR_ORG/pms-vnu-hcm-frontend.git
   cd pms-vnu-hcm-frontend/web
   npm ci --only=production
   npm run build
   ```

3. **Run with PM2** (process manager):
   ```bash
   npm install -g pm2
   pm2 start npm --name "pms" -- start
   pm2 startup
   pm2 save
   ```

4. **Nginx reverse proxy** (`/etc/nginx/sites-available/pms`):
   ```nginx
   server {
       listen 80;
       server_name pms.vnu-hcm.edu.vn;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

5. **Enable site & get HTTPS** (certbot):
   ```bash
   sudo a2ensite pms
   sudo certbot --nginx -d pms.vnu-hcm.edu.vn
   sudo systemctl restart nginx
   ```

**Cost:** ~$5–20/month (depending on server provider)

---

## Environment Variables

### Required (Demo has defaults, production needs real values)

```env
# API endpoints (replace with real backend URLs)
NEXT_PUBLIC_API_URL=https://api.pms.vnu-hcm.edu.vn

# (Future) Authentication
NEXT_PUBLIC_AUTH_PROVIDER=google|aad|custom
AUTH_SECRET=your-jwt-secret-here

# (Future) Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-ga-id

# Feature flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_DEMO_MODE=false
```

**Load in Next.js:**
- `.env.local` (local dev, git-ignored)
- `.env.production` (production values)
- Vercel: Set in Dashboard UI

---

## Monitoring & Logging

### Development

**Browser DevTools:**
- Network tab: Check bundle sizes, API calls (future)
- Console: Watch for errors/warnings
- Performance tab: Lighthouse audits

**Server logs** (production):
```bash
npm run start 2>&1 | tee app.log
# or with PM2:
pm2 logs pms
```

### Production Checklist

- [ ] Error tracking (Sentry integration recommended)
- [ ] Uptime monitoring (StatusPage.io or similar)
- [ ] Performance monitoring (Web Vitals → Google Analytics)
- [ ] Log aggregation (CloudWatch / Datadog / ELK)

---

## Rollback & Recovery

### Vercel
- Dashboard → Deployments → Click past deployment → "Promote to Production"

### Docker / Self-Hosted
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Rebuild & restart
npm run build
pm2 restart pms
```

---

## Future Enhancements

1. **Database**: Connect PostgreSQL for persistence (replace mock TS data)
2. **API Gateway**: Add backend Node.js/FastAPI layer
3. **CDN**: CloudFlare or AWS CloudFront for static assets
4. **Cache**: Redis for session storage + data caching
5. **CI/CD**: GitHub Actions auto-deploy on main push
6. **Monitoring**: Sentry for error tracking + Datadog for performance
7. **Backup**: Daily database backups to S3

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | `lsof -i :3000` → kill process OR change `PORT=3001 npm run start` |
| Build fails (node_modules) | `rm -rf node_modules .next && npm ci && npm run build` |
| TypeScript errors after deploy | Run `npm run build` locally to catch errors pre-deploy |
| Slow page load | Check Network tab in DevTools; may need API optimization (future) |
| CSS not loading | Clear browser cache (Cmd+Shift+R) + check `globals.css` import in `app/layout.tsx` |
| Login not working (future) | Check AUTH env vars + backend API connectivity |

---

## Support & Questions

For issues or improvements:
1. Check this guide + project README
2. Review error in browser DevTools Console
3. Check server logs: `pm2 logs pms` or Vercel dashboard
4. File issue on GitHub with error screenshot + steps to reproduce
