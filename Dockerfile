FROM node:14-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
COPY . .
RUN yarn
EXPOSE 3030
CMD ["npm", "start"]