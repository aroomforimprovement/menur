#!/usr/bin/env sh
set -eu

envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/nginx/default.conf

exec "$@"