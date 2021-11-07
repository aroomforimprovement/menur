FROM centos:7
RUN useradd -u 8877 bob
USER bob

FROM node:14-alpine as ui-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# ENV NODE_ENV=development

ARG PORT
ARG REACT_APP_URL
ARG REACT_APP_AUTH_REQ
ARG REACT_APP_AUTH_OUT
ARG REACT_APP_AUTH_SECRET
ARG REACT_APP_AUTH_CLIENT_ID
ARG REACT_APP_AUTH_BASE_URL
ARG REACT_APP_AUTH_DOMAIN
ARG REACT_APP_API_URL
ARG REACT_APP_AUTH_SCOPE
ARG REACT_APP_AUTH_AUDIENCE

COPY . .

# COPY package.json ./
# COPY yarn.lock ./

RUN yarn 

RUN yarn install --frozen-lockfile

# RUN echo $PORT
# COPY . .

RUN yarn build

FROM nginx:1.12-alpine as nginx-build
COPY --from=ui-build /app/build /usr/share/nginx/html
# COPY --from=ui-build /app/default.conf.template /etc/nginx/nginx.default.conf
COPY --from=ui-build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=ui-build /app/nginx.conf /etc/nginx/nginx.conf.default
# COPY --from=ui-build /app/nginx.conf /etc/nginx/nginx.default.conf
# COPY --from=ui-build /app/d.default.conf.template /etc/nginx/conf.d/default.conf

COPY d.default.conf.template /etc/nginx/templates/default.conf.template

COPY docker-entrypoint.sh /

# EXPOSE 3031

#ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["/usr/local/bin/envsubst '\${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf", "nginx", "-g", 'daemon off;']

#CMD nginx -g 'daemon off;'

# CMD ["npm", "start"]