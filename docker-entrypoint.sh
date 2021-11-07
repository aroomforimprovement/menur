#!/usr/bin/env sh
set -eu

# envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
#sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
yarn start
#nginx -g 'daemon off;'

exec "$@"