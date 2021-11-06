# FROM centos:7
# RUN useradd -u 8877 bob
# USER bob

FROM node:14-alpine as ui-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=development

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

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

RUN echo $PORT
COPY . .

RUN yarn build

FROM nginx:1.12-alpine as nginx-build
COPY --from=ui-build app/build ./build
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf ./etc/nginx/nginx.conf

EXPOSE 3031

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

# CMD ["envsubst '\$PORT' < /etc/nginx/conf.d/nginx.conf > /etc/nginx/conf.d/nginx.conf", "nginx", "-g", "daemon off;"]
#CMD sed -i -e 's/$PORT/'"$PORT"'/g' nginx -g 'daemon off;'
#CMD ["nginx", "-g", "daemon off;"]
#CMD ["npm", "start"]