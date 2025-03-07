ARG NODE_VERSION=23-alpine as base
FROM node:$NODE_VERSION AS database-builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install --global corepack@latest && \
    corepack enable pnpm

USER node
WORKDIR /app

COPY --chown=node:node package*.json pnpm* ./
COPY --chown=node:node ./packages/database/package.json packages/database/

RUN pnpm --filter @rplan/database install

COPY --chown=node:node ./packages/database/ packages/database/

COPY --chown=node:node database.sh /app/database.sh

ENTRYPOINT ["/app/database.sh"]