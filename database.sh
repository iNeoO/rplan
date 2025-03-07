#!/bin/sh
set -e

echo "Running migrations..."
pnpm db:deploy

echo "Starting the studio..."
exec pnpm db:studio