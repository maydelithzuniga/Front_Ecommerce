/* Cliente de sincronización: reemplaza el "claude.use('db')" del prototipo por el backend propio.
   Mantiene la misma interfaz (doc(path).set / onSnapshot) para no tocar la lógica de app.js. */
(function () {
  'use strict';
  const oyentes = {};          // path -> [callbacks]
  const cache = {};            // path -> data
  let inicial = false;

  function snap(path) {
    const d = cache[path];
    return { exists: d !== undefined, data: () => d, metadata: { hasPendingWrites: false } };
  }
  function avisar(path) { (oyentes[path] || []).forEach(cb => { try { cb(snap(path)); } catch (e) { console.error(e); } }); }

  function conectar() {
    const es = new EventSource('/api/eventos');
    es.addEventListener('init', ev => {
      const all = JSON.parse(ev.data);
      Object.keys(all).forEach(k => { cache[k] = all[k]; });
      inicial = true;
      Object.keys(oyentes).forEach(avisar);   // también notifica los que no existen (exists=false)
    });
    es.addEventListener('doc', ev => {
      const m = JSON.parse(ev.data);
      cache[m.path] = m.data;
      avisar(m.path);
    });
    // EventSource reconecta solo; al reconectar el servidor reenvía 'init'.
  }

  const DB = {
    doc(path) {
      return {
        set(data) {
          return fetch('/api/doc/' + path, {
            method: 'PUT', credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); });
        },
        onSnapshot(cb) {
          (oyentes[path] = oyentes[path] || []).push(cb);
          if (inicial) setTimeout(() => cb(snap(path)), 0);
          return () => { oyentes[path] = oyentes[path].filter(x => x !== cb); };
        }
      };
    }
  };

  const USER = {
    canEdit() {
      return fetch('/api/yo', { credentials: 'same-origin' }).then(r => r.json()).then(j => !!j.admin).catch(() => false);
    }
  };

  window.claude = {
    use(nombre) {
      if (nombre === 'db') return Promise.resolve(DB);
      if (nombre === 'user') return Promise.resolve(USER);
      return Promise.resolve(null);
    }
  };
  conectar();
})();
