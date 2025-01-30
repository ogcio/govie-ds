FROM docker.io/node:22-alpine as base

# Build image (run from root)

FROM base as builder

ARG DEPLOY_ENV

ENV DEPLOY_ENV=${DEPLOY_ENV}

RUN apk add --no-cache libc6-compat zip

WORKDIR /build

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml nx.json ./
COPY apps/ ./apps
COPY packages/ ./packages
COPY tokens/ ./tokens

ENV NEXT_EXPORT=true

RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build:libs --verbose
RUN pnpm ds:build:export --verbose
RUN pnpm html:storybook:build --verbose
RUN pnpm react:storybook:build --verbose

# Production image

FROM ghcr.io/nginxinc/nginx-unprivileged:1.26.1-bookworm-perl

# Copy static assets from builder stage
COPY --from=builder --chown=nginx /build/apps/docs/out /usr/share/nginx/html/doc
COPY --from=builder --chown=nginx /build/packages/react/ds/storybook-static /usr/share/nginx/html/storybook-react
COPY --from=builder --chown=nginx /build/packages/html/ds/storybook-static /usr/share/nginx/html/storybook-html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

USER nginx

EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
