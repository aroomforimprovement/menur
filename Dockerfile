FROM Centos:7
RUN useradd -u 8877 bob
USER bob

FROM node:14-alpine as ui-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=development
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

FROM nginx:1.12-alpine
COPY --from=ui-build app/build ./build

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

EXPOSE 3031

CMD ["-c", "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default" ,"nginx", "-g", "daemon off;"]
