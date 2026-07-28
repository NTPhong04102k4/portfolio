@echo off
setlocal enabledelayedexpansion

set TARGET_BRANCH=dev
for /f "tokens=*" %%a in ('git branch --show-current') do set BRANCH=%%a
set REPO_URL=https://github.com/NTPhong04102k4/portfolio

if "%1"=="" goto dev
if "%1"=="help" goto help
if "%1"=="dev" goto dev
if "%1"=="status" goto status
if "%1"=="commit" goto commit
if "%1"=="push" goto push
if "%1"=="pr" goto pr
if "%1"=="sync" goto sync

echo Lenh khong hop le: %1
goto help

:help
echo ========================================================
echo            PORTFOLIO MAKEFILE COMMANDS (WINDOWS)
echo ========================================================
echo   make dev                 - Chay local dev server (cong 8080)
echo   make status              - Kiem tra trang thai Git
echo   make commit "noi dung"   - Stage va commit code nhanh
echo   make push                - Push branch hien tai (%BRANCH%)
echo   make pr                  - Day code va lay link tao Pull Request
echo   make sync                - Pull code moi nhat tu remote
echo ========================================================
goto end

:dev
echo Dang khoi chay local server tai http://localhost:8080...
python -m http.server 8080
goto end

:status
git status -s
goto end

:commit
git add .
if "%~2"=="" (
    git commit -m "update: portfolio changes"
) else (
    git commit -m "%~2"
)
goto end

:push
git push origin %BRANCH%
goto end

:pr
git push origin %BRANCH%
echo.
echo ========================================================
echo DONG BO CODE THANH CONG!
echo Truy cap link duoi day de mo Pull Request va Merge:
echo 👉 %REPO_URL%/compare/%TARGET_BRANCH%...%BRANCH%?expand=1
echo ========================================================
goto end

:sync
git pull origin %BRANCH%
goto end

:end
endlocal
