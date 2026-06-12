#!/usr/bin/env bash
set -euo pipefail

# vps-deploy.sh — provision a fresh Ubuntu 24.04 VPS for DevPilot
# Assumes SSH access as root or a sudoer.
# Usage: bash vps-deploy.sh root@<vps-ip> <domain|empty>

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
apt-get install -y docker.io docker-compose nginx certbot python3-pip python3-venv

echo ">>> Enabling Docker"
systemctl enable --now docker
systemctl enable --now nginx

echo ">>> Cloning repo"
mkdir -p ${APP_DIR}
if [ ! -d "${APP_DIR}/.git" ]; then
  git clone "${REPO}" "${APP_DIR}"
fi
cd "${APP_DIR}"
git fetch origin
git checkout main
git reset --hard origin/main

echo ">>> Setting up backend venv"
cd "${APP_DIR}/backend"
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo ">>> Configuring env"
if [ !f ".env" ]; then
  cp .env.example .env
  echo 'NVIDIA_API_KEY=***' >> .env
fi

echo ">>> Launching stack"
cd "${APP_DIR}"
docker compose up -d --build

echo ">>> Done"
REMOTE

echo ">>> Deployment finished for ${HOST}"
