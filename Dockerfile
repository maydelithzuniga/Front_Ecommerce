# Dockerfile en la raíz del repositorio (útil para plataformas que construyen desde la raíz)
# Construir:  docker build -t belaf .
FROM node:20-alpine

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0 \
    DATA_FILE=/data/db.json

WORKDIR /app

COPY belaf-center/package.json belaf-center/server.js ./
COPY belaf-center/public ./public

RUN mkdir -p /data && chown -R node:node /data /app
USER node

VOLUME ["/data"]
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "server.js"]
