# 📋 Vercel Environment Variables - Copy & Paste

## Quick Reference Card

Add these environment variables to your Vercel project:

---

## 🔧 How to Add

1. Go to: https://vercel.com/dashboard
2. Click your **UrbanScope** project
3. Go to **Settings** tab
4. Click **Environment Variables** (left sidebar)
5. Click **"Add New"**
6. Copy values below

---

## 📝 Variable 1: Backend API URL

```
Name: VITE_API_URL
```

```
Value: https://urbanscope-wdtu.onrender.com/api
```

**⚠️ IMPORTANT:**
- Don't forget `/api` at the end!
- This is YOUR actual backend URL

**Environments:** Select **All** (Production, Preview, Development)

---

## 📝 Variable 2: Chatbot API Key

```
Name: VITE_CHATBOT_API_KEY
```

```
Value: AIzaSyDSqavV40K2b6Ad3gcLAGmnB8HjSmzzVEc
```

**Environments:** Select **All** (Production, Preview, Development)

---

## 🔄 After Adding Variables

### Step 1: Save
Click **"Save"** for each variable

### Step 2: Redeploy
1. Go to **Deployments** tab
2. Find latest deployment
3. Click **"..."** (three dots)
4. Click **"Redeploy"**
5. Wait 2-3 minutes

---

## ✅ Verification

### Test Backend Connection:
Visit your Vercel app and try:
1. Heat Risk analysis
2. Green Space analysis
3. Healthcare analysis

All should work with real data!

### Test Chatbot:
1. Click purple chat button
2. Ask: "What is urban heat island?"
3. Should get AI response

---

## 🔧 Troubleshooting

### If Analysis Still Fails:

**Check 1: Backend URL is correct**
- Must end with `/api`
- Must be your actual Render URL
- No trailing slash after `/api`

**Check 2: Variables are saved**
- Go back to Environment Variables
- Verify both variables exist
- Check values are correct

**Check 3: Redeployed after adding**
- Must redeploy for changes to take effect
- Check deployment status is "Ready"

**Check 4: Backend is running**
Test: `https://your-backend.onrender.com/api/health`

---

## 📋 Quick Checklist

- [ ] Added VITE_API_URL variable
- [ ] Added VITE_CHATBOT_API_KEY variable
- [ ] Selected "All" environments for both
- [ ] Saved both variables
- [ ] Redeployed Vercel
- [ ] Waited for deployment to complete
- [ ] Tested on live site

---

## 🎯 Expected Result

After completing all steps:

```
✅ Frontend loads correctly
✅ Heat Risk analysis works
✅ Green Space analysis works
✅ Healthcare analysis works
✅ Chatbot responds with AI
✅ All pages display data
```

---

**Your Vercel app is now connected to Render backend!** 🎉
