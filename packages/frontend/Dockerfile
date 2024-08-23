ARG NODE_VERSION=22-alpine
FROM node:$NODE_VERSION AS frontend-builder

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY ./packages/frontend/package.json packages/frontend/
COPY ./packages/frontend packages/frontend
RUN yarn install
CMD [ "yarn", "dev:frontend" ]
