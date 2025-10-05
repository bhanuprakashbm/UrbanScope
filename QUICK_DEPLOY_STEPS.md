# 🚀 Quick Deploy Steps (5 Minutes)

## ✅ Files Ready!

I've prepared your backend for deployment:
- ✅ Added `gunicorn` to requirements.txt
- ✅ Updated `app.py` for production

---

## 📝 Step-by-Step (Copy & Paste)

### **Step 1: Push to GitHub** (1 min)
```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

### **Step 2: Deploy to Render** (3 min)

1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **Click:** "New +" → "Web Service"
4. **Select:** Your `UrbanScope` repository
5. **Fill in:**
   - Name: `urbanscope-backend`
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Instance Type: **Free**
6. **Click:** "Create Web Service"
7. **Wait:** 3-5 minutes

### **Step 3: Copy Backend URL** (30 sec)

After deployment, you'll see:
```
https://urbanscope-backend.onrender.com
```

**Copy this URL!**

### **Step 4: Update Vercel** (1 min)

1. **Go to:** https://vercel.com/dashboard
2. **Click:** your project
3. **Go to:** Settings → Environment Variables
4. **Edit:** `VITE_API_URL`
5. **Change to:**
   ```
   https://urbanscope-backend.onrender.com/api
   ```
   ⚠️ Use YOUR actual URL from Step 3!
6. **Save**
7. **Go to:** Deployments → Click "..." → Redeploy

---

## 🎯 Test It!

1. Visit: `https://your-backend.onrender.com/api/health`
   - Should see: `{"status": "healthy"}`

2. Visit: `https://urban-scope-nine.vercel.app`
   - Go to Heat Risk page
   - Search a city
   - Click Analyze
   - **Should work!** 🎉

---

## 🔧 If Something Goes Wrong

### Backend won't start?
- Check Render logs
- Make sure Root Directory is `backend`
- Make sure Start Command is `gunicorn app:app`

### Frontend still shows error?
- Make sure you used `/api` at the end of URL
- Make sure you redeployed Vercel after changing env var
- Wait 2-3 minutes for Vercel to rebuild

---

## 📚 Full Guide

For detailed instructions, see: `DEPLOY_BACKEND_TO_RENDER.md`

---

**That's it! Your full-stack app will be live!** 🚀
