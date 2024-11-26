ARG NODE_VERSION=22-alpine as base
FROM node:$NODE_VERSION AS backend-builder

WORKDIR /app
COPY package.json yarn.lock ./
COPY ./packages/backend/package.json packages/backend/
COPY ./packages/backend packages/backend
RUN yarn workspace @rplan/backend install --frozen-lockfile
CMD ["yarn", "dev:backend"]
