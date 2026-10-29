# syntax=docker/dockerfile:1.7

FROM node:24-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY client/package.json client/
COPY server/package.json server/

FROM base AS build
RUN pnpm install --frozen-lockfile
COPY client client
COPY server server
RUN pnpm build

FROM base AS prod-deps
RUN pnpm install --frozen-lockfile --prod --filter ./server
# Distroless has no shell to create the data directory with.
RUN mkdir /data

# No shell or package manager, runs as an unprivileged user (65532).
FROM gcr.io/distroless/nodejs24-debian12:nonroot AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3006
ENV DATABASE_PATH=/data/qcls-data.db3
ENV STATIC_DIR=/app/client/dist

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/server/node_modules ./server/node_modules
COPY --from=prod-deps --chown=65532:65532 /data /data
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist

VOLUME /data
EXPOSE 3006
WORKDIR /app/server
CMD ["--disable-warning=ExperimentalWarning", "dist/index.js"]
