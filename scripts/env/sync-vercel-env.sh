#!/usr/bin/env bash
# ==============================================================================
# Sincronización automática de variables de entorno hacia Vercel (SIDEMACA)
# Lee .env.<target> o .env si existe localmente y sincroniza vía Vercel CLI.
# ==============================================================================
set -euo pipefail

TARGET_ENV="${1:-preview}" # preview | production
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

ENV_FILE=""
if [ -f ".env.$TARGET_ENV" ]; then
  ENV_FILE=".env.$TARGET_ENV"
elif [ -f ".env" ]; then
  ENV_FILE=".env"
fi

if [ -z "$ENV_FILE" ]; then
  exit 0
fi

if ! command -v npx >/dev/null 2>&1; then
  exit 0
fi

if [ ! -f ".vercel/project.json" ]; then
  npx --yes vercel link --yes --project sidemaca >/dev/null 2>&1 || true
fi

for VAR_NAME in RESEND_API_KEY RESEND_FROM CONTACT_TO_EMAIL SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASSWORD; do
  RAW_LINE="$(grep -E "^${VAR_NAME}=" "$ENV_FILE" | tail -n 1 || true)"
  if [ -n "$RAW_LINE" ]; then
    VAL="${RAW_LINE#*=}"
    VAL="${VAL%\"}"
    VAL="${VAL#\"}"
    VAL="${VAL%\'}"
    VAL="${VAL#\'}"
    if [ -n "$VAL" ]; then
      printf '%s' "$VAL" | npx --yes vercel env add "$VAR_NAME" "$TARGET_ENV" --force >/dev/null 2>&1 || true
    fi
  fi
done

