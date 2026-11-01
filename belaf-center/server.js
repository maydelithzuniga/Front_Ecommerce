'use strict';
/* Belaf Center — servidor del prototipo (Node 18+, sin dependencias externas)
   - Sirve el frontend (public/)
   - API REST + SSE para sincronizar el estado entre dispositivos
   - Login de administradora validado en el servidor (cookie firmada HttpOnly)
   - Persistencia en data/db.json (escritura atómica) */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ---------- Configuración (variables de entorno o archivo .env) ----------
try {
  fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n').forEach(l => {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
} catch (e) { /* .env opcional */ }

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'anahimaelymanosalvacerna@gmail.com').toLowerCase();
// SHA-256 de la contraseña (por defecto, el mismo valor que usaba el prototipo)
const ADMIN_PASSWORD_SHA256 = (process.env.ADMIN_PASSWORD_SHA256 || 'da7507c6485cc649f912b112fa55202e1531cf08ad7c0e321acc891402eb2c4e').toLowerCase();
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const SESSION_HOURS = parseInt(process.env.SESSION_HOURS || '12', 10);
const COOKIE_SECURE = process.env.COOKIE_SECURE === '1'; // pon 1 si usas HTTPS
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_BODY = 2 * 1024 * 1024;

if (!process.env.SESSION_SECRET) console.warn('[aviso] SESSION_SECRET no definido: las sesiones se invalidan al reiniciar. Defínelo en .env');

// ---------- Persistencia ----------
let docs = {};
try { docs = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch (e) { docs = {}; }
fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
let saveT = null;
function guardar() {
  clearTimeout(saveT);
  saveT = setTimeout(() => {
    const tmp = DATA_FILE + '.tmp';
    try { fs.writeFileSync(tmp, JSON.stringify(docs)); fs.renameSync(tmp, DATA_FILE); }
    catch (e) { console.error('[error] no se pudo guardar:', e.message); }
  }, 150);
}
process.on('SIGTERM', () => { try { fs.writeFileSync(DATA_FILE, JSON.stringify(docs)); } catch (e) {} process.exit(0); });
process.on('SIGINT', () => { try { fs.writeFileSync(DATA_FILE, JSON.stringify(docs)); } catch (e) {} process.exit(0); });

// ---------- Sesiones (cookie firmada) ----------
const b64 = b => Buffer.from(b).toString('base64url');
const firmar = p => crypto.createHmac('sha256', SESSION_SECRET).update(p).digest('base64url');
function crearToken(email) {
  const p = b64(JSON.stringify({ email, rol: 'admin', exp: Date.now() + SESSION_HOURS * 3600e3 }));
  return p + '.' + firmar(p);
}
function leerSesion(req) {
  const c = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith('belaf_admin='));
  if (!c) return null;
  const [p, s] = c.slice('belaf_admin='.length).split('.');
  if (!p || !s) return null;
  const esperado = firmar(p);
  if (s.length !== esperado.length || !crypto.timingSafeEqual(Buffer.from(s), Buffer.from(esperado))) return null;
  try { const o = JSON.parse(Buffer.from(p, 'base64url').toString()); return o.exp > Date.now() ? o : null; } catch (e) { return null; }
}
function cookie(valor, maxAge) {
  return `belaf_admin=${valor}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${COOKIE_SECURE ? '; Secure' : ''}`;
}

// Límite simple de intentos de login por IP
const intentos = new Map();
function bloqueado(ip) {
  const r = intentos.get(ip); if (!r) return false;
  if (Date.now() - r.t > 15 * 60e3) { intentos.delete(ip); return false; }
  return r.n >= 8;
}
function falla(ip) { const r = intentos.get(ip) || { n: 0, t: Date.now() }; r.n++; intentos.set(ip, r); }

