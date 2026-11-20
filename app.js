// Logika prototype (Alpine.js). Semua aksi hanya mengubah state di memori + localStorage.
const STORE_KEY = 'bapelkes-proto-v1';

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/>',
  bed: '<path d="M3 18V7M3 13h18v5M21 13v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="10.5" r="1.8"/>',
  database: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .6 3.2 2.6 3.5 5.5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  chat: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.3z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  people: '<circle cx="12" cy="8" r="4"/><path d="M4 21c.6-4 3.8-6.5 8-6.5s7.4 2.5 8 6.5"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/>',
  play: '<path d="M7 4.5v15l12-7.5z"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4"/>',
  door: '<path d="M5 21V4a1 1 0 0 1 1-1h9l4 2v16"/><path d="M3 21h18M12 12v1"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-1.4-1-1.6-1-2.9 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  broom: '<path d="M14 4 9 13M6 13h7l1 8H5zM8 17v4M11 17v4"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
};

function app() {
  return {
    db: null,
    role: 'pengunjung',
    route: 'p1', param: '', sub: '',
    now: Date.now(), offset: 0,
    palette: 'emas',
    logoOk: true,
    navOpen: false, sideOpen: false, demoOpen: false, demoSc: 1,
    toasts: [],
    modal: null, m: {},           // modal aktif + datanya
    // filter & input halaman
    q: { jenis: 'kamar', start: D(0), end: D(2), qty: 1, date: D(1), peserta: 30 },
    p2tab: 'kamar',
    p3: { start: D(0), end: D(2), qty: 1, date: D(1), from: '08:00', to: '16:00', err: '', month: 0 },
    track: { kode: '', hp: '', err: '' },
    p8tab: 'sk',
    a2: { start: D(0), days: 14 },
    a3: { status: '', jenis: '', cari: '', dari: '', sampai: '' },
    a7sel: null, a7alasan: '',
    a10: { kode: '', b: null, pilih: {}, jaminan: 0, tunai: false, err: '' },
    a12: { kode: '', b: null, kondisi: {}, overtime: 0, catatan: '', err: '' },
    a14filter: '',
    a18: { periode: 'bulan', dari: '', sampai: '', tab: 'keuangan' },
    setTab: 'profil',
    wiz: null,

    // ---------- siklus hidup ----------
    init() {
      this.load();
      window.addEventListener('hashchange', () => this.parseHash());
      this.parseHash();
      setInterval(() => { this.now = Date.now() + this.offset; this.expireHolds(); }, 1000);
      this.$watch('db', () => this.save());
      this.$watch('role', () => this.save());
      this.$watch('palette', () => { this.applyPalette(); this.save(); });
      this.applyPalette();
      this.resetWiz();
    },
    load() {
      let saved = null;
      try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { saved = null; }
      if (saved && saved.db) { this.db = saved.db; this.role = saved.role || 'pengunjung'; this.palette = saved.palette || 'emas'; this.offset = saved.offset || 0; }
      else { this.db = seed(); this.fillPayments(); }
    },
    save() {
      try { localStorage.setItem(STORE_KEY, JSON.stringify({ db: this.db, role: this.role, palette: this.palette, offset: this.offset })); } catch (e) { /* mode privat: abaikan */ }
    },
    resetDemo() {
      this.db = seed(); this.fillPayments(); this.offset = 0; this.now = Date.now(); this.resetWiz();
      this.toast('Data demo dikembalikan ke awal', 'refresh');
    },
    fillPayments() {
      for (const b of this.db.bookings) {
        if (b.payments.length || !['Terkonfirmasi', 'Berlangsung', 'Selesai', 'Dibatalkan'].includes(b.status)) continue;
        const t = this.total(b);
        if (b.bayarPilihan === 'dp') this.addPay(b, 'DP', this.dpAmount(b), b.dibuat + DAY);
        else this.addPay(b, 'Lunas', t, b.dibuat + HOUR);
      }
    },
    applyPalette() {
      const p = PALETTES[this.palette]; const s = document.documentElement.style;
      s.setProperty('--bg', p.bg); s.setProperty('--s2', p.s2); s.setProperty('--line', p.line); s.setProperty('--ink', p.ink); s.setProperty('--ink2', p.ink2);
      s.setProperty('--primary', p.primary); s.setProperty('--psoft', p.psoft); s.setProperty('--pink', p.pink); s.setProperty('--accent', p.accent); s.setProperty('--asoft', p.asoft);
    },

    // ---------- routing & peran ----------
    parseHash() {
      const parts = (location.hash.replace(/^#\/?/, '') || 'p1').split('/');
      const r = parts[0] || 'p1';
      if (!TITLES[r]) { this.go('/p1'); return; }
      this.route = r; this.param = decodeURIComponent(parts[1] || ''); this.sub = decodeURIComponent(parts[2] || '');
      this.navOpen = false; this.sideOpen = false; this.modal = null;
      if (this.isPanel() && this.role === 'pengunjung') { this.route = 'masuk'; }
      if (r === 'set' && this.param) this.setTab = this.param;
      if (r === 'a10' && this.param) this.findCheckin(this.param);
      if (r === 'a12' && this.param) this.findCheckout(this.param);
      if (r === 'p4' && this.wiz.mode !== 'online') this.resetWiz();
      if (r === 'a6' && this.wiz.mode !== 'offline') this.resetWiz('offline');
      document.title = `${TITLES[this.route]} · BAPELKES Palangka Raya`;
      window.scrollTo(0, 0);
    },
    go(path) { if (location.hash === '#' + path) this.parseHash(); else location.hash = path; },
    isPanel(r = this.route) { return /^a\d|^set$/.test(r); },
    access(r = this.route) { return (ACCESS[r] || {})[this.role]; },
    rw(r = this.route) { return this.access(r) === 'rw'; },
    setRole(role, path) {
      this.role = role;
      if (path) return this.go(path);
      if (role === 'pengunjung') return this.go(this.isPanel() ? '/p1' : '/' + this.route + (this.param ? '/' + this.param : ''));
      if (!this.isPanel() || !this.access()) return this.go('/a1');
      this.parseHash();
    },
    roleName(r = this.role) { return { pengunjung: 'Pengunjung', admin: 'Admin', bendahara: 'Bendahara', kepala: 'Kepala Bapelkes' }[r]; },
    menuFor() {
      return MENU.map((m) => m.group ? { ...m, items: m.items.filter((i) => this.access(i.route)) } : m)
        .filter((m) => m.group ? m.items.length : this.access(m.route));
    },
    menuBadge(key) {
      const bs = this.db.bookings;
      return { verif: bs.filter((b) => b.status === 'Menunggu Verifikasi').length, bukti: this.pendingPayments().length,
        refund: bs.filter((b) => b.refund && b.refund.status === 'menunggu').length, ext: this.db.extensions.filter((e) => e.status === 'diajukan').length }[key] || 0;
    },
    runScenario(s) { this.demoOpen = false; this.resetWiz(); this.setRole(s.mulai.role, s.mulai.path); this.toast(`Skenario ${s.no}: ${s.judul}`, 'play'); },

    // ---------- format ----------
    ic(name, cls = 'w-5 h-5') { return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`; },
    rp(n) { n = Math.round(n || 0); return (n < 0 ? '−Rp' : 'Rp') + Math.abs(n).toLocaleString('id-ID'); },
    tgl(d, o = { day: 'numeric', month: 'short', year: 'numeric' }) { return d ? new Date(typeof d === 'string' ? d + 'T00:00' : d).toLocaleDateString('id-ID', o) : '–'; },
    tglPanjang(d) { return this.tgl(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); },
    hari(d) { return this.tgl(d, { weekday: 'short' }); },
    jam(ms) { return new Date(ms).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }); },
    waktu(ms) { return ms ? `${this.tgl(ms)}, ${this.jam(ms)}` : '–'; },
    countdown(ms) {
      const left = Math.max(0, ms - this.now); const h = Math.floor(left / HOUR), m = Math.floor((left % HOUR) / 60e3), s = Math.floor((left % 60e3) / 1000);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },
    sisaWaktu(ms) { const left = ms - this.now; if (left <= 0) return 'habis'; const h = Math.floor(left / HOUR), m = Math.floor((left % HOUR) / 60e3); return h ? `${h} j ${m} m` : `${m} menit`; },
    st(s) { const c = STATUS[s] || STATUS['Selesai']; return `background:${c.bg};color:${c.fg}`; },
    dot(s) { return `background:${(STATUS[s] || STATUS['Selesai']).fg}`; },
    bar(s) { return (STATUS[s] || STATUS['Selesai']).bar; },
    rs(s) { const c = ROOM_STATUS[s]; return `background:${c.bg};color:${c.fg}`; },
    get todayIso() { return iso(this.now); },
    days(a, b) { return Math.round((at(b, 12) - at(a, 12)) / DAY); },
    addDays(d, n) { return iso(at(d, 12) + n * DAY); },
    range(n) { return Array.from({ length: n }, (_, i) => i); },
    p3Cells() { const off = (new Date(at(this.todayIso)).getDay() + 6) % 7; return this.range(28).map((k) => this.addDays(this.todayIso, k - off)); },
    mins(t) { const [h, m] = t.split(':').map(Number); return h * 60 + m; },
    hhmm(m) { return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; },
    jamLabel(t) { return t.replace(':', '.'); },

    // ---------- data lookup ----------
    fac(id) { return this.db.facilities.find((f) => f.id === id) || {}; },
    addon(id) { return this.db.addons.find((a) => a.id === id) || {}; },
    bk(kode) { return this.db.bookings.find((b) => b.kode.toLowerCase() === String(kode).toLowerCase()); },
    kamarFacs() { return this.db.facilities.filter((f) => f.jenis === 'kamar'); },
    gedungFacs() { return this.db.facilities.filter((f) => f.jenis === 'gedung'); },
    isKamar(item) { return this.fac(item.fac).jenis === 'kamar'; },
    firstDate(b) { return b.items.map((i) => i.start || i.date).sort()[0]; },
    lastDate(b) { return b.items.map((i) => i.end || i.date).sort().slice(-1)[0]; },
    hasGedung(b) { return b.items.some((i) => !this.isKamar(i)); },
    jenisLabel(b) { const k = b.items.some((i) => this.isKamar(i)), g = this.hasGedung(b); return k && g ? 'Kamar + Gedung' : g ? 'Gedung/Ruangan' : 'Kamar'; },
    ringkas(b) { return b.items.map((i) => this.isKamar(i) ? `${i.qty}× ${this.fac(i.fac).singkat}` : this.fac(i.fac).singkat).join(', '); },
    sortedBookings() { return this.db.bookings.filter((b) => !b._riwayat).slice().sort((a, b) => b.dibuat - a.dibuat); },

    // ---------- harga ----------
    itemAmount(i) {
      const f = this.fac(i.fac);
      if (f.jenis === 'kamar') return i.qty * Math.max(0, this.days(i.start, i.end)) * f.tarif;
      const hrs = (this.mins(i.to) - this.mins(i.from)) / 60;
      return f.tarifJam ? Math.min(hrs * f.tarifJam, f.tarif) : f.tarif;
    },
    itemDesc(i) {
      const f = this.fac(i.fac);
      if (f.jenis === 'kamar') { const n = this.days(i.start, i.end); return `${i.qty} kamar × ${n} malam · ${this.tgl(i.start, { day: 'numeric', month: 'short' })} – ${this.tgl(i.end)}`; }
      const hrs = (this.mins(i.to) - this.mins(i.from)) / 60;
      const basis = f.tarifJam && hrs * f.tarifJam < f.tarif ? `${hrs} jam × ${this.rp(f.tarifJam)}` : 'tarif harian';
      return `${this.tglPanjang(i.date)} · ${this.jamLabel(i.from)}–${this.jamLabel(i.to)} · ${basis}`;
    },
    addonDays(b) { const ds = b.items.map((i) => (i.start ? this.days(i.start, i.end) : 1)); return Math.max(1, ...ds); },
    lines(b) {
      const out = b.items.map((i) => ({ label: this.fac(i.fac).nama, desc: this.itemDesc(i), jenis: this.isKamar(i) ? 'Asrama' : 'Gedung & Ruangan', amount: this.itemAmount(i) }));
      for (const a of b.addons || []) { const ad = this.addon(a.id); out.push({ label: ad.nama, desc: `${a.qty} × ${a.hari} ${ad.satuan === 'malam' ? 'malam' : 'hari'} × ${this.rp(ad.tarif)}`, jenis: 'Layanan Tambahan', amount: a.qty * a.hari * ad.tarif }); }
      for (const d of b.denda || []) out.push({ label: d.label, desc: 'Denda', jenis: 'Denda', amount: d.nominal });
      return out;
    },
    total(b) { return this.lines(b).reduce((s, l) => s + l.amount, 0); },
    paid(b) { return (b.payments || []).filter((p) => p.status === 'diterima').reduce((s, p) => s + p.nominal, 0); },
    sisa(b) { return Math.max(0, this.total(b) - this.paid(b)); },
    dpAmount(b) { return Math.round((this.total(b) * this.db.settings.bayar.dpPersen) / 100 / 1000) * 1000; },
    payState(b) { const p = this.paid(b), t = this.total(b); return p <= 0 ? 'Belum bayar' : p >= t ? 'Lunas' : 'DP'; },
    pendingPay(b) { return (b.payments || []).find((p) => p.status === 'menunggu'); },
    dueDate(b) { return this.addDays(this.firstDate(b), -this.db.settings.bayar.pelunasanH); },
    progress(b) {
      const g = this.hasGedung(b); const S = g ? ['Diajukan', 'Diverifikasi', 'Dibayar', 'Berlangsung', 'Selesai'] : ['Dipesan', 'Dibayar', 'Berlangsung', 'Selesai'];
      const map = g ? { 'Menunggu Verifikasi': [1, 1], 'Perlu Revisi': [1, 1], 'Menunggu Pembayaran': [2, 2], 'Menunggu Verifikasi Bayar': [2, 2], Terkonfirmasi: [3, -1], Berlangsung: [3, 3], Selesai: [5, -1] }
        : { 'Menunggu Pembayaran': [1, 1], 'Menunggu Verifikasi Bayar': [1, 1], Terkonfirmasi: [2, -1], Berlangsung: [2, 2], Selesai: [4, -1] };
      const m = map[b.status]; if (!m) return [{ label: S[0], done: true }, { label: b.status, done: true, cur: true }];
      return S.map((label, k) => ({ label, done: k < m[0], cur: k === m[1] }));
    },
    statusLabel(b) { return b.status === 'Terkonfirmasi' ? `Terkonfirmasi (${this.payState(b) === 'Lunas' ? 'Lunas' : 'DP'})` : b.status; },

    // ---------- ketersediaan ----------
    unitsOf(facId) { return this.db.rooms.filter((r) => r.fac === facId && r.status !== 'perbaikan').length; },
    roomUsed(facId, date, exclude, extra = []) {
      let used = 0;
      for (const b of this.db.bookings) {
        if (b.kode === exclude || !HOLDING.includes(b.status)) continue;
        for (const i of b.items) if (i.fac === facId && i.start <= date && date < i.end) used += i.qty;
      }
      for (const k of this.db.blocks) if (k.fac === facId && k.start <= date && date < k.end) used += k.qty || 0;
      for (const i of extra) if (i.fac === facId && i.start <= date && date < i.end) used += i.qty;
      return used;
    },
    roomAvail(facId, date, exclude, extra) { return Math.max(0, this.unitsOf(facId) - this.roomUsed(facId, date, exclude, extra)); },
    minAvail(facId, start, end, exclude) { let m = Infinity; for (let d = start; d < end; d = this.addDays(d, 1)) m = Math.min(m, this.roomAvail(facId, d, exclude)); return m === Infinity ? this.unitsOf(facId) : m; },
    busy(facId, date, exclude, extra = []) {
      const out = [];
      for (const b of this.db.bookings) {
        if (b.kode === exclude || !HOLDING.includes(b.status)) continue;
        b.items.forEach((i) => { if (i.fac === facId && i.date === date) out.push({ from: i.from, to: i.to, status: b.status, kode: b.kode, label: b.kegiatan || b.nama }); });
      }
      for (const k of this.db.blocks) if (k.fac === facId && k.start <= date && date < k.end) out.push({ from: '00:00', to: '24:00', status: 'Agenda Internal', label: k.label, block: k.id });
      for (const i of extra) if (i.fac === facId && i.date === date) out.push({ from: i.from, to: i.to, status: 'Menunggu Verifikasi', label: 'Item lain di pesanan ini' });
      return out.sort((a, b) => a.from.localeCompare(b.from));
    },
    dayState(facId, date) { // untuk strip tanggal gedung
      const bz = this.busy(facId, date); if (!bz.length) return 'kosong';
      const a = this.db.settings.aturan; const total = this.mins(a.tutup) - this.mins(a.buka);
      const used = bz.reduce((s, x) => s + Math.min(this.mins(x.to === '24:00' ? a.tutup : x.to), this.mins(a.tutup)) - Math.max(this.mins(x.from), this.mins(a.buka)), 0);
      return used >= total - 60 ? 'penuh' : 'sebagian';
    },
    checkItem(item, exclude, others = []) {
      const f = this.fac(item.fac); const a = this.db.settings.aturan; const today = this.todayIso;
      if (f.jenis === 'kamar') {
        if (!item.start || !item.end || item.end <= item.start) return 'Tanggal keluar harus setelah tanggal masuk.';
        if (item.start < today) return 'Tanggal masuk tidak boleh sebelum hari ini.';
        if (item.end > a.batasAkhir) return `Pemesanan paling jauh sampai ${this.tgl(a.batasAkhir)}.`;
        if (!(item.qty >= 1)) return 'Jumlah kamar minimal 1.';
        for (let d = item.start; d < item.end; d = this.addDays(d, 1)) {
          const av = this.roomAvail(item.fac, d, exclude, others);
          if (av < item.qty) return av === 0 ? `Kamar ${f.singkat} penuh pada ${this.tglPanjang(d)}.` : `Pada ${this.tglPanjang(d)} hanya tersisa ${av} kamar ${f.singkat}.`;
        }
        return null;
      }
      if (!item.date) return 'Pilih tanggal pemakaian.';
      if (item.date < today) return 'Tanggal tidak boleh sebelum hari ini.';
      if (item.date > a.batasAkhir) return `Pemesanan paling jauh sampai ${this.tgl(a.batasAkhir)}.`;
      const fm = this.mins(item.from), tm = this.mins(item.to);
      if (tm <= fm) return 'Jam selesai harus setelah jam mulai.';
      if (fm < this.mins(a.buka) || tm > this.mins(a.tutup)) return `Jam operasional gedung ${this.jamLabel(a.buka)}–${this.jamLabel(a.tutup)}.`;
      const j = a.jedaMenit;
      for (const x of this.busy(item.fac, item.date, exclude, others)) {
        if (fm < this.mins(x.to) + j && this.mins(x.from) < tm + j) {
          return x.status === 'Agenda Internal' ? `Bentrok: ${f.singkat} dipakai agenda internal (${x.label}).`
            : `Bentrok dengan jadwal ${this.jamLabel(x.from)}–${this.jamLabel(x.to)} pada tanggal ini (termasuk jeda ${j} menit antaracara).`;
        }
      }
      return null;
    },

    // ---------- notifikasi & toast ----------
    toast(text, icon = 'check', tone = 'ok') {
      const id = Math.random(); this.toasts.push({ id, text, icon, tone });
      setTimeout(() => (this.toasts = this.toasts.filter((t) => t.id !== id)), 4500);
    },
    notify(ev, b) {
      const n = this.db.settings.notif.find((x) => x.ev === ev); if (!n) return;
      const ch = [n.email && 'email', n.wa && 'WhatsApp'].filter(Boolean);
      if (ch.length) this.toast(`Notifikasi "${ev}" terkirim lewat ${ch.join(' & ')} ke ${b.nama} (simulasi)`, n.wa ? 'chat' : 'mail', 'info');
    },
    log(b, teks) { b.log.push({ t: this.now, teks: `${teks}${this.role !== 'pengunjung' ? ` — ${this.roleName()}` : ''}` }); },

    // ---------- timer hold ----------
    expireHolds() {
      for (const b of this.db.bookings) {
        if (['Menunggu Pembayaran', 'Menunggu Verifikasi', 'Perlu Revisi'].includes(b.status) && b.holdUntil && b.holdUntil <= this.now) {
          b.status = 'Kedaluwarsa'; b.log.push({ t: this.now, teks: 'Kedaluwarsa: batas waktu hold habis, jadwal dilepas otomatis' });
          this.toast(`${b.kode} kedaluwarsa — jadwal dilepas`, 'clock', 'warn'); this.notify('Booking kedaluwarsa', b);
        }
      }
    },
    warp(hours) { this.offset += hours * HOUR; this.now = Date.now() + this.offset; this.save(); this.toast(`Waktu simulasi maju ${hours} jam`, 'clock', 'info'); },

    // ---------- wizard pemesanan (P4 & A6) ----------
    resetWiz(mode = 'online') {
      this.wiz = { mode, step: 1, items: [], addons: Object.fromEntries(this.db.addons.map((a) => [a.id, { qty: 0, hari: 1 }])), pj: { nama: '', hp: '', email: '', instansi: '', kegiatan: '', peserta: '' }, bayar: 'dp', setuju: false, metode: 'transfer', errors: {}, add: { fac: 'dbl', start: D(0), end: D(2), qty: 1, date: D(1), from: '08:00', to: '16:00', err: '' } };
    },
    wizErr(idx) { const others = this.wiz.items.filter((_, j) => j !== idx); return this.checkItem(this.wiz.items[idx], null, others); },
    addToWiz(item) {
      const err = this.checkItem(item, null, this.wiz.items); if (err) return err;
      this.wiz.items.push(JSON.parse(JSON.stringify(item))); return null;
    },
    addFromP3(f) {
      const it = f.jenis === 'kamar' ? { fac: f.id, start: this.p3.start, end: this.p3.end, qty: +this.p3.qty } : { fac: f.id, date: this.p3.date, from: this.p3.from, to: this.p3.to };
      if (this.wiz.mode !== 'online') this.resetWiz();
      this.p3.err = this.addToWiz(it) || '';
      if (!this.p3.err) { this.wiz.step = 1; this.toast(`${f.singkat} ditambahkan ke pesanan`); this.go('/p4'); }
    },
    addFromWiz() {
      const a = this.wiz.add; const f = this.fac(a.fac);
      const it = f.jenis === 'kamar' ? { fac: a.fac, start: a.start, end: a.end, qty: +a.qty } : { fac: a.fac, date: a.date, from: a.from, to: a.to };
      a.err = this.addToWiz(it) || '';
    },
    wizBooking() { // booking sementara untuk hitung biaya
      const ad = Object.entries(this.wiz.addons).filter(([, v]) => v.qty > 0).map(([id, v]) => ({ id, qty: +v.qty, hari: +v.hari || 1 }));
      return { items: this.wiz.items, addons: ad, denda: [], payments: [] };
    },
    wizNext() {
      const w = this.wiz; w.errors = {};
      if (w.step === 1) { if (!w.items.length) { w.errors.items = 'Tambahkan minimal satu fasilitas.'; return; } if (w.items.some((_, i) => this.wizErr(i))) { w.errors.items = 'Perbaiki jadwal yang bentrok dulu.'; return; } }
      if (w.step === 3) {
        if (!w.pj.nama.trim()) w.errors.nama = 'Nama penanggung jawab wajib diisi.';
        if (!/^(\+62|0)8\d{7,12}$/.test(w.pj.hp.replace(/[\s-]/g, ''))) w.errors.hp = 'Nomor HP tidak valid. Contoh: 081234567890.';
        if (w.mode === 'online' && w.pj.email && !/^\S+@\S+\.\S+$/.test(w.pj.email)) w.errors.email = 'Format email tidak valid.';
        if (!w.pj.kegiatan.trim()) w.errors.kegiatan = 'Isi keperluan atau nama kegiatan.';
        if (Object.keys(w.errors).length) return;
      }
      if (w.step === 4) return this.submitWiz();
      w.step++; window.scrollTo(0, 0);
      if (w.step === 2) { const h = this.addonDays(this.wizBooking()); for (const a of this.db.addons) { const cur = w.addons[a.id]; if (!cur || !cur.qty) w.addons[a.id] = { qty: 0, hari: h }; } }
    },
    fillDemo() { Object.assign(this.wiz.pj, { nama: 'Ahmad Fauzi', hp: '081234567890', email: 'ahmad@contoh.id', instansi: 'Dinkes Kab. Gunung Mas', kegiatan: 'Pelatihan Tenaga Promosi Kesehatan', peserta: '40' }); },
    submitWiz() {
      const w = this.wiz;
      if (w.mode === 'online' && !w.setuju) { w.errors.setuju = 'Centang persetujuan syarat & ketentuan.'; return; }
      if (w.items.some((_, i) => this.wizErr(i))) { w.errors.items = 'Jadwal baru saja terisi orang lain. Kembali ke langkah 1.'; return; }
      const d = new Date(this.now); const kode = `BPK-${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(this.db.seq++).padStart(2, '0')}`;
      const tmp = this.wizBooking();
      const b = { kode, ...JSON.parse(JSON.stringify(w.pj)), hp: w.pj.hp.replace(/[\s-]/g, ''), items: JSON.parse(JSON.stringify(tmp.items)), addons: tmp.addons, payments: [], log: [], denda: [], catatan: [],
        kamarDibagi: {}, jaminan: null, diperpanjang: false, reschedule: null, revisi: '', bayarPilihan: w.bayar, sumber: w.mode, dibuat: this.now, holdUntil: null, status: '' };
      const a = this.db.settings.aturan;
      if (w.mode === 'offline') {
        b.log.push({ t: this.now, teks: 'Booking offline diinput admin (pemesanan lewat telepon/datang langsung)' });
        if (w.metode === 'transfer') { b.status = 'Menunggu Pembayaran'; b.holdUntil = this.now + (this.hasGedung(b) ? a.holdGedungJam : a.holdKamarJam) * HOUR; }
        else { b.status = 'Terkonfirmasi'; this.addPay(b, w.bayar === 'dp' ? 'DP' : 'Lunas', w.bayar === 'dp' ? this.dpAmount(b) : this.total(b), this.now, 'Tunai'); b.log.push({ t: this.now, teks: `Dibayar tunai di tempat (${w.bayar === 'dp' ? 'DP' : 'lunas'}), kuitansi terbit` }); }
      } else if (this.hasGedung(b)) { b.status = 'Menunggu Verifikasi'; b.holdUntil = this.now + a.holdGedungJam * HOUR; b.log.push({ t: this.now, teks: 'Pengajuan dibuat, jadwal ditahan sambil menunggu verifikasi admin' }); }
      else { b.status = 'Menunggu Pembayaran'; b.holdUntil = this.now + a.holdKamarJam * HOUR; b.log.push({ t: this.now, teks: `Pesanan dibuat, kamar tersedia — jadwal ditahan ${a.holdKamarJam} jam menunggu pembayaran` }); }
      this.db.bookings.push(b); this.notify('Booking dibuat', b);
      const mode = w.mode; this.resetWiz(mode);
      this.go(mode === 'offline' ? `/a4/${kode}` : `/p5/${kode}`);
    },
    addPay(b, jenis, nominal, t, metode = 'Transfer', status = 'diterima') {
      const d = new Date(t); const p = { id: Math.random().toString(36).slice(2, 8), jenis, nominal, tgl: t, status, metode, file: metode === 'Transfer' ? 'bukti-transfer.jpg' : null, kuitansi: null };
      if (status === 'diterima') p.kuitansi = `KW/${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(++this.db.kw).padStart(4, '0')}`;
      b.payments.push(p); return p;
    },

    // ---------- lacak ----------
    doTrack() {
      const b = this.bk(this.track.kode.trim()); const hp = this.track.hp.replace(/[\s-]/g, '');
      if (!b) { this.track.err = 'Kode booking tidak ditemukan. Periksa kembali huruf dan angkanya.'; return; }
      if (!hp || b.hp.slice(-4) !== hp.slice(-4)) { this.track.err = 'Nomor HP tidak cocok dengan data pemesan.'; return; }
      this.track.err = ''; this.go(`/p7/${b.kode}`);
    },
    copy(text) { try { navigator.clipboard.writeText(text); } catch (e) { /* abaikan */ } this.toast(`${text} disalin`, 'copy'); },

    // ---------- aksi booking ----------
    open(name, data = {}) { this.modal = name; this.m = data; },
    close() { this.modal = null; this.m = {}; },
    canUpload(b) { return ['Menunggu Pembayaran', 'Terkonfirmasi', 'Berlangsung'].includes(b.status) && this.sisa(b) > 0 && !this.pendingPay(b); },
    openUpload(b) {
      const first = this.paid(b) === 0;
      const jenis = first ? (b.bayarPilihan === 'dp' ? 'DP' : 'Lunas') : (b.status === 'Berlangsung' ? 'Tambahan' : 'Pelunasan');
      this.open('upload', { kode: b.kode, jenis, nominal: jenis === 'DP' ? this.dpAmount(b) : this.sisa(b), file: '', err: '' });
    },
    setUploadJenis(b, j) { this.m.jenis = j; this.m.nominal = j === 'DP' ? this.dpAmount(b) : this.sisa(b); },
    submitUpload() {
      const b = this.bk(this.m.kode); if (!this.m.file) { this.m.err = 'Pilih file bukti transfer (JPG, PNG, atau PDF).'; return; }
      if (!(this.m.nominal > 0)) { this.m.err = 'Nominal harus lebih dari 0.'; return; }
      const p = this.addPay(b, this.m.jenis, +this.m.nominal, this.now, 'Transfer', 'menunggu'); p.file = this.m.file;
      if (b.status === 'Menunggu Pembayaran') b.status = 'Menunggu Verifikasi Bayar';
      this.log(b, `Bukti ${this.m.jenis} ${this.rp(p.nominal)} diunggah, menunggu verifikasi bendahara`);
      this.close(); this.toast('Bukti bayar terkirim. Bendahara akan memverifikasi.', 'upload');
    },
    pendingPayments() { const out = []; for (const b of this.db.bookings) for (const p of b.payments) if (p.status === 'menunggu') out.push({ b, p }); return out.sort((x, y) => x.p.tgl - y.p.tgl); },
    a7cur() { const all = this.pendingPayments(); const x = all.find((x) => x.p.id === this.a7sel) || all[0]; return x ? [x] : []; },
    verifyPay(b, p, ok, alasan = '') {
      if (ok) {
        const d = new Date(this.now); p.status = 'diterima'; p.kuitansi = `KW/${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(++this.db.kw).padStart(4, '0')}`; p.verifiedAt = this.now;
        if (b.status === 'Menunggu Verifikasi Bayar') b.status = 'Terkonfirmasi';
        this.log(b, `Pembayaran ${p.jenis} ${this.rp(p.nominal)} diterima, kuitansi ${p.kuitansi} terbit`); this.notify('Bukti bayar diterima', b);
        this.toast(`Pembayaran ${b.kode} diterima · kuitansi ${p.kuitansi}`);
      } else {
        if (!alasan.trim()) { this.toast('Tulis alasan penolakan dulu', 'alert', 'warn'); return false; }
        p.status = 'ditolak'; p.alasan = alasan;
        if (b.status === 'Menunggu Verifikasi Bayar') { b.status = 'Menunggu Pembayaran'; b.holdUntil = this.now + this.db.settings.aturan.holdKamarJam * HOUR; }
        this.log(b, `Bukti ${p.jenis} ditolak: ${alasan}`); this.notify('Ditolak / perlu revisi', b); this.toast(`Bukti bayar ${b.kode} ditolak`, 'x', 'warn');
      }
      this.a7sel = null; this.a7alasan = ''; return true;
    },
    approve(b) {
      b.status = 'Menunggu Pembayaran'; b.holdUntil = this.now + this.db.settings.aturan.holdGedungJam * HOUR;
      this.log(b, `Disetujui. Tagihan terbit, jadwal ditahan ${this.db.settings.aturan.holdGedungJam} jam`); this.notify('Disetujui admin', b); this.toast(`${b.kode} disetujui`);
    },
    reject(b, alasan) { if (!alasan || !alasan.trim()) return this.toast('Tulis alasan penolakan', 'alert', 'warn'); b.status = 'Ditolak'; b.alasanTolak = alasan; b.holdUntil = null; this.log(b, `Ditolak: ${alasan}`); this.notify('Ditolak / perlu revisi', b); this.close(); this.toast(`${b.kode} ditolak, jadwal dilepas`, 'x', 'warn'); },
    askRevision(b, note) { if (!note || !note.trim()) return this.toast('Tulis catatan revisi', 'alert', 'warn'); b.status = 'Perlu Revisi'; b.revisi = note; b.holdUntil = this.now + 24 * HOUR; this.log(b, `Diminta revisi: ${note}`); this.notify('Ditolak / perlu revisi', b); this.close(); this.toast(`Permintaan revisi dikirim ke ${b.nama}`, 'chat', 'info'); },
    submitRevision(b, teks) { if (!teks || !teks.trim()) return this.toast('Tulis perbaikan yang Anda lakukan', 'alert', 'warn'); b.catatan.push({ t: this.now, oleh: 'Penyewa', teks }); b.status = 'Menunggu Verifikasi'; b.holdUntil = this.now + this.db.settings.aturan.holdGedungJam * HOUR; this.log(b, 'Revisi dikirim penyewa'); this.close(); this.toast('Revisi terkirim, menunggu verifikasi ulang'); },

    // pembatalan & refund
    canCancel(b) { return ['Menunggu Verifikasi', 'Menunggu Pembayaran', 'Menunggu Verifikasi Bayar', 'Terkonfirmasi', 'Perlu Revisi'].includes(b.status); },
    refundCalc(b) {
      const h = this.days(this.todayIso, this.firstDate(b)); const paid = this.paid(b); const t = this.total(b) || 1; const ratio = Math.min(1, paid / t);
      const pct = (jenis) => { const rules = this.db.settings.refund[jenis].slice().sort((x, y) => y.h - x.h); return (rules.find((r) => h >= r.h) || { p: 0 }).p; };
      const kind = (l) => (l.jenis === 'Asrama' ? 'kamar' : l.jenis === 'Gedung & Ruangan' ? 'gedung' : this.hasGedung(b) ? 'gedung' : 'kamar');
      const rows = this.lines(b).filter((l) => l.jenis !== 'Denda').map((l) => ({ label: l.label, dibayar: l.amount * ratio, persen: pct(kind(l)), refund: (l.amount * ratio * pct(kind(l))) / 100 }));
      return { h, paid, rows, total: Math.round(rows.reduce((s, r) => s + r.refund, 0)) };
    },
    doCancel(b, alasan) {
      const c = this.refundCalc(b); b.status = 'Dibatalkan'; b.holdUntil = null;
      b.payments.filter((p) => p.status === 'menunggu').forEach((p) => { p.status = 'ditolak'; p.alasan = 'Booking dibatalkan'; });
      if (c.total > 0) b.refund = { nominal: c.total, persen: Math.round((c.total / Math.max(1, c.paid)) * 100), status: 'menunggu', diajukan: this.now };
      this.log(b, `Dibatalkan (H-${c.h})${alasan ? ': ' + alasan : ''}. ${c.total > 0 ? 'Refund ' + this.rp(c.total) + ' diproses bendahara' : 'Tidak ada refund'}`);
      this.close(); this.toast(`${b.kode} dibatalkan${c.total > 0 ? ', refund ' + this.rp(c.total) + ' masuk antrian bendahara' : ''}`, 'x', 'warn');
    },
    markRefund(b) { b.refund.status = 'ditransfer'; b.refund.tgl = this.now; this.log(b, `Refund ${this.rp(b.refund.nominal)} ditransfer`); this.toast(`Refund ${b.kode} ditandai sudah ditransfer`); },

    // reschedule
    canResched(b) { return ['Menunggu Verifikasi', 'Menunggu Pembayaran', 'Terkonfirmasi'].includes(b.status) && !(b.reschedule && b.reschedule.status === 'diajukan'); },
    openResched(b) { this.open('resched', { kode: b.kode, baru: this.addDays(this.firstDate(b), 7), err: '', ok: '' }); },
    shifted(b, baru) { const delta = this.days(this.firstDate(b), baru); return b.items.map((i) => i.start ? { ...i, start: this.addDays(i.start, delta), end: this.addDays(i.end, delta) } : { ...i, date: this.addDays(i.date, delta) }); },
    checkResched(b) {
      const r = this.db.settings.refund; const h = this.days(this.todayIso, this.firstDate(b));
      if (this.role === 'pengunjung' && h < r.reschedMinH) return `Reschedule hanya bisa diajukan paling lambat H-${r.reschedMinH}.`;
      if (this.role === 'pengunjung' && (b.reschedCount || 0) >= r.reschedMaks) return `Batas reschedule (${r.reschedMaks} kali) sudah terpakai.`;
      const items = this.shifted(b, this.m.baru);
      for (let i = 0; i < items.length; i++) { const e = this.checkItem(items[i], b.kode, items.filter((_, j) => j !== i)); if (e) return e; }
      return null;
    },
    submitResched() {
      const b = this.bk(this.m.kode); const e = this.checkResched(b); if (e) { this.m.err = e; return; }
      if (this.role === 'pengunjung') { b.reschedule = { baru: this.m.baru, status: 'diajukan', t: this.now }; this.log(b, `Mengajukan reschedule ke ${this.tgl(this.m.baru)}`); this.toast('Pengajuan reschedule terkirim ke admin', 'calendar', 'info'); }
      else this.applyResched(b, this.m.baru);
      this.close();
    },
    applyResched(b, baru) {
      const e = (() => { const items = this.shifted(b, baru); for (let i = 0; i < items.length; i++) { const x = this.checkItem(items[i], b.kode, items.filter((_, j) => j !== i)); if (x) return x; } return null; })();
      if (e) { this.toast(e, 'alert', 'warn'); return; }
      const lama = this.firstDate(b); b.items = this.shifted(b, baru); b.reschedCount = (b.reschedCount || 0) + 1; if (b.reschedule) b.reschedule.status = 'disetujui';
      this.log(b, `Jadwal dipindah dari ${this.tgl(lama)} ke ${this.tgl(baru)}`); this.toast(`Jadwal ${b.kode} dipindah ke ${this.tgl(baru)}`, 'calendar');
    },
    rejectResched(b) { b.reschedule.status = 'ditolak'; this.log(b, 'Pengajuan reschedule ditolak'); this.toast('Pengajuan reschedule ditolak', 'x', 'warn'); },

    // perpanjangan
    canExtend(b) { return ['Terkonfirmasi', 'Berlangsung'].includes(b.status); },
    openExtend(b) { const idx = b.items.findIndex((i) => this.isKamar(i)); this.open('extend', { kode: b.kode, item: Math.max(0, idx), tambah: 1 }); },
    extendCheck() {
      const b = this.bk(this.m.kode); const i = b.items[this.m.item]; if (!i) return { ok: false, msg: 'Pilih item.' };
      const n = +this.m.tambah || 0; if (n < 1) return { ok: false, msg: 'Minimal 1.' };
      if (this.isKamar(i)) {
        for (let d = i.end, k = 0; k < n; k++, d = this.addDays(d, 1)) { const av = this.roomAvail(i.fac, d, b.kode); if (av < i.qty) return { ok: false, msg: `Bentrok dengan jadwal berikutnya: ${this.tglPanjang(d)} hanya tersisa ${av} kamar ${this.fac(i.fac).singkat}.` }; }
        return { ok: true, biaya: i.qty * n * this.fac(i.fac).tarif, msg: `Tersedia. Check-out baru ${this.tglPanjang(this.addDays(i.end, n))} pukul ${this.jamLabel(this.db.settings.aturan.checkout)}.` };
      }
      const to = this.hhmm(this.mins(i.to) + n * 60); const e = this.checkItem({ ...i, to }, b.kode, b.items.filter((x) => x !== i));
      if (e) return { ok: false, msg: e.startsWith('Bentrok') ? 'Bentrok dengan jadwal berikutnya. ' + e : e };
      const f = this.fac(i.fac); const tambahBiaya = this.itemAmount({ ...i, to }) - this.itemAmount(i);
      return { ok: true, biaya: tambahBiaya, msg: `Slot setelahnya kosong sampai ${this.jamLabel(to)}. Perpanjangan gedung perlu disetujui admin.`, gedung: true, to, f };
    },
    submitExtend() {
      const b = this.bk(this.m.kode); const c = this.extendCheck(); if (!c.ok) return; const i = b.items[this.m.item]; const n = +this.m.tambah;
      if (c.gedung && this.role === 'pengunjung') {
        this.db.extensions.push({ id: 'ext' + Math.random().toString(36).slice(2, 6), kode: b.kode, item: this.m.item, tambah: n, satuan: 'jam', status: 'diajukan', oleh: 'Penyewa', t: this.now });
        this.log(b, `Mengajukan perpanjangan ${n} jam`); this.toast('Pengajuan perpanjangan dikirim ke admin', 'clock', 'info');
      } else {
        this.applyExtend(b, this.m.item, n);
        this.db.extensions.push({ id: 'ext' + Math.random().toString(36).slice(2, 6), kode: b.kode, item: this.m.item, tambah: n, satuan: c.gedung ? 'jam' : 'malam', status: c.gedung ? 'disetujui' : 'disetujui otomatis', oleh: this.role === 'pengunjung' ? 'Penyewa' : 'Admin', t: this.now });
        this.toast(`Diperpanjang ${n} ${c.gedung ? 'jam' : 'malam'}. Tagihan tambahan ${this.rp(c.biaya)}`, 'plus');
      }
      this.close();
    },
    applyExtend(b, idx, n) {
      const i = b.items[idx];
      if (this.isKamar(i)) { i.end = this.addDays(i.end, n); this.log(b, `Diperpanjang ${n} malam, check-out baru ${this.tgl(i.end)}`); }
      else { i.to = this.hhmm(this.mins(i.to) + n * 60); this.log(b, `Diperpanjang ${n} jam sampai ${this.jamLabel(i.to)}`); }
      b.diperpanjang = true;
    },
    extStatus(e) { const b = this.bk(e.kode); const i = b && b.items[e.item]; if (!i || this.isKamar(i)) return { ok: true, msg: '' };
      const to = this.hhmm(this.mins(i.to) + e.tambah * 60); const err = this.checkItem({ ...i, to, date: i.date < this.todayIso ? this.todayIso : i.date }, b.kode, b.items.filter((x) => x !== i)); return { ok: !err, msg: err || `Kosong sampai ${this.jamLabel(to)}` }; },
    decideExt(e, ok) {
      const b = this.bk(e.kode);
      if (ok) { if (!this.extStatus(e).ok) return this.toast('Tidak bisa disetujui: bentrok dengan jadwal berikutnya', 'alert', 'warn'); this.applyExtend(b, e.item, e.tambah); e.status = 'disetujui'; this.toast(`Perpanjangan ${b.kode} disetujui`); }
      else { e.status = 'ditolak'; this.log(b, 'Pengajuan perpanjangan ditolak'); this.toast('Perpanjangan ditolak', 'x', 'warn'); }
    },

    // check-in
    checkinList() { return this.db.bookings.filter((b) => b.status === 'Terkonfirmasi').sort((a, b) => this.firstDate(a).localeCompare(this.firstDate(b))); },
    findCheckin(kode) {
      const b = this.bk(kode || this.a10.kode); this.a10.err = '';
      if (!b) { this.a10.b = null; this.a10.err = 'Kode booking tidak ditemukan.'; return; }
      if (b.status !== 'Terkonfirmasi') { this.a10.b = null; this.a10.err = `Booking ${b.kode} berstatus "${b.status}". Check-in hanya untuk booking Terkonfirmasi.`; return; }
      this.a10 = { kode: b.kode, b, pilih: {}, jaminan: this.db.settings.bayar.jaminan, tunai: false, err: '' };
      b.items.forEach((i, idx) => { if (this.isKamar(i)) this.a10.pilih[idx] = []; });
    },
    readyRooms(fac) { return this.db.rooms.filter((r) => r.fac === fac); },
    toggleRoom(idx, no, max) { const arr = this.a10.pilih[idx]; const k = arr.indexOf(no); if (k >= 0) arr.splice(k, 1); else if (arr.length < max) arr.push(no); else this.toast(`Maksimal ${max} kamar untuk item ini`, 'info', 'info'); },
    autoPick(idx, i) { this.a10.pilih[idx] = this.db.rooms.filter((r) => r.fac === i.fac && r.status === 'siap').slice(0, i.qty).map((r) => r.no); },
    doCheckin() {
      const s = this.a10; const b = s.b;
      for (const [idx, arr] of Object.entries(s.pilih)) if (arr.length !== b.items[idx].qty) { s.err = `Pilih ${b.items[idx].qty} kamar untuk ${this.fac(b.items[idx].fac).singkat}.`; return; }
      if (this.sisa(b) > 0 && !s.tunai) { s.err = `Masih ada sisa tagihan ${this.rp(this.sisa(b))}. Centang "lunasi tunai sekarang" atau minta penyewa melunasi dulu.`; return; }
      if (this.sisa(b) > 0) this.addPay(b, 'Pelunasan', this.sisa(b), this.now, 'Tunai');
      b.kamarDibagi = JSON.parse(JSON.stringify(s.pilih));
      Object.values(s.pilih).flat().forEach((no) => (this.db.rooms.find((r) => r.no === no).status = 'terisi'));
      b.jaminan = s.jaminan > 0 ? { nominal: +s.jaminan, status: 'ditahan' } : null;
      b.status = 'Berlangsung'; b.checkin = this.now;
      const nos = Object.values(s.pilih).flat();
      this.log(b, `Check-in${nos.length ? ', kamar ' + nos.join(', ') : ''}${b.jaminan ? ', jaminan ' + this.rp(b.jaminan.nominal) + ' diterima' : ''}`); this.notify('Check-in / check-out', b);
      this.toast(`Check-in ${b.kode} selesai${nos.length ? ' · ' + nos.join(', ') : ''}`, 'key');
      this.a10 = { kode: '', b: null, pilih: {}, jaminan: 0, tunai: false, err: '' }; this.go(`/a4/${b.kode}`);
    },

    // check-out
    stayingList() { return this.db.bookings.filter((b) => b.status === 'Berlangsung').sort((a, b) => this.lastDate(a).localeCompare(this.lastDate(b))); },
    checkoutDue(b) {
      const k = b.items.filter((i) => this.isKamar(i));
      if (k.length) return at(k.map((i) => i.end).sort().pop(), 0) + this.mins(this.db.settings.aturan.checkout) * 60e3;
      const g = b.items.slice().sort((x, y) => (x.date + x.to).localeCompare(y.date + y.to)).pop();
      return at(g.date, 0) + this.mins(g.to) * 60e3;
    },
    findCheckout(kode) {
      const b = this.bk(kode || this.a12.kode); this.a12.err = '';
      if (!b || b.status !== 'Berlangsung') { this.a12.b = null; this.a12.err = b ? `Booking ${b.kode} berstatus "${b.status}". Check-out hanya untuk tamu yang sedang menginap/memakai.` : 'Kode booking tidak ditemukan.'; return; }
      const kondisi = {}; Object.values(b.kamarDibagi || {}).flat().forEach((no) => (kondisi[no] = { baik: true, denda: 0, ket: '' }));
      b.items.forEach((i, idx) => { if (!this.isKamar(i)) kondisi['g' + idx] = { baik: true, denda: 0, ket: '', label: this.fac(i.fac).nama }; });
      const late = Math.max(0, Math.ceil((this.now - this.checkoutDue(b)) / HOUR));
      this.a12 = { kode: b.kode, b, kondisi, overtime: late, catatan: '', err: '' };
    },
    co() { // ringkasan check-out
      const s = this.a12; const b = s.b; if (!b) return {};
      const dendaKerusakan = Object.values(s.kondisi).reduce((t, k) => t + (k.baik ? 0 : +k.denda || 0), 0);
      const dendaOT = (+s.overtime || 0) * this.db.settings.bayar.dendaJam;
      const sisaAwal = this.sisa(b); const tagihan = sisaAwal + dendaKerusakan + dendaOT; const jam = b.jaminan && b.jaminan.status === 'ditahan' ? b.jaminan.nominal : 0;
      const potong = Math.min(jam, tagihan);
      return { dendaKerusakan, dendaOT, sisaAwal, tagihan, jaminan: jam, potong, kembali: jam - potong, kurang: tagihan - potong };
    },
    doCheckout() {
      const s = this.a12; const b = s.b; const c = this.co();
      for (const [no, k] of Object.entries(s.kondisi)) if (!k.baik && +k.denda > 0) b.denda.push({ label: `Denda kerusakan ${k.label || 'kamar ' + no}${k.ket ? ' (' + k.ket + ')' : ''}`, nominal: +k.denda });
      if (c.dendaOT > 0) b.denda.push({ label: `Denda overtime ${s.overtime} jam`, nominal: c.dendaOT });
      if (c.potong > 0) this.addPay(b, 'Potong jaminan', c.potong, this.now, 'Jaminan');
      if (c.kurang > 0) this.addPay(b, 'Pelunasan', c.kurang, this.now, 'Tunai');
      if (b.jaminan) { b.jaminan.status = 'dikembalikan'; b.jaminan.kembali = c.kembali; }
      Object.values(b.kamarDibagi || {}).flat().forEach((no) => { const r = this.db.rooms.find((x) => x.no === no); r.status = 'kotor'; if (!s.kondisi[no].baik) { r.status = 'perbaikan'; r.catatan = s.kondisi[no].ket || 'Kerusakan saat check-out'; } });
      b.status = 'Selesai'; b.checkout = this.now;
      this.log(b, `Check-out. ${c.jaminan ? 'Jaminan dikembalikan ' + this.rp(c.kembali) + '. ' : ''}Kamar ditandai kotor.`); this.notify('Check-in / check-out', b);
      this.toast(`Check-out ${b.kode} selesai — kamar ditandai kotor`, 'door');
      this.a12 = { kode: '', b: null, kondisi: {}, overtime: 0, catatan: '', err: '' }; this.go(`/a4/${b.kode}`);
    },

    // status kamar
    setRoom(r, status, catatan) { r.status = status; r.catatan = catatan || ''; this.close(); this.toast(`Kamar ${r.no} → ${ROOM_STATUS[status].label}`, status === 'perbaikan' ? 'wrench' : status === 'kotor' ? 'broom' : 'check'); },
    roomBooking(no) { return this.db.bookings.find((b) => b.status === 'Berlangsung' && Object.values(b.kamarDibagi || {}).flat().includes(no)); },
    roomCounts() { const c = { siap: 0, terisi: 0, kotor: 0, perbaikan: 0 }; this.db.rooms.forEach((r) => c[r.status]++); return c; },

    // kalender A2
    calDays() { return this.range(this.a2.days).map((k) => this.addDays(this.a2.start, k)); },
    kamarCell(fac, d) {
      const units = this.db.rooms.filter((r) => r.fac === fac).length; const seg = {};
      for (const b of this.db.bookings) { if (!HOLDING.includes(b.status)) continue; for (const i of b.items) if (i.fac === fac && i.start <= d && d < i.end) seg[b.status] = (seg[b.status] || 0) + i.qty; }
      for (const k of this.db.blocks) if (k.fac === fac && k.start <= d && d < k.end) seg['Agenda Internal'] = (seg['Agenda Internal'] || 0) + (k.qty || 0);
      return { units, avail: this.roomAvail(fac, d), seg: Object.entries(seg).map(([s, n]) => ({ s, n })) };
    },
    openBlock(fac, d) { const f = this.fac(fac); this.open('block', { fac, start: d, end: this.addDays(d, 1), qty: f.jenis === 'kamar' ? 5 : null, label: 'Pelatihan internal', err: '' }); },
    saveBlock() {
      const m = this.m; const f = this.fac(m.fac);
      if (!m.label.trim()) return (m.err = 'Isi nama agenda.');
      if (m.end <= m.start) return (m.err = 'Tanggal selesai harus setelah tanggal mulai.');
      for (let d = m.start; d < m.end; d = this.addDays(d, 1)) {
        if (f.jenis === 'kamar') { const av = this.roomAvail(m.fac, d); if (av < m.qty) return (m.err = `Tidak bisa: ${this.tglPanjang(d)} hanya tersisa ${av} kamar. Agenda internal tidak menggeser booking eksternal.`); }
        else if (this.busy(m.fac, d).length) return (m.err = `Tidak bisa: ${f.singkat} sudah terpakai pada ${this.tglPanjang(d)}. Agenda internal tidak menggeser booking eksternal.`);
      }
      this.db.blocks.push({ id: 'blk' + Math.random().toString(36).slice(2, 6), fac: m.fac, start: m.start, end: m.end, qty: f.jenis === 'kamar' ? +m.qty : null, label: m.label });
      this.close(); this.toast(`Agenda internal diblokir: ${f.singkat}, ${this.tgl(m.start)}`, 'lock');
    },
    removeBlock(id) { this.db.blocks = this.db.blocks.filter((k) => k.id !== id); this.close(); this.toast('Blokir agenda internal dihapus', 'trash'); },
    offlineFrom(fac, d) {
      this.resetWiz('offline'); const f = this.fac(fac);
      this.wiz.add = f.jenis === 'kamar' ? { ...this.wiz.add, fac, start: d, end: this.addDays(d, 1), qty: 1, err: '' } : { ...this.wiz.add, fac, date: d, from: '08:00', to: '12:00', err: '' };
      this.close(); location.hash = '/a6';
    },

    // dashboard & laporan
    todayCheckins() { return this.db.bookings.filter((b) => b.status === 'Terkonfirmasi' && this.firstDate(b) === this.todayIso); },
    todayCheckouts() { return this.db.bookings.filter((b) => b.status === 'Berlangsung' && this.lastDate(b) <= this.todayIso); },
    occToday() { const total = this.db.rooms.length; let used = 0; for (const f of this.kamarFacs()) used += this.roomUsed(f.id, this.todayIso); return { used, total, pct: Math.round((used / total) * 100) }; },
    urgent() {
      const out = [];
      for (const b of this.db.bookings) {
        if (['Menunggu Pembayaran', 'Menunggu Verifikasi'].includes(b.status) && b.holdUntil && b.holdUntil - this.now < 3 * HOUR) out.push({ b, icon: 'clock', text: `Hold ${b.status === 'Menunggu Verifikasi' ? 'verifikasi' : 'pembayaran'} habis dalam ${this.sisaWaktu(b.holdUntil)}`, to: b.status === 'Menunggu Verifikasi' ? '/a5' : `/a4/${b.kode}` });
        if (b.status === 'Berlangsung' && this.now > this.checkoutDue(b)) out.push({ b, icon: 'alert', text: `Lewat jam check-out (${this.waktu(this.checkoutDue(b))})`, to: `/a12/${b.kode}` });
      }
      return out;
    },
    pay2ledger() {
      const out = [];
      for (const b of this.db.bookings) {
        const t = this.total(b) || 1; const ls = this.lines(b);
        for (const p of b.payments) if (p.status === 'diterima') out.push({ t: p.tgl, b, p, tipe: p.jenis, nominal: p.nominal, alloc: ls.map((l) => ({ jenis: l.jenis, n: (l.amount / t) * p.nominal })) });
        if (b.refund && b.refund.status === 'ditransfer') out.push({ t: b.refund.tgl, b, tipe: 'Refund', nominal: -b.refund.nominal, alloc: [] });
      }
      return out.sort((a, b) => b.t - a.t);
    },
    periodRange() {
      const p = this.a18.periode; const n = new Date(this.now); let a, z = this.now + DAY;
      if (p === 'bulan') a = new Date(n.getFullYear(), n.getMonth(), 1).getTime();
      else if (p === 'lalu') { a = new Date(n.getFullYear(), n.getMonth() - 1, 1).getTime(); z = new Date(n.getFullYear(), n.getMonth(), 1).getTime(); }
      else if (p === '3bulan') a = new Date(n.getFullYear(), n.getMonth() - 2, 1).getTime();
      else if (p === '6bulan') a = new Date(n.getFullYear(), n.getMonth() - 5, 1).getTime();
      else if (p === 'tahun') a = new Date(n.getFullYear(), 0, 1).getTime();
      else { a = this.a18.dari ? at(this.a18.dari, 0) : 0; z = this.a18.sampai ? at(this.a18.sampai, 0) + DAY : this.now + DAY; }
      return [a, z];
    },
    report() {
      const [a, z] = this.periodRange(); const rows = this.pay2ledger().filter((r) => r.t >= a && r.t < z);
      const sum = (f) => rows.filter(f).reduce((s, r) => s + r.nominal, 0);
      const jenis = {}; for (const j of ['Asrama', 'Gedung & Ruangan', 'Layanan Tambahan', 'Denda']) jenis[j] = { n: 0, trx: 0 };
      for (const r of rows) for (const al of r.alloc) { jenis[al.jenis].n += al.n; jenis[al.jenis].trx++; }
      const bruto = sum((r) => r.nominal > 0); const refund = -sum((r) => r.nominal < 0);
      return { rows, bruto, dp: sum((r) => r.tipe === 'DP'), lunas: sum((r) => ['Lunas', 'Pelunasan', 'Tambahan'].includes(r.tipe)), jaminan: sum((r) => r.tipe === 'Potong jaminan'), denda: Math.round(jenis['Denda'].n), refund, bersih: bruto - refund,
        jenis: Object.entries(jenis).map(([k, v]) => ({ k, n: Math.round(v.n), trx: v.trx })) };
    },
    months() {
      const n = new Date(this.now); return this.range(7).map((k) => { const d = new Date(n.getFullYear(), n.getMonth() - 6 + k, 1); return { y: d.getFullYear(), m: d.getMonth(), label: d.toLocaleDateString('id-ID', { month: 'short' }), a: d.getTime(), z: new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime(), dim: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() }; });
    },
    revenueByMonth() { const L = this.pay2ledger(); return this.months().map((m) => ({ ...m, v: L.filter((r) => r.t >= m.a && r.t < m.z).reduce((s, r) => s + r.nominal, 0) })); },
    occByMonth() {
      return this.months().map((m) => {
        let nights = 0; const a = iso(m.a), z = iso(m.z);
        for (const b of this.db.bookings) { if (!['Selesai', 'Berlangsung', 'Terkonfirmasi'].includes(b.status)) continue; for (const i of b.items) if (i.start) { const s = i.start > a ? i.start : a, e = i.end < z ? i.end : z; if (e > s) nights += i.qty * this.days(s, e); } }
        return { ...m, v: Math.min(100, Math.round((nights / (this.db.rooms.length * m.dim)) * 100)) };
      });
    },
    topFacilities() {
      const c = {}; for (const b of this.db.bookings) { if (!['Selesai', 'Berlangsung', 'Terkonfirmasi'].includes(b.status)) continue; for (const l of this.lines(b)) if (l.jenis !== 'Denda') c[l.label] = (c[l.label] || 0) + l.amount; }
      return Object.entries(c).map(([k, v]) => ({ k, v })).sort((a, b) => b.v - a.v).slice(0, 6);
    },
    statusSummary() { const c = {}; for (const b of this.db.bookings) if (!b._riwayat) c[b.status] = (c[b.status] || 0) + 1; return Object.keys(STATUS).filter((s) => c[s]).map((s) => ({ s, n: c[s] })); },
    maxOf(arr) { return Math.max(1, ...arr.map((x) => x.v)); },
    piutang() { return this.db.bookings.filter((b) => ['Terkonfirmasi', 'Berlangsung', 'Menunggu Pembayaran', 'Menunggu Verifikasi Bayar'].includes(b.status)); },

    // daftar booking A3
    filtered() {
      const f = this.a3; const q = f.cari.trim().toLowerCase();
      return this.sortedBookings().filter((b) => (!f.status || b.status === f.status) && (!f.jenis || this.jenisLabel(b) === f.jenis)
        && (!q || b.kode.toLowerCase().includes(q) || b.nama.toLowerCase().includes(q) || (b.instansi || '').toLowerCase().includes(q))
        && (!f.dari || this.lastDate(b) >= f.dari) && (!f.sampai || this.firstDate(b) <= f.sampai));
    },

    // master data
    saveFacility() {
      const m = this.m; if (!m.nama.trim()) return (m.err = 'Nama fasilitas wajib diisi.');
      if (!(m.tarif > 0)) return (m.err = 'Tarif harus lebih dari 0.');
      const data = { ...m, fasilitas: m.fasilitasTxt.split(',').map((s) => s.trim()).filter(Boolean), tarif: +m.tarif, kapasitas: +m.kapasitas, tarifJam: m.tarifJam ? +m.tarifJam : undefined };
      delete data.err; delete data.fasilitasTxt; delete data.baru;
      if (m.baru) { data.id = 'f' + Math.random().toString(36).slice(2, 6); data.singkat = data.nama.slice(0, 14); this.db.facilities.push(data); }
      else Object.assign(this.fac(m.id), data);
      this.close(); this.toast('Fasilitas disimpan');
    },
    addUnit(fac) { const rs = this.db.rooms.filter((r) => r.fac === fac); const last = rs[rs.length - 1]; const no = last ? last.no.slice(0, -2) + String(+last.no.slice(-2) + 1).padStart(2, '0') : 'C101'; this.db.rooms.push({ no, fac, lantai: last ? last.lantai : 1, status: 'siap', catatan: '' }); this.toast(`Unit ${no} ditambahkan`); },
    saveTarif() { const m = this.m; if (!(m.nominal > 0) || !m.berlaku) return (m.err = 'Isi nominal dan tanggal mulai berlaku.'); this.db.tarif.push({ fac: m.fac, label: this.fac(m.fac).nama, nominal: +m.nominal, satuan: m.satuan, berlaku: m.berlaku, dasar: m.dasar || '—', status: m.berlaku > this.todayIso ? 'Terjadwal' : 'Berlaku' }); this.close(); this.toast('Tarif ditambahkan'); },
    saveAddon() { const m = this.m; if (!m.nama.trim() || !(m.tarif > 0)) return (m.err = 'Isi nama dan tarif.'); const d = { id: m.id || 'ad' + Math.random().toString(36).slice(2, 6), nama: m.nama, tarif: +m.tarif, satuan: m.satuan, stok: m.stok === '' ? null : +m.stok, aktif: m.aktif };
      const ex = this.addon(m.id); if (ex.id) Object.assign(ex, d); else this.db.addons.push(d); this.close(); this.toast('Layanan tambahan disimpan'); },
    saveUser() { const m = this.m; if (!m.nama.trim() || !/^\S+@\S+\.\S+$/.test(m.email)) return (m.err = 'Isi nama dan email yang valid.');
      if (m.id) Object.assign(this.db.users.find((u) => u.id === m.id), { nama: m.nama, email: m.email, peran: m.peran }); else this.db.users.push({ id: Date.now(), nama: m.nama, email: m.email, peran: m.peran, aktif: true, terakhir: null });
      this.close(); this.toast(m.id ? 'Pengguna diperbarui' : 'Pengguna ditambahkan. Undangan dikirim lewat email (simulasi).', m.id ? 'check' : 'mail'); },
    tplPreview(t) { return t.replace('{kode}', 'BPK-261120-17').replace('{nama}', 'Ahmad Fauzi').replace('{total}', 'Rp1.200.000').replace('{batas}', '20 Nov 2026 16.00').replace('{nominal}', 'Rp360.000').replace('{sisa}', 'Rp840.000').replace('{status}', 'Berlangsung').replace('{catatan}', 'mohon lengkapi data'); },
    docNo(fmt, b) { const d = new Date(b.dibuat); return fmt.replace('{tahun}', d.getFullYear()).replace('{bulan}', String(d.getMonth() + 1).padStart(2, '0')).replace('{urut}', b.kode.slice(-2).padStart(4, '0')); },
  };
}
