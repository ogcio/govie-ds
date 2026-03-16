ARG NODE_IMAGE=docker.io/node:24-alpine
ARG NGINX_IMAGE=docker.io/nginxinc/nginx-unprivileged:1-alpine3.23-slim

# Build image (run from root)
FROM ${NODE_IMAGE} AS builder

ARG DEPLOY_ENV

WORKDIR /build

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/ ./apps
COPY packages/ ./packages
COPY apps/docs/.env.${DEPLOY_ENV} ./apps/docs/.env.production

ENV DEPLOY_ENV=${DEPLOY_ENV}
ENV NEXT_EXPORT=true
ENV NX_DAEMON=false

RUN corepack enable pnpm
# Ignore KICS warning. `--frozen-lockfile` ensures pinned versions from lockfile
# kics-scan ignore-line
RUN pnpm install --frozen-lockfile
RUN pnpm docs:build
RUN pnpm storybook:build:html
RUN pnpm storybook:build:react
RUN pnpm storybook:build:angular

# Production image
FROM ${NGINX_IMAGE}
ARG DEPLOY_ENV

# Copy static assets from builder stage
COPY --from=builder --chown=nginx /build/apps/docs/out /usr/share/nginx/html/doc
COPY --from=builder --chown=nginx /build/packages/react/ds/storybook-static /usr/share/nginx/html/storybook-react
COPY --from=builder --chown=nginx /build/packages/html/ds/storybook-static /usr/share/nginx/html/storybook-html
COPY --from=builder --chown=nginx /build/packages/angular/storybook-static /usr/share/nginx/html/storybook-angular

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Environment-specific storybook routes
COPY nginx.storybook.${DEPLOY_ENV}.conf /etc/nginx/storybook.conf

USER nginx

EXPOSE 8080

# Start Nginx server
ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
