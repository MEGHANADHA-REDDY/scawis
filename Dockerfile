FROM node:22-alpine AS voices
WORKDIR /build
RUN npm pack espeak-ng@1.0.2 --silent \
    && tar -xzf espeak-ng-1.0.2.tgz \
    && cp package/LICENSE package/dist/LICENSE

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY app/ /usr/share/nginx/html/
COPY --from=voices /build/package/dist/ /usr/share/nginx/html/voice-engine/
