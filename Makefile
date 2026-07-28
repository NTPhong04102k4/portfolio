# ========================================================
# Makefile — Portfolio Automation & PR Generator
# ========================================================

BRANCH ?= $(shell git branch --show-current)
TARGET_BRANCH ?= main
REPO_URL = https://github.com/NTPhong04102k4/portfolio

.PHONY: help dev status commit push pr sync nginx-test

help:
	@echo "========================================================"
	@echo "            PORTFOLIO MAKEFILE COMMANDS                 "
	@echo "========================================================"
	@echo "  make dev                 - Chay local dev server (cong 8080)"
	@echo "  make status              - Kiem tra trang thai Git"
	@echo "  make commit MSG=\"...\"    - Stage va commit code nhanh"
	@echo "  make push                - Push branch hien tai ($(BRANCH))"
	@echo "  make pr                  - Day code & lay link tao Pull Request"
	@echo "  make sync                - Pull code moi nhat tu remote"
	@echo "  make nginx-test          - Kiem tra cu phap file nginx.conf"
	@echo "========================================================"

dev:
	@echo "Dang khoi chay local server tai http://localhost:8080..."
	python -m http.server 8080

status:
	git status -s

commit:
	@git add .
	@git commit -m "$(if $(MSG),$(MSG),update: portfolio changes)"

push:
	git push origin $(BRANCH)

pr: push
	@echo ""
	@echo "========================================================"
	@echo "🚀 DONG BO CODE THANH CONG!"
	@echo "Truy cap link duoi day de mo Pull Request va Merge:"
	@echo "👉 $(REPO_URL)/compare/$(TARGET_BRANCH)...$(BRANCH)?expand=1"
	@echo "========================================================"

sync:
	git pull origin $(BRANCH)

nginx-test:
	nginx -t -c $(CURDIR)/nginx.conf
