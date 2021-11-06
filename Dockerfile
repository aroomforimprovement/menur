#FROM centos:7
#RUN useradd -u 8877 bob
#USER bob

FROM node:14-alpine as ui-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=development

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

COPY . .

RUN yarn build

FROM nginx:1.12-alpine
COPY --from=ui-build app/build ./build
COPY default.conf.template /nginx/conf.d/default.conf.template
COPY nginx.conf /nginx/nginx.conf

EXPOSE 3031

#CMD ["npm", "start"]