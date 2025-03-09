ARG NODE_VERSION=23-alpine as base
FROM node:$NODE_VERSION AS nuxt-frontend-dev

RUN corepack enable && corepack prepare pnpm@latest --activate

USER node

WORKDIR /app

COPY package*.json pnpm* ./

RUN pnpm --filter frontend install

COPY ./apps/frontend/package.json apps/frontend/
COPY ./apps/frontend apps/frontend

CMD ["pnpm", "dev:nuxt"]
