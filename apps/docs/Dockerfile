FROM docker.io/node:20-alpine as base

# Build image (run from root)

FROM base as builder
RUN apk add --no-cache libc6-compat

WORKDIR /build

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml nx.json ./
COPY apps/ ./apps
COPY packages/ ./packages
COPY tokens/ ./tokens

RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Production image

FROM base as production
RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

# See https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app
COPY --from=builder /build/node_modules/ ./node_modules
COPY --from=builder /build/packages/ ./packages
COPY --from=builder /build/apps/docs/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD [ "dumb-init", "node", "apps/docs/server.js" ]