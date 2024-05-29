# Build image

FROM docker.io/node:lts-alpine as builder

WORKDIR /build

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json nx.json ./
COPY apps/ ./apps
COPY packages/ ./packages

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Production image

FROM docker.io/node:lts-alpine as production
RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY --from=builder /build/node_modules/ ./node_modules
COPY --from=builder /build/packages/ ./packages

CMD [ "dumb-init", "node", "apps/docs/server.js" ]