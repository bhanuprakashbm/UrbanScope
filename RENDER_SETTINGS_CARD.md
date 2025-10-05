# 📋 Render Settings - Copy & Paste

## Quick Reference Card

Use these EXACT values when creating your Render Web Service:

---

### 🔧 Basic Settings

```
Name: urbanscope-backend
```

```
Region: Oregon (US West)
```
*Or choose closest to your location*

```
Branch: main
```

---

### 📁 Build Settings

```
Root Directory: backend
```
**⚠️ IMPORTANT: Must be exactly "backend"**

```
Runtime: Python 3
```

---

### 🛠️ Commands

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
gunicorn app:app
```

---

### 💰 Instance Type

```
Free
```

---

### 🌐 Environment Variables (Optional)

Click "Advanced" → "Add Environment Variable"

```
Name: FLASK_ENV
Value: production
```

```
Name: PORT
Value: 10000
```

---

## After Deployment

### Your Backend URL will be:
```
https://urbanscope-backend.onrender.com
```

### Test it:
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

## Copy This URL for Vercel

After deployment, copy your backend URL and use it in Vercel:

```
Vercel Environment Variable:
Name: VITE_API_URL
Value: https://urbanscope-backend.onrender.com/api
```

**⚠️ Don't forget the `/api` at the end!**

---

## ✅ Checklist

- [ ] Name: urbanscope-backend
- [ ] Root Directory: backend
- [ ] Build Command: pip install -r requirements.txt
- [ ] Start Command: gunicorn app:app
- [ ] Instance Type: Free
- [ ] Click "Create Web Service"
- [ ] Wait 3-5 minutes
- [ ] Copy backend URL
- [ ] Test /api/health endpoint
- [ ] Add URL to Vercel env vars
- [ ] Redeploy Vercel

---

**That's it! Your backend will be live in 5 minutes.** 🚀
