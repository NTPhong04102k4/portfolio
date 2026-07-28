param (
    [string]$Action = "dev",
    [string]$Msg = "update: portfolio changes"
)

$Branch = (git branch --show-current).Trim()
$TargetBranch = "main"
$RepoUrl = "https://github.com/NTPhong04102k4/portfolio"

switch ($Action.ToLower()) {
    "dev" {
        Write-Host "Dang khoi chay local server tai http://localhost:8080..." -ForegroundColor Green
        python -m http.server 8080
    }
    "status" {
        git status -s
    }
    "commit" {
        git add .
        git commit -m "$Msg"
    }
    "push" {
        git push origin $Branch
    }
    "pr" {
        git push origin $Branch
        Write-Host "`n========================================================" -ForegroundColor Cyan
        Write-Host "🚀 DONG BO CODE THANH CONG!" -ForegroundColor Green
        Write-Host "Truy cap link duoi day de mo Pull Request va Merge:" -ForegroundColor Yellow
        Write-Host "👉 $RepoUrl/compare/$TargetBranch...$Branch`?expand=1" -ForegroundColor Green
        Write-Host "========================================================" -ForegroundColor Cyan
    }
    "sync" {
        git pull origin $Branch
    }
    Default {
        Write-Host "========================================================" -ForegroundColor Cyan
        Write-Host "            PORTFOLIO COMMANDS (POWERSHELL / WINDOWS)   " -ForegroundColor Yellow
        Write-Host "========================================================" -ForegroundColor Cyan
        Write-Host "  .\make dev                 - Chay local dev server (cong 8080)"
        Write-Host "  .\make status              - Kiem tra trang thai Git"
        Write-Host "  .\make commit -Msg `"msg`"   - Stage va commit code nhanh"
        Write-Host "  .\make push                - Push branch hien tai ($Branch)"
        Write-Host "  .\make pr                  - Day code va lay link tao Pull Request"
        Write-Host "  .\make sync                - Pull code moi nhat tu remote"
        Write-Host "========================================================" -ForegroundColor Cyan
    }
}
