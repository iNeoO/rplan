ARG NODE_VERSION=22-alpine
FROM node:$NODE_VERSION AS backend-builder

WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY ./packages/backend/package.json packages/backend/
COPY ./packages/backend packages/backend
RUN yarn install
CMD ["yarn", "dev:backend"]
