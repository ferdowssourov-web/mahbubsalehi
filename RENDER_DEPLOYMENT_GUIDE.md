# 🚀 Render.com Deployment Guide - Step by Step

## Why Render.com?
- ✅ No server management required
- ✅ Free tier available
- ✅ Automatic HTTPS/SSL
- ✅ Auto-deploys from Git
- ✅ Easy environment variables
- ✅ No command line needed (mostly)

**Total Time: 30-45 minutes**

---

## 📦 PHASE 1: Setup GitHub Repository (10 minutes)

### Step 1: Create GitHub Account (if you don't have one)
1. Go to https://github.com
2. Click **"Sign up"**
3. Enter your email, password
4. Verify your email

### Step 2: Create New Repository
1. Click the **"+"** button (top right)
2. Click **"New repository"**
3. Name it: `mahbubsalehi-website`
4. Keep it **Public** (required for free tier)
5. Click **"Create repository"**

### Step 3: Upload Your Code to GitHub

**Option A: Using GitHub Website (Easier)**

1. On your repository page, click **"uploading an existing file"**
2. Download your code from Emergent as ZIP
3. Extract the ZIP file
4. Drag and drop ALL folders (backend, frontend, etc.) into GitHub
5. Click **"Commit changes"**

**Option B: Using Git Commands**

If you have the code on your computer:

```bash
cd /path/to/your/code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mahbubsalehi-website.git
git push -u origin main
```

---

## 🗄️ PHASE 2: Setup MongoDB Atlas (10 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Choose **"Free Shared Cluster"** (M0 Sandbox)

### Step 2: Create Database Cluster
1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Choose region closest to you (or US East)
4. Cluster Name: `SalehiCluster` (or any name)
5. Click **"Create"**

### Step 3: Setup Database Access
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `salehiuser`
5. Password: Click **"Autogenerate Secure Password"** → **COPY THIS PASSWORD**
6. Set privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Setup Network Access
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://salehiuser:<password>@salehicluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you copied earlier
6. **SAVE THIS CONNECTION STRING** - you'll need it!

---

## 🎨 PHASE 3: Deploy on Render.com (15 minutes)

### Step 1: Create Render Account
1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with **GitHub** (easier - links accounts automatically)
4. Authorize Render to access your GitHub

### Step 2: Deploy Backend (Python API)

1. On Render Dashboard, click **"New +"**
2. Choose **"Web Service"**
3. Connect your GitHub repository: `mahbubsalehi-website`
4. Click **"Connect"**

**Configure Backend Service:**
- **Name:** `mahbubsalehi-backend`
- **Region:** Choose closest to you (or Oregon)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
- **Plan:** Choose **"Free"**

**Add Environment Variables:**
Click **"Advanced"** → **"Add Environment Variable"**

Add these one by one:

1. Key: `MONGO_URL`
   Value: `[PASTE YOUR MONGODB CONNECTION STRING HERE]`

2. Key: `DB_NAME`
   Value: `salehi_portfolio`

3. Key: `JWT_SECRET`
   Value: `mahbub-salehi-secret-2026-change-this`

4. Key: `PYTHON_VERSION`
   Value: `3.11.0`

Click **"Create Web Service"**

**Wait 5-10 minutes** - Render will build and deploy your backend.

When done, you'll see a URL like: `https://mahbubsalehi-backend.onrender.com`

**Test it:** Open `https://mahbubsalehi-backend.onrender.com/api/activities` in browser
- Should show: `[]` or list of activities

### Step 3: Deploy Frontend (React App)

1. On Render Dashboard, click **"New +"**
2. Choose **"Static Site"**
3. Connect same repository: `mahbubsalehi-website`

**Configure Frontend:**
- **Name:** `mahbubsalehi-frontend`
- **Branch:** `main`
- **Root Directory:** `frontend`
- **Build Command:** `yarn install && yarn build`
- **Publish Directory:** `build`

**Add Environment Variable:**
Click **"Advanced"** → **"Add Environment Variable"**

- Key: `REACT_APP_BACKEND_URL`
- Value: `https://mahbubsalehi-backend.onrender.com`
  (Use YOUR backend URL from Step 2)

Click **"Create Static Site"**

**Wait 5-10 minutes** - Render will build your frontend.

When done, you'll see a URL like: `https://mahbubsalehi-frontend.onrender.com`

---

## 🔗 PHASE 4: Fix API Routing (IMPORTANT!)

The frontend and backend are separate, we need to connect them properly.

### Option A: Using Render Redirects (Recommended)

1. Go to your **Frontend service** on Render
2. Click **"Redirects/Rewrites"** tab
3. Add these rules:

**Rule 1:**
- Source: `/api/*`
- Destination: `https://mahbubsalehi-backend.onrender.com/api/:splat`
- Action: `Rewrite`

Click **"Save Changes"**

### Option B: Update Frontend .env (Alternative)

If Option A doesn't work, update your frontend environment variable:

