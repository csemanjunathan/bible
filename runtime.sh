#!/bin/sh

echo "Starting Search API stuff ...."

pm2-runtime ecosystem.config.js --env ${environment}