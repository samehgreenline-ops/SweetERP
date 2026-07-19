@echo off
chcp 65001 > nul
title SweetERP Project Status

echo ==========================================
echo          SweetERP Project Status
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
powershell -Command "Get-Content docs\PROJECT_MASTER_PLAN.md | Select-String -Pattern '# Session Handover' -Context 0,30"

echo.
echo ==========================================
echo          Ready to continue SweetERP
echo ==========================================

pause