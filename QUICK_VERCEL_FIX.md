# 🚀 Quick Vercel Fix - 2 Options

## **Option 1: Add Environment Variable to Vercel (5 minutes)**

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click your project: `urban-scope-nine`
3. Go to: **Settings** → **Environment Variables**

### Step 2: Add Variable
- **Name:** `VITE_API_URL`
- **Value:** `http://localhost:5000/api` (temporary - will still fail)
- Click **Save**

### Step 3: Redeploy
- Go to **Deployments**
- Click **"..."** on latest deployment
- Click **Redeploy**

**⚠️ This still won't work because you need to deploy the backend first!**

---

## **Option 2: Use Mock Data (Works Immediately)** ✅

I'll update the code to use mock data when backend is unavailable.

**Pros:**
- ✅ Works immediately on Vercel
- ✅ No backend deployment needed
- ✅ Demo works for visitors

**Cons:**
- ❌ Not real-time data
- ❌ Same results for all cities

---

## **Recommended: Deploy Backend to Render**

### Quick Steps:

1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **New Web Service** → Connect `UrbanScope` repo
4. **Settings:**
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn app:app`
5. **Deploy** (takes 5 min)
6. **Copy URL:** `https://urbanscope-backend.onrender.com`
7. **Add to Vercel:**
   - Variable: `VITE_API_URL`
   - Value: `https://urbanscope-backend.onrender.com/api`
8. **Redeploy Vercel**

---

**Choose Option 2 for now, then deploy backend later!**