// ---------- SSE ----------
const clientes = new Set();
function difundir(evento, data) {
  const msg = `event: ${evento}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clientes) { try { res.write(msg); } catch (e) { clientes.delete(res); } }
}

// ---------- Utilidades HTTP ----------
function json(res, code, obj) {
  const b = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(b);
}
function leerBody(req) {
  return new Promise((ok, no) => {
    let n = 0; const ch = [];
    req.on('data', c => { n += c.length; if (n > MAX_BODY) { no(new Error('grande')); req.destroy(); } else ch.push(c); });
    req.on('end', () => { try { ok(ch.length ? JSON.parse(Buffer.concat(ch).toString()) : {}); } catch (e) { no(new Error('json')); } });
    req.on('error', no);
  });
}
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
function estatico(req, res, pathname) {
  let f = path.normalize(path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname));
  if (!f.startsWith(PUBLIC_DIR)) { res.writeHead(403); return res.end('Prohibido'); }
  fs.stat(f, (e, st) => {
    if (e || !st.isFile()) { f = path.join(PUBLIC_DIR, 'index.html'); }
    fs.readFile(f, (e2, buf) => {
      if (e2) { res.writeHead(404); return res.end('No encontrado'); }
      const ext = path.extname(f);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=300', 'X-Content-Type-Options': 'nosniff' });
      res.end(buf);
    });
  });
}

// Documentos permitidos y quién puede escribirlos
const RUTAS_DOC = /^(estado\/main|estado\/presencia|control\/config)$/;
const SOLO_ADMIN = new Set(['control/config']);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = url.pathname;
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();
  try {
    if (p === '/api/salud') return json(res, 200, { ok: true, ts: Date.now() });

    if (p === '/api/yo' && req.method === 'GET') {
      const s = leerSesion(req);
      return json(res, 200, { admin: !!s, email: s ? s.email : null });
    }

    if (p === '/api/login' && req.method === 'POST') {
      if (bloqueado(ip)) return json(res, 429, { error: 'Demasiados intentos. Espera unos minutos.' });
      const b = await leerBody(req);
      const email = String(b.email || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(res, 400, { error: 'Ingresa un correo válido.' });
      if (email === ADMIN_EMAIL) {
        const h = crypto.createHash('sha256').update(String(b.password || '')).digest('hex');
        const a = Buffer.from(h), z = Buffer.from(ADMIN_PASSWORD_SHA256);
        if (a.length !== z.length || !crypto.timingSafeEqual(a, z)) { falla(ip); return json(res, 401, { error: 'Contraseña incorrecta.' }); }
        res.setHeader('Set-Cookie', cookie(crearToken(email), SESSION_HOURS * 3600));
        return json(res, 200, { rol: 'admin' });
      }
      return json(res, 200, { rol: 'participante' });
    }

    if (p === '/api/logout' && req.method === 'POST') {
      res.setHeader('Set-Cookie', cookie('', 0));
      return json(res, 200, { ok: true });
    }

    // Todos los documentos de golpe (para arrancar)
    if (p === '/api/docs' && req.method === 'GET') return json(res, 200, docs);

    // Eventos en tiempo real
    if (p === '/api/eventos' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
      res.write(`retry: 2000\nevent: init\ndata: ${JSON.stringify(docs)}\n\n`);
      clientes.add(res);
      const ping = setInterval(() => { try { res.write(': ping\n\n'); } catch (e) {} }, 20000);
      req.on('close', () => { clearInterval(ping); clientes.delete(res); });
      return;
    }

    // Leer / escribir un documento: /api/doc/estado/main
    if (p.startsWith('/api/doc/')) {
      const clave = decodeURIComponent(p.slice('/api/doc/'.length));
      if (!RUTAS_DOC.test(clave)) return json(res, 404, { error: 'Documento no válido' });
      if (req.method === 'GET') return docs[clave] ? json(res, 200, docs[clave]) : json(res, 404, { error: 'No existe' });
      if (req.method === 'PUT') {
        if (SOLO_ADMIN.has(clave) && !leerSesion(req)) return json(res, 403, { error: 'Requiere sesión de administradora' });
        const b = await leerBody(req);
        if (typeof b !== 'object' || Array.isArray(b)) return json(res, 400, { error: 'Cuerpo inválido' });
        docs[clave] = b;
        if (clave !== 'estado/presencia') guardar();
        difundir('doc', { path: clave, data: b });
        return json(res, 200, { ok: true });
      }
    }

    // Exportar / respaldar (solo administradora)
    if (p === '/api/respaldo' && req.method === 'GET') {
      if (!leerSesion(req)) return json(res, 403, { error: 'Requiere sesión de administradora' });
      res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Disposition': 'attachment; filename="belaf-respaldo.json"' });
      return res.end(JSON.stringify(docs, null, 2));
    }

    if (p.startsWith('/api/')) return json(res, 404, { error: 'Ruta no encontrada' });
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
    return estatico(req, res, decodeURIComponent(p));
  } catch (e) {
    if (e.message === 'grande') return json(res, 413, { error: 'Cuerpo demasiado grande' });
    if (e.message === 'json') return json(res, 400, { error: 'JSON inválido' });
    console.error('[error]', e);
    return json(res, 500, { error: 'Error interno' });
  }
});

server.listen(PORT, HOST, () => console.log(`Belaf Center escuchando en http://${HOST}:${PORT}`));
