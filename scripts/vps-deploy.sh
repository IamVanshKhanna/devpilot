#!/usr/bin/env bash
set -euo pipefail

# vps-deploy.sh — provision a fresh Ubuntu 24.04 VPS for DevPilot
# Usage: bash vps-deploy.sh user@host domain.example

HOST="${1:?Usage: bash vps-deploy.sh user@host [domain]}"
DOMAIN="${2:-}"
APP_DIR="/opt/devpilot"
REPO="https://github.com/IamVanshKhanna/devpilot.git"

echo ">>> Connecting to ${HOST}"
ssh "$HOST" bash -s << REMOTE
set -euo pipefail

echo ">>> Updating system"
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get upgrade -y

echo ">>> Installing dependencies"
apt-get install -y git curl ca-certificates gnupg lsb-release
apt-get install -y docker.io docker-compose nginx certbot python3-pip python3-venv ufw

echo ">>> Enabling services"
systemctl enable --now docker
systemctl enable --now nginx
ufw allow 22,80,443/tcp || true
ufw --force enable || true

echo ">>> Configuring firewall"
ufw allow 22,80,443/tcp || true
ufw --force enable || true

echo ">>> Cloning repo"
mkdir -p "${APP_DIR}"
if [ ! -d "${APP_DIR}/.git" ]; then
  git clone "${REPO}" "${APP_DIR}"
fi
cd "${APP_DIR}"
git fetch origin
git checkout main
git reset --hard origin/main

echo ">>> Setting up backend venv"
mkdir -p "${APP_DIR}/backend/venv"
python3 -m venv "${APP_DIR}/backend/venv"
source "${APP_DIR}/backend/venv/bin/activate"
pip install --upgrade pip
pip install -r "${APP_DIR}/backend/requirements.txt"

echo ">>> Configuring env"
if [ ! -f "${APP_DIR}/backend/.env" ]; then
  cp "${APP_DIR}/backend/.env.example" "${APP_DIR}/backend/.env"
fi

echo ">>> Launching stack"
cd "${APP_DIR}"
docker compose up -d --build

echo ">>> Done"
REMOTE

echo ">>> Deployment finished for ${HOST}"
