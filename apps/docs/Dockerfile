FROM ghcr.io/nginxinc/nginx-unprivileged:1.26.1-bookworm-perl
# Copy nginx configuration
COPY apps/docs/nginx-redirect.conf /etc/nginx/nginx.conf
USER nginx
EXPOSE 3007
# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
