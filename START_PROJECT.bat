@echo off
chcp 65001 > nul
title SweetERP Project Launcher

cd /d "%~dp0"

echo ==========================================
echo         SweetERP Project Launcher
echo ==========================================
echo.

echo Current Location:
cd
echo.

echo ------------------------------------------
echo Git Status
echo ------------------------------------------
git status

echo.
echo ------------------------------------------
echo Session Start Guide
echo ------------------------------------------
type docs\SESSION_START.md

echo.
echo ------------------------------------------
echo Project Master Plan - Session Handover
echo ------------------------------------------
powershell -Command "Get-Content 'docs\PROJECT_MASTER_PLAN.md' | Select-String -Pattern '# Session Handover' -Context 0,30"

echo.
echo ==========================================
echo Starting SweetERP...
echo ==========================================
echo.

echo Starting Backend...
start "SweetERP Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"

timeout /t 3 >nul

echo Starting Frontend...
start "SweetERP Frontend" cmd /k "cd /d "%~dp0frontend_new" && npm run dev"

timeout /t 8 >nul

echo Opening Browser...
start "" http://localhost:5173

echo.
echo ==========================================
echo SweetERP started successfully.
echo ==========================================
echo.
echo Backend  : Running
echo Frontend : Running
echo Browser  : http://localhost:5173
echo.

exit