1. Go to your **Frontend service**
2. Click **"Environment"** tab
3. Edit `REACT_APP_BACKEND_URL`
4. Change to: `https://mahbubsalehi-backend.onrender.com`
5. Click **"Save Changes"**
6. Frontend will auto-redeploy

---

## 🌐 PHASE 5: Connect Custom Domain (Optional)

### Step 1: Configure Domain on Render

1. Go to your **Frontend service** on Render
2. Click **"Settings"** tab
3. Scroll to **"Custom Domains"**
4. Click **"Add Custom Domain"**
5. Enter: `mahbubsalehi.com`
6. Click **"Add"**
7. Render will show you DNS records to add

### Step 2: Update DNS on Hostinger

1. Log into Hostinger control panel
2. Go to **Domains** → **mahbubsalehi.com**
3. Click **"DNS Zone"**
4. Delete existing A records
5. Add new records from Render:

**CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Points to: `[URL from Render]`

**CNAME Record:**
- Type: `CNAME`  
- Name: `@` or leave blank
- Points to: `[URL from Render]`

6. Save changes
7. Wait 15-30 minutes for DNS propagation

### Step 3: Enable SSL (Automatic)

Render automatically provides free SSL certificate!
- Wait 5-10 minutes after DNS propagation
- Your site will be accessible at `https://mahbubsalehi.com`

---

## ✅ PHASE 6: Test Everything (5 minutes)

Visit your website and test:

1. **Homepage:** Should load ✅
2. **All Navigation:** Test all menu items ✅
3. **Contact Form:** Try submitting ✅
4. **Public Opinion:** Try submitting ✅
5. **Registration Form:** Try submitting ✅
6. **Admin Login:** Go to `/admin`
   - Login: `admin` / `admin123` ✅
7. **Admin Functions:**
   - Create activity ✅
   - View opinions ✅
   - View registrations ✅
   - Download Excel ✅
   - Change meeting address ✅

---

## 🔧 Common Issues & Solutions

### Issue 1: Backend shows "Application failed to respond"
**Solution:** Check logs
1. Go to backend service on Render
2. Click **"Logs"** tab
3. Look for errors
4. Usually missing environment variable

### Issue 2: Frontend loads but forms don't work
**Solution:** Backend URL not configured
1. Check REACT_APP_BACKEND_URL in frontend
2. Make sure it points to backend service URL
3. Check API redirects are set up

### Issue 3: Database connection error
**Solution:** Check MongoDB URL
1. Verify connection string is correct
2. Check MongoDB Atlas user has correct permissions
3. Ensure Network Access allows all IPs (0.0.0.0/0)

### Issue 4: Build fails
**Solution:** Check build logs
1. Click on failed deployment
2. Read error messages
3. Usually missing dependencies

### Issue 5: "This site can't be reached"
**Solution:** Service is sleeping (free tier)
- Render free tier sleeps after 15 minutes of inactivity
- First visit takes 30-60 seconds to wake up
- Upgrade to paid tier ($7/month) for always-on

---

## 💰 Pricing

### Free Tier (Perfect for starting):
- Backend: Free (sleeps after 15min inactivity)
- Frontend: Free (always on)
- MongoDB: Free (512MB storage)
- SSL: Free
- Custom domain: Free

**Total: $0/month**

### Paid Tier (For production):
- Backend: $7/month (always on, better performance)
- Frontend: Free
- MongoDB: Free (or $9/month for more storage)

**Total: $7-16/month**

---

## 🔄 Updating Your Website

When you want to make changes:

1. Update code in GitHub (edit files or push changes)
2. Render automatically detects changes
3. Auto-deploys new version
4. Takes 5-10 minutes

**That's it!** No manual deployment needed.

---

## 📊 Monitoring

### View Logs:
1. Go to service on Render
2. Click **"Logs"** tab
3. See real-time logs

### View Metrics:
1. Go to service
2. Click **"Metrics"** tab
3. See CPU, memory, requests

### Set Alerts:
1. Go to service
2. Click **"Settings"**
3. Add email for deployment notifications

---

## ✅ Advantages of Render.com

1. ✅ No server management
2. ✅ Auto-scaling
3. ✅ Free SSL
4. ✅ Auto-deploys from Git
5. ✅ Easy rollback
6. ✅ Built-in monitoring
7. ✅ Free tier available
8. ✅ Supports custom domains

---

## 🆘 Getting Help

1. **Render Support:** https://render.com/docs
2. **Render Community:** https://community.render.com
3. **MongoDB Support:** https://www.mongodb.com/docs/atlas/

---

## 🎉 Congratulations!

Your website is now live on Render.com with:
- ✅ Backend API running
- ✅ Frontend deployed
- ✅ Database connected
- ✅ Free SSL certificate
- ✅ Custom domain (optional)
- ✅ Auto-deployments

**Your site is now accessible at:**
- Render URL: `https://mahbubsalehi-frontend.onrender.com`
- Custom domain: `https://mahbubsalehi.com` (if configured)

**Admin panel:** `https://mahbubsalehi.com/admin`

Enjoy your live website! 🚀

