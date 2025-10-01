#!/usr/bin/env bash
set -euo pipefail
echo "Start script beginning..."

# Start Flask backend
echo "Starting Flask backend..."
python src/components/sections/server/server.py &

# Determine frontend build dir
FRONTEND_DIR=""
if [ -d "/app/build" ]; then
  FRONTEND_DIR="/app/build"
elif [ -d "/app/dist" ]; then
  FRONTEND_DIR="/app/dist"
fi

if [ -z "$FRONTEND_DIR" ]; then
  echo "WARNING: No frontend build directory found. Listing /app:"
  ls -la /app || true
  tail -f /dev/null
else
  echo "Starting static frontend (serve) on port 5173 from directory: $FRONTEND_DIR"
  serve -s "$FRONTEND_DIR" -l 5173
fi
