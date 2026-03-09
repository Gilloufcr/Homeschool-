#!/bin/sh
# ─── Homeschool entrypoint: cron (backup) + Node server ─────────────
set -e

# Start crond in background if rclone is configured
if [ -n "${RCLONE_REMOTE:-}" ] && [ -f /app/rclone.conf ]; then
  echo "[entrypoint] Starting backup cron (daily at 2 AM)"
  crond -b -l 8
else
  echo "[entrypoint] RCLONE_REMOTE or rclone.conf not set — backups disabled"
fi

# Launch Node server (PID 1)
exec node server.js
