# Belaf Center · Prototipo Bela (frontend + backend)

Prototipo académico convertido a una aplicación autónoma. No depende de Claude para funcionar.

## Estructura
```
belaf-center/
├── server.js              Backend (Node 18+, sin dependencias)
├── package.json
├── .env.example           Copiar a .env y editar
├── Dockerfile             Opcional
├── belaf.service          Opcional (systemd)
├── data/                  Aquí se guarda db.json (estado compartido)
└── public/                Frontend
    ├── index.html
    └── assets/
        ├── styles.css
        ├── images.js      Imágenes embebidas (Bela, productos)
        ├── api.js         Cliente de sincronización (SSE + REST)
        └── app.js         Lógica de la aplicación
```

## Qué hace el backend
- Sirve el frontend.
- Guarda el estado compartido (tickets, pedidos, inventario, configuración) en `data/db.json`.
- Sincroniza en tiempo real entre dispositivos (Server-Sent Events): lo que hace el cliente lo ve el asesor al instante.
- Valida el login de la administradora en el servidor (cookie firmada HttpOnly). Solo ella puede cambiar la configuración del investigador (`control/config`).
- `GET /api/respaldo` (con sesión de administradora) descarga todo el estado en JSON.

## Instalación en la máquina virtual (Linux)
Requisito: Node.js 18 o superior (`node -v`).

```bash
unzip belaf-center.zip && cd belaf-center
cp .env.example .env
nano .env                    # define SESSION_SECRET (openssl rand -hex 32)
node server.js               # o: npm start
```
Abre `http://IP-DE-LA-VM:3000`. Recuerda abrir el puerto 3000 en el firewall / grupo de seguridad.

### Dejarlo corriendo siempre (systemd)
```bash
sudo mv ../belaf-center /opt/belaf-center
sudo chown -R www-data:www-data /opt/belaf-center
sudo cp /opt/belaf-center/belaf.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now belaf
sudo systemctl status belaf
```

### Con Docker
```bash
docker build -t belaf .
docker run -d --name belaf -p 3000:3000 -v belaf-data:/data -e SESSION_SECRET=$(openssl rand -hex 32) belaf
```

### Puerto 80/443 con HTTPS
Usa Nginx o Caddy delante (proxy a `localhost:3000`) y pon `COOKIE_SECURE=1` en `.env`.
Para SSE en Nginx añade `proxy_buffering off;` en la ubicación.

## Acceso
- **Participantes:** entran con cualquier correo válido (sin contraseña).
- **Administradora:** `anahimaelymanosalvacerna@gmail.com` con la misma contraseña del prototipo original.
  Para cambiarla: `printf 'NuevaClave' | sha256sum` y pon el resultado en `ADMIN_PASSWORD_SHA256` (.env).

## Notas importantes
- Es un prototipo de investigación: las claves de licencia son ficticias y viajan en el estado compartido. No lo uses con datos reales de clientes ni licencias reales sin rediseñar el backend (inventario, pagos y correos reales deben vivir solo en el servidor).
- Hay un solo "estado global" compartido por todos los participantes (igual que el prototipo original).
- Respalda `data/db.json` si necesitas conservar los datos del estudio.
