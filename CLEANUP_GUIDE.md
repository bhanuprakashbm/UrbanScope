# 🧹 UrbanScope Cleanup Guide

This guide helps you remove unnecessary files and optimize the project for production.

---

## 📋 Files/Folders to Remove

### 1. **Irrelevant Page Components**
These pages are not related to the urban health challenge:

```bash
# Remove MarsRover page
rm -rf src/pages/MarsRover/

# Remove NasaProjects page
rm -rf src/pages/NasaProjects/

# Remove Login page (if not implementing authentication)
rm -rf src/pages/Login/
```

**Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force src\pages\MarsRover\
Remove-Item -Recurse -Force src\pages\NasaProjects\
Remove-Item -Recurse -Force src\pages\Login\
```

---

### 2. **Large 3D Model Files**
These space-themed 3D models are not needed (total ~40 MB):

```bash
# Remove Mars/Space 3D models
rm public/24883_MER_static.glb           # 11.9 MB
rm public/25042_Perseverance.glb         # 11.7 MB
rm public/Earth_1_12756.glb              # 12.9 MB
rm public/Mars_1_6792.glb                # 4.0 MB
rm public/Neptune_1_49528.glb            # 0.6 MB
```

**Windows PowerShell:**
```powershell
Remove-Item public\24883_MER_static.glb
Remove-Item public\25042_Perseverance.glb
Remove-Item public\Earth_1_12756.glb
Remove-Item public\Mars_1_6792.glb
Remove-Item public\Neptune_1_49528.glb
```

**Note:** The new `UrbanCity3D` component generates 3D cities procedurally, so no large model files are needed.

---

### 3. **Old Backend Models**
Replace with enhanced versions:

```bash
# Remove old model files (already replaced)
rm backend/models/heat_risk.py
rm backend/models/green_space.py
rm backend/models/healthcare.py
```

**Windows PowerShell:**
```powershell
Remove-Item backend\models\heat_risk.py
Remove-Item backend\models\green_space.py
Remove-Item backend\models\healthcare.py
```

**Keep these enhanced versions:**
- ✅ `heat_risk_enhanced.py`
- ✅ `green_space_enhanced.py`
- ✅ `healthcare_enhanced.py`
- ✅ `prediction.py`

---

### 4. **Unused 3D Model Components**
If not using Mars/Space visualizations:

```bash
# Check and remove unused 3D components
# Review src/components/3D_Models/ folder
# Keep only: UrbanCity3D.jsx
```

---

### 5. **Development Files**
Optional - remove if deploying:

```bash
# Remove lock file (regenerate with npm install)
rm package-lock.json

# Remove node_modules (reinstall with npm install)
rm -rf node_modules/
```

---

## 🔄 Update .gitignore

Ensure these are in your `.gitignore`:

```gitignore
# Dependencies
node_modules/
backend/__pycache__/
backend/models/__pycache__/

# Build outputs
dist/
dist-ssr/
*.local

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Lock files (optional)
package-lock.json
```

---

## 📦 Optimize for Production

### 1. **Build Frontend**
```bash
npm run build
```
This creates an optimized production build in `dist/` folder.

### 2. **Optimize Images**
If you add custom images, compress them:
- Use tools like TinyPNG, ImageOptim
- Target: < 200 KB per image

### 3. **Code Splitting**
Already handled by Vite, but verify:
```bash
npm run build -- --report
```

### 4. **Remove Console Logs**
Search and remove development console.log statements:
```bash
# Find all console.log
grep -r "console.log" src/
```

---

## 🗂️ Recommended Folder Structure After Cleanup

```
UrbanScope/
│
├── src/
│   ├── components/
│   │   ├── 3D_Models/
│   │   │   └── UrbanCity3D.jsx       ✅ Keep
│   │   ├── SatelliteMap/             ✅ Keep
│   │   ├── Navbar/                   ✅ Keep
│   │   ├── Footer/                   ✅ Keep
│   │   ├── Hero/                     ✅ Keep
│   │   ├── Apod/                     ✅ Keep
│   │   └── ...
│   ├── pages/
│   │   ├── Home/                     ✅ Keep
│   │   ├── NASAData/                 ✅ Keep
│   │   ├── About/                    ✅ Keep
│   │   └── 404 Page/                 ✅ Keep
│   └── utils/
│       └── aiModels.js               ✅ Keep
│
├── backend/
│   ├── models/
│   │   ├── heat_risk_enhanced.py     ✅ Keep
│   │   ├── green_space_enhanced.py   ✅ Keep
│   │   ├── healthcare_enhanced.py    ✅ Keep
│   │   └── prediction.py             ✅ Keep
│   ├── app.py                        ✅ Keep
│   └── requirements.txt              ✅ Keep
│
├── public/
│   ├── vite.svg                      ✅ Keep
│   └── earth-bg.mp4                  ✅ Keep (if used)
│
├── aimodels/                         ✅ Keep (reference)
│   ├── urban-heat-risk-index-main/
│   ├── GreenEx_Py-main/
│   └── health-care-analysis-master/
│
├── README.md                         ✅ Keep
├── package.json                      ✅ Keep
├── vite.config.js                    ✅ Keep
└── index.html                        ✅ Keep
```

---

## 🎯 Size Reduction Summary

| Item | Size | Action |
|------|------|--------|
| Mars 3D Models | ~40 MB | ❌ Remove |
| MarsRover Page | ~50 KB | ❌ Remove |
| NasaProjects Page | ~100 KB | ❌ Remove |
| Old Backend Models | ~15 KB | ❌ Remove |
| **Total Saved** | **~40 MB** | ✅ |

---

## ✅ Verification Checklist

After cleanup, verify:

- [ ] Frontend runs: `npm run dev`
- [ ] Backend runs: `python backend/app.py`
- [ ] No 404 errors in browser console
- [ ] All routes work (Home, NASA Data, About)
- [ ] 3D city visualization loads
- [ ] Satellite maps display
- [ ] AI analysis returns data
- [ ] Build succeeds: `npm run build`

---

## 🚀 Post-Cleanup Steps

1. **Test thoroughly**
   ```bash
   # Terminal 1
   cd backend && python app.py
   
   # Terminal 2
   npm run dev
   ```

2. **Commit changes**
   ```bash
   git add .
   git commit -m "Cleanup: Remove irrelevant files and optimize project"
   ```

3. **Update documentation**
   - Update README.md with current features
   - Remove references to deleted pages

4. **Deploy**
   - Frontend: Vercel, Netlify, or GitHub Pages
   - Backend: Heroku, Railway, or Render

---

## 📝 Notes

- **Backup First**: Before deleting, create a backup or commit to git
- **Test After Each Step**: Ensure nothing breaks
- **Keep AI Model Folders**: They serve as reference and documentation

---

## 🆘 Rollback

If something breaks:

```bash
# Restore from git
git checkout -- <file>

# Or restore entire project
git reset --hard HEAD
```

---

**Happy Cleaning! 🧹✨**
