FROM nginx:alpine
RUN apk add --no-cache jq
COPY build/ /usr/share/nginx/html
COPY docker-entrypoint.sh generate_config_js.sh /
RUN chmod +x docker-entrypoint.sh generate_config_js.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
