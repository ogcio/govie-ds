FROM docker.io/node:22-alpine AS base

# Build image (run from root)

FROM base AS builder

ARG DEPLOY_ENV

WORKDIR /build

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/ ./apps
COPY packages/ ./packages
COPY apps/docs/.env.${DEPLOY_ENV} ./apps/docs/.env.production

ENV DEPLOY_ENV=${DEPLOY_ENV}
ENV NEXT_EXPORT=true
ENV NX_DAEMON=false

RUN npm install -g corepack@latest
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm html:storybook:build
RUN pnpm react:storybook:build

# Production image

FROM docker.io/nginxinc/nginx-unprivileged:1.29.5-alpine

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
