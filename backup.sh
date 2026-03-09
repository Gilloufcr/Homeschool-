#!/bin/sh
# ─── Homeschool automatic cloud backup ───────────────────────────────
# Copies /app/data to the configured rclone remote
# Requires RCLONE_REMOTE env var (e.g. "gdrive:HomeschoolBackups")

set -e

REMOTE="${RCLONE_REMOTE:-}"

if [ -z "$REMOTE" ]; then
  echo "[backup] RCLONE_REMOTE not set — skipping backup"
  exit 0
fi

# Check rclone config exists
if [ ! -f /app/rclone.conf ] && [ ! -f /root/.config/rclone/rclone.conf ]; then
  echo "[backup] No rclone config found — skipping backup"
  exit 0
fi

DATE=$(date +%Y%m%d_%H%M%S)
echo "[backup] Starting backup to ${REMOTE} at ${DATE}"

rclone copy /app/data "${REMOTE}" \
  --config /app/rclone.conf \
  --log-level INFO \
  2>&1

echo "[backup] Backup completed successfully"
