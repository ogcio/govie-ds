ARG NODE_IMAGE=docker.io/node:24.22.1-alpine3.24@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53
ARG NGINX_IMAGE=docker.io/nginxinc/nginx-unprivileged:1-alpine3.24-slim@sha256:a8cb0f33d51fa107c96fd2bd3a71aaf564ec131e9d2bdf8700944f0ed8b170d7

# Build image (run from root)
FROM ${NODE_IMAGE} AS builder

ARG DEPLOY_ENV

WORKDIR /build

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY tsconfig.node.json tsconfig.bundler.json ./
COPY apps/ ./apps
COPY packages/ ./packages
COPY examples/angular/ ./examples/angular
COPY apps/docs/.env.${DEPLOY_ENV} ./apps/docs/.env.production

ENV DEPLOY_ENV=${DEPLOY_ENV}
ENV NEXT_EXPORT=true

# Ignore KICS warning. `--frozen-lockfile` ensures pinned versions from lockfile
# kics-scan ignore-line
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile && \
    pnpm --filter "@ogcio/design-system-docs..." \
      --filter "@ogcio/design-system-html..." \
      --filter "@ogcio/design-system-react^..." \
      --filter "@ogcio/design-system-angular^..." \
      --filter "@ogcio/design-system-vue^..." \
      --filter "@ogcio/examples-angular^..." \
      run build && \
    pnpm --filter @ogcio/examples-angular run build --base-href /examples/angular/ && \
    pnpm --filter @ogcio/design-system-html \
      --filter @ogcio/design-system-react \
      --filter @ogcio/design-system-angular \
      --filter @ogcio/design-system-vue \
      run storybook:build

# Production image
FROM ${NGINX_IMAGE}
ARG DEPLOY_ENV

# Copy static assets from builder stage
COPY --from=builder --chown=nginx /build/apps/docs/out /usr/share/nginx/html/doc
COPY --from=builder --chown=nginx /build/packages/react/storybook-static /usr/share/nginx/html/storybook-react
COPY --from=builder --chown=nginx /build/packages/html/ds/storybook-static /usr/share/nginx/html/storybook-html
COPY --from=builder --chown=nginx /build/packages/angular/storybook-static /usr/share/nginx/html/storybook-angular
COPY --from=builder --chown=nginx /build/packages/vue/storybook-static /usr/share/nginx/html/storybook-vue
COPY --from=builder --chown=nginx /build/examples/angular/dist/ogcio-demo/browser /usr/share/nginx/html/examples/angular

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Environment-specific storybook routes
COPY nginx.storybook.${DEPLOY_ENV}.conf /etc/nginx/storybook.conf

USER nginx

EXPOSE 8080

# Start Nginx server
ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
