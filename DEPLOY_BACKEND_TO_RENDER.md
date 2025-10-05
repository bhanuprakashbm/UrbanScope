# 🚀 Deploy Backend to Render (FREE)

## Step-by-Step Guide

---

## **Step 1: Prepare Backend Files**

### 1.1 Check if you have these files in `backend/` folder:

✅ `app.py` - Your Flask app
✅ `requirements.txt` - Python dependencies
❌ `Procfile` - We need to create this

### 1.2 Create `Procfile` in backend folder

This file is needed, but Render can work without it if we configure properly.

---

## **Step 2: Update requirements.txt**

Make sure your `backend/requirements.txt` has:

```txt
Flask==3.0.0
flask-cors==4.0.0
numpy==1.24.3
requests==2.31.0
gunicorn==21.2.0
```

**Important:** Add `gunicorn` - it's needed for production!

---

## **Step 3: Update app.py for Production**

At the bottom of `backend/app.py`, make sure it has:

```python
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

---

## **Step 4: Deploy to Render**

### 4.1 Go to Render
1. Open: https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub**

### 4.2 Create New Web Service
1. Click **"New +"** (top right)
2. Select **"Web Service"**

### 4.3 Connect Your Repository
1. Click **"Connect account"** under GitHub
2. Find and select your **`UrbanScope`** repository
3. Click **"Connect"**

### 4.4 Configure Service

Fill in these settings:

**Name:** `urbanscope-backend` (or any name you like)

**Region:** Choose closest to you (e.g., Oregon, Frankfurt, Singapore)

**Branch:** `main` (or `master`)

**Root Directory:** `backend` ⚠️ **IMPORTANT!**

**Runtime:** `Python 3`

**Build Command:**
```bash
pip install -r requirements.txt
```

**Start Command:**
```bash
gunicorn app:app
```

**Instance Type:** `Free` ✅

### 4.5 Environment Variables (Optional)
You can add these if needed:
- `FLASK_ENV=production`
- `PORT=10000` (Render sets this automatically)

### 4.6 Deploy!
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Watch the logs - should see "Build successful"

---

## **Step 5: Get Your Backend URL**

After deployment completes:

1. You'll see your service URL at the top:
   ```
   https://urbanscope-backend.onrender.com
   ```

2. **Copy this URL!** You'll need it for Vercel.

3. Test it by visiting:
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

---

## **Step 6: Update Vercel Environment Variable**

### 6.1 Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click your project: `urban-scope-nine`
3. Go to: **Settings** → **Environment Variables**

### 6.2 Update VITE_API_URL
1. Find `VITE_API_URL`
2. Click **Edit**
3. Change value to:
   ```
   https://urbanscope-backend.onrender.com/api
   ```
   ⚠️ Replace with YOUR actual Render URL!
4. Click **Save**

### 6.3 Redeploy Vercel
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## **Step 7: Test Your Deployment**

1. Visit your Vercel site:
   ```
   https://urban-scope-nine.vercel.app
   ```

2. Go to **Heat Risk** page

3. Search for a city (e.g., "Paris")

4. Click **"Analyze Heat Risk"**

5. **Should work now!** 🎉

---

## 🔧 Troubleshooting

### Backend Not Starting?

**Check Render Logs:**
1. Go to Render Dashboard
2. Click your service
3. Click **"Logs"** tab
4. Look for errors

**Common Issues:**

**Error:** `ModuleNotFoundError: No module named 'flask'`
**Fix:** Make sure `requirements.txt` is in `backend/` folder

**Error:** `Failed to bind to 0.0.0.0:5000`
**Fix:** Use `gunicorn app:app` instead of `python app.py`

**Error:** `Application failed to start`
**Fix:** Check `app.py` has `if __name__ == '__main__'` block

### Frontend Still Shows Error?

**Check:**
1. ✅ Backend URL is correct in Vercel env vars
2. ✅ Backend URL ends with `/api`
3. ✅ Vercel was redeployed after changing env vars
4. ✅ Backend health endpoint works

**Test Backend:**
```bash
curl https://your-backend.onrender.com/api/health
```

Should return JSON, not HTML error.

---

## 💰 Render Free Tier Limits

✅ **Free tier includes:**
- 750 hours/month (enough for 24/7)
- Automatic HTTPS
- Auto-deploy from GitHub
- Custom domains

⚠️ **Limitations:**
- Sleeps after 15 min of inactivity
- First request after sleep takes 30-60 seconds
- 512 MB RAM

**Solution for sleep:** Use a service like UptimeRobot to ping your backend every 10 minutes.

---

## 🎯 Quick Command Summary

### Update requirements.txt:
```bash
cd backend
echo "gunicorn==21.2.0" >> requirements.txt
```

### Test locally before deploying:
```bash
pip install gunicorn
gunicorn app:app
```

Should start on `http://127.0.0.1:8000`

---

## ✅ Checklist

Before deploying:
- [ ] `backend/requirements.txt` includes `gunicorn`
- [ ] `backend/app.py` exists and runs locally
- [ ] GitHub repo is up to date (`git push`)

During deployment:
- [ ] Root Directory set to `backend`
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `gunicorn app:app`
- [ ] Instance Type: Free

After deployment:
- [ ] Backend URL copied
- [ ] Vercel env var updated
- [ ] Vercel redeployed
- [ ] Tested on live site

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
✅ https://urban-scope-nine.vercel.app
AI Analysis works for all cities!
```

---

**Your full-stack app is now deployed!** 🚀🎉
