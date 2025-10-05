# 🚀 Complete Deployment Guide - Render + Vercel

## Overview
- **Frontend:** Vercel (React app)
- **Backend:** Render (Python Flask API)

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Backend Files

Your backend is already ready! Just verify these files exist:

✅ `backend/app.py` - Main Flask app
✅ `backend/requirements.txt` - Python dependencies
✅ `backend/models/` - AI models folder

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 3: Create Render Account

1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub**
4. Authorize Render to access your repositories

### Step 4: Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** under GitHub
4. Find and select **"UrbanScope"** repository
5. Click **"Connect"**

### Step 5: Configure Service Settings

Fill in these **EXACT** values:

#### Basic Settings:
```
Name: urbanscope-backend
Region: Oregon (US West) or closest to you
Branch: main
```

#### Build Settings:
```
Root Directory: backend
Runtime: Python 3
```

#### Build Command:
```
pip install -r requirements.txt
```

#### Start Command:
```
gunicorn app:app
```

#### Instance Type:
```
Free
```

### Step 6: Environment Variables (Optional)

Click **"Advanced"** → **"Add Environment Variable"**

Add these if needed:
```
FLASK_ENV=production
PORT=10000
```

### Step 7: Create Web Service

1. Click **"Create Web Service"** button at the bottom
2. Wait 3-5 minutes for deployment
3. Watch the logs - should see "Build successful"

### Step 8: Get Your Backend URL

After deployment completes, you'll see your URL at the top:

```
https://urbanscope-backend.onrender.com
```

**Copy this URL!** You'll need it for Vercel.

### Step 9: Test Backend

Visit in browser:
```
https://urbanscope-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "healthy",
  "message": "UrbanScope AI Backend is running"
}
```

✅ If you see this, backend is working!

---

## Part 2: Connect Vercel to Render Backend

### Step 1: Go to Vercel Dashboard

1. Open: https://vercel.com/dashboard
2. Click your **"UrbanScope"** project

### Step 2: Add Environment Variables

1. Go to **Settings** tab
2. Click **Environment Variables** (left sidebar)
3. Add these variables:

#### Variable 1: Backend API URL
```
Name: VITE_API_URL
Value: https://urbanscope-backend.onrender.com/api
```
**⚠️ Replace with YOUR actual Render URL!**

#### Variable 2: Chatbot API Key
```
Name: VITE_CHATBOT_API_KEY
Value: AIzaSyDSqavV40K2b6Ad3gcLAGmnB8HjSmzzVEc
```

4. For each variable:
   - Click **"Add New"**
   - Enter Name
   - Enter Value
   - Select **"All"** environments (Production, Preview, Development)
   - Click **"Save"**

### Step 3: Redeploy Vercel

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Check **"Use existing Build Cache"** (optional)
6. Click **"Redeploy"**

Wait 2-3 minutes for redeployment.

### Step 4: Test Your Deployed App

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Go to **Heat Risk** page
3. Search for a city (e.g., "Paris")
4. Click **"Analyze Heat Risk"**
5. Should work! 🎉

---

## 📋 Quick Reference - All Settings

### Render Settings:
```
Name: urbanscope-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
Instance Type: Free
```

### Vercel Environment Variables:
```
VITE_API_URL=https://urbanscope-backend.onrender.com/api
VITE_CHATBOT_API_KEY=AIzaSyDSqavV40K2b6Ad3gcLAGmnB8HjSmzzVEc
```

---

## 🔧 Troubleshooting

### Backend Not Starting on Render?

**Check Render Logs:**
1. Go to Render Dashboard
2. Click your service
3. Click **"Logs"** tab
4. Look for errors

**Common Issues:**

**Issue:** `ModuleNotFoundError: No module named 'flask'`
**Fix:** Make sure `requirements.txt` is in `backend/` folder

**Issue:** `Failed to bind to 0.0.0.0:10000`
**Fix:** Make sure Start Command is `gunicorn app:app`

**Issue:** `Application failed to start`
**Fix:** Check that `app.py` has the Flask app named `app`

### Frontend Still Shows Error?

**Checklist:**
- [ ] Backend URL is correct in Vercel env vars
- [ ] Backend URL ends with `/api`
- [ ] Vercel was redeployed after adding env vars
- [ ] Backend health endpoint works

**Test Backend Manually:**
```bash
curl https://your-backend.onrender.com/api/health
```

Should return JSON, not HTML error.

### Render Free Tier Limitations

⚠️ **Important:** Render free tier sleeps after 15 minutes of inactivity

**What this means:**
- First request after sleep takes 30-60 seconds
- Subsequent requests are fast
- This is normal for free tier

**Solution for Production:**
- Upgrade to paid tier ($7/month)
- Or use UptimeRobot to ping every 10 minutes

---

## 🎯 Step-by-Step Checklist

### Backend Deployment:
- [ ] Push code to GitHub
- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set Root Directory to `backend`
- [ ] Set Build Command: `pip install -r requirements.txt`
- [ ] Set Start Command: `gunicorn app:app`
- [ ] Select Free instance
- [ ] Click Create Web Service
- [ ] Wait for deployment (3-5 min)
- [ ] Copy backend URL
- [ ] Test `/api/health` endpoint

### Frontend Connection:
- [ ] Go to Vercel Dashboard
- [ ] Open your project
- [ ] Go to Settings → Environment Variables
- [ ] Add `VITE_API_URL` with Render URL
- [ ] Add `VITE_CHATBOT_API_KEY`
- [ ] Save variables
- [ ] Go to Deployments
- [ ] Redeploy latest deployment
- [ ] Wait for redeployment (2-3 min)
- [ ] Test on live site

---

## 🎉 Expected Result

After following all steps:

**Backend:**
```
✅ https://urbanscope-backend.onrender.com/api/health
Returns: {"status": "healthy"}
```

**Frontend:**
```
✅ https://your-app.vercel.app
All pages work
AI Analysis works for all cities
Chatbot responds with AI
```

---

## 📸 Screenshots Guide

### Render - Create Web Service:
1. Click "New +" → "Web Service"
2. Connect GitHub → Select "UrbanScope"
3. Fill in settings (see above)
4. Click "Create Web Service"

### Vercel - Environment Variables:
1. Settings → Environment Variables
2. Click "Add New"
3. Enter Name and Value
4. Select "All" environments
5. Click "Save"

### Vercel - Redeploy:
1. Deployments tab
2. Click "..." on latest
3. Click "Redeploy"
4. Confirm

---

## 💰 Cost

**Render Free Tier:**
- ✅ 750 hours/month (enough for 24/7)
- ✅ Automatic HTTPS
- ✅ Auto-deploy from GitHub
- ⚠️ Sleeps after 15 min inactivity

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Perfect for frontend

**Total Cost: $0** 🎉

---

## 🔗 Important URLs

**Render Dashboard:** https://dashboard.render.com
**Vercel Dashboard:** https://vercel.com/dashboard
**Your Backend:** https://urbanscope-backend.onrender.com
**Your Frontend:** https://your-app.vercel.app

---

**Your full-stack app is now deployed!** 🚀🎉
