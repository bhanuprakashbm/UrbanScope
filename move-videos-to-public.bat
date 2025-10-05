@echo off
echo ========================================
echo Moving Videos to Public Folder
echo ========================================
echo.

REM Create 3dvideos folder in public
echo Creating public\3dvideos folder...
if not exist "public\3dvideos" mkdir "public\3dvideos"

REM Move all MP4 files
echo Moving video files...
move "3dvideos\*.mp4" "public\3dvideos\"

REM Remove old folder
echo Removing old 3dvideos folder...
rmdir /s /q "3dvideos"

echo.
echo ========================================
echo ✅ Done! Videos moved successfully
echo ========================================
echo.
echo Next steps:
echo 1. git add .
echo 2. git commit -m "fix: Move videos to public folder"
echo 3. git push origin main
echo.
pause
