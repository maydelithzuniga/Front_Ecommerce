# Belaf Center · imagen de producción
# Construir (desde belaf-center/):  docker build -t belaf .
FROM node:20-alpine

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0 \
    DATA_FILE=/data/db.json

WORKDIR /app

# El backend no tiene dependencias externas; solo copiamos lo necesario
COPY package.json server.js ./
COPY public ./public

# Carpeta de datos persistente, propiedad del usuario sin privilegios "node"
RUN mkdir -p /data && chown -R node:node /data /app
USER node

VOLUME ["/data"]
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "server.js"]
