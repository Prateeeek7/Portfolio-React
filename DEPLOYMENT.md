# Deployment Guide for Portfolio Website

## Step 1: Get a Domain Name

### Popular Domain Registrars:
1. **Namecheap** (Recommended for beginners)
   - Website: https://www.namecheap.com
   - Price: ~$10-15/year for .com domains
   - Easy to use, good customer support

2. **Google Domains** (Now Squarespace Domains)
   - Website: https://domains.squarespace.com
   - Price: ~$12/year for .com
   - Simple interface

3. **GoDaddy**
   - Website: https://www.godaddy.com
   - Price: ~$12-15/year
   - Popular but can be pricier for renewals

4. **Cloudflare**
   - Website: https://www.cloudflare.com/products/registrar
   - Price: At-cost pricing (~$9/year)
   - Best for technical users

### How to Register:
1. Visit one of the registrars above
2. Search for your desired domain (e.g., `pratikkumar.dev` or `pratikkumar.com`)
3. Add to cart and checkout
4. Complete the registration process

---

## Step 2: Deploy Your Website

You have several options. Here are the **easiest** ones:

### Option A: Vercel (Recommended ⭐)

**Why Vercel?**
- Free tier with great performance
- Automatic HTTPS
- Easy domain connection
- Zero configuration for Vite/React
- Automatic deployments from GitHub

**Steps:**

1. **Build your project locally first:**
   ```bash
   npm run build
   ```

2. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

4. **Connect your domain:**
   - In your Vercel project dashboard, go to "Settings" → "Domains"
   - Add your domain (e.g., `pratikkumar.com`)
   - Follow the instructions to update DNS records in your domain registrar

---

### Option B: Netlify

**Why Netlify?**
- Free tier
- Easy drag-and-drop deployment
- Good for static sites
- Built-in form handling

**Steps:**

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to https://www.netlify.com
   - Sign up/login
   - Drag and drop your `dist` folder (created after `npm run build`) to Netlify
   - OR connect your GitHub repo for auto-deployments

3. **Connect domain:**
   - Go to "Domain settings"
   - Add custom domain
   - Update DNS records as instructed

---

### Option C: GitHub Pages

**Why GitHub Pages?**
- Completely free
- Easy if you already use GitHub
- Good for portfolios

**Steps:**

1. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR_REPO_NAME/', // Add this line
   })
   ```

2. **Build and deploy:**
   - Push your code to GitHub
   - Go to repository Settings → Pages
   - Select source branch (usually `main`)
   - Select folder: `/docs` or `/dist`
   - Your site will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

3. **Custom domain:**
   - In GitHub Pages settings, add custom domain
   - Add `CNAME` file to public folder with your domain
   - Update DNS records

---

## Step 3: Configure DNS Records

After deploying, you need to point your domain to your hosting service:

### For Vercel:
1. Add these DNS records in your domain registrar:
   - **A Record**: `76.76.21.21`
   - **CNAME Record**: `cname.vercel-dns.com`
   
2. OR use Vercel's nameservers (easier):
   - Replace your registrar's nameservers with Vercel's

### For Netlify:
1. Add DNS records:
   - **A Record**: `75.2.60.5`
   - Or use Netlify nameservers

### DNS Configuration Steps:
1. Log into your domain registrar
2. Go to DNS Management
3. Add the required records as shown above
4. Wait 24-48 hours for DNS propagation

---

## Quick Start Checklist

- [ ] Register domain (Namecheap/Google Domains/Cloudflare)
- [ ] Build project: `npm run build`
- [ ] Push code to GitHub
- [ ] Deploy on Vercel/Netlify
- [ ] Connect custom domain
- [ ] Update DNS records
- [ ] Wait for DNS propagation (can take up to 48 hours)
- [ ] Test your live site!

---

## Troubleshooting

### Build Errors:
```bash
npm run build
# Fix any errors before deploying
```

### 404 Errors on Routes:
- Make sure your hosting service supports SPA routing
- Vercel and Netlify handle this automatically
- For GitHub Pages, you may need a `_redirects` file

### Domain Not Working:
- Check DNS propagation: https://www.whatsmydns.net
- Verify DNS records are correct
- Wait up to 48 hours for full propagation

---

## Estimated Costs

- **Domain**: $10-15/year (.com domain)
- **Hosting**: FREE (Vercel/Netlify free tiers are excellent for portfolios)
- **Total**: ~$10-15/year for domain only

---

## Recommended Setup

**Best for beginners:**
1. Domain: Namecheap
2. Hosting: Vercel
3. Total time: ~30 minutes

**Most cost-effective:**
1. Domain: Cloudflare (at-cost pricing)
2. Hosting: Vercel (free)
3. Total: ~$9/year

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html

