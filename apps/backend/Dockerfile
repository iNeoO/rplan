ARG NODE_VERSION=23-alpine as base
FROM node:$NODE_VERSION AS backend-builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install --global corepack@latest && \
    corepack enable pnpm

USER node
WORKDIR /app

COPY --chown=node:node package*.json pnpm* ./
COPY --chown=node:node ./packages/database/package.json packages/database/
COPY --chown=node:node ./packages/database/ packages/database/
COPY --chown=node:node ./apps/backend/package.json apps/backend/
COPY --chown=node:node ./apps/backend/ apps/backend/

RUN pnpm install

RUN pnpm db:generate

CMD ["pnpm", "dev:backend"]