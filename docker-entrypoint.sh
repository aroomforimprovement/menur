#!/usr/bin/env sh
set -eu

envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'

exec "$@"