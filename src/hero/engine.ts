/* ============================================================
   NSS — Cinematic Hero Engine
   "One golden thread, four modes of freight."
   Truck → Train → Plane → Ship, seamless infinite loop.
   Pure canvas 2D, delta-time, DPR-aware, parallax with momentum,
   procedural grain, chapter crossfades with a golden light sweep.
   ============================================================ */

export const CHAPTERS = [
  { mode: 'ROAD FREIGHT', corridor: 'ISLAM QALA → KABUL', coord: '34.657°N 61.068°E' },
  { mode: 'RAIL TRANSIT', corridor: 'HAIRATAN → EUROPE', coord: '37.214°N 67.424°E' },
  { mode: 'AIR CARGO', corridor: 'KABUL → DUBAI', coord: '34.566°N 69.212°E' },
  { mode: 'SEA FREIGHT', corridor: 'BANDAR ABBAS → MERSIN', coord: '27.183°N 56.266°E' },
] as const

/* ---------------- helpers ---------------- */

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
const easeInCubic = (t: number) => t * t * t
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

type RGB = [number, number, number]
function hexRgb(hex: string): RGB {
  if (hex.startsWith('rgb')) {
    const m = hex.match(/\d+/g)!
    return [Number(m[0]), Number(m[1]), Number(m[2])]
  }
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
function mixHex(a: string, b: string, t: number): string {
  const ca = hexRgb(a), cb = hexRgb(b)
  return `rgb(${Math.round(lerp(ca[0], cb[0], t))},${Math.round(lerp(ca[1], cb[1], t))},${Math.round(lerp(ca[2], cb[2], t))})`
}
/** mix two 'rgba(r,g,b,a)' strings (channels + alpha) */
function mixRGBA(a: string, b: string, t: number): string {
  const pa = a.match(/[\d.]+/g)!.map(Number)
  const pb = b.match(/[\d.]+/g)!.map(Number)
  return `rgba(${Math.round(lerp(pa[0], pb[0], t))},${Math.round(lerp(pa[1], pb[1], t))},${Math.round(lerp(pa[2], pb[2], t))},${lerp(pa[3], pb[3], t).toFixed(3)})`
}

function mulberry32(seed: number) {
  let s = seed
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ---------------- chapter look ---------------- */

interface Look {
  sky: [string, string, string, string] // top → horizon
  far: string
  mid: string
  near: string
  starAlpha: number
  orb: { x: number; y: number; r: number; color: string; alpha: number }
}

const LOOKS: Look[] = [
  {
    // ROAD — dusk over the steppe
    sky: ['#241341', '#3d1c55', '#7a3a5c', '#c97a3d'],
    far: '#2e1a48', mid: '#221238', near: '#170c2b',
    starAlpha: 0.25,
    orb: { x: 0.76, y: 0.70, r: 0.11, color: '#e89a4b', alpha: 0.5 },
  },
  {
    // RAIL — deep night crossing
    sky: ['#0a0718', '#150f31', '#241847', '#3a2560'],
    far: '#171033', mid: '#100a26', near: '#0a0618',
    starAlpha: 1,
    orb: { x: 0.82, y: 0.18, r: 0.055, color: '#d8ccf0', alpha: 0.45 },
  },
  {
    // AIR — pre-dawn above the clouds
    sky: ['#121b3d', '#28315f', '#5c4470', '#b06a5c'],
    far: '#2a3560', mid: '#3a4470', near: '#4a5280',
    starAlpha: 0.5,
    orb: { x: 0.34, y: 0.84, r: 0.09, color: '#d88a5c', alpha: 0.3 },
  },
  {
    // SEA — golden hour on the water
    sky: ['#1b1235', '#472552', '#9e4e4e', '#e8a24b'],
    far: '#47265c', mid: '#3a1e4c', near: '#1d1028',
    starAlpha: 0.15,
    orb: { x: 0.66, y: 0.635, r: 0.10, color: '#f0b45a', alpha: 0.85 },
  },
]

/* sunny-day variants — same composition, daylight palette */
const LOOKS_LIGHT: Look[] = [
  {
    // ROAD — morning on the steppe
    sky: ['#4e8acf', '#8abbe4', '#e0d2a2', '#f0ce86'],
    far: '#a897c8', mid: '#7f6aa9', near: '#46336c',
    starAlpha: 0,
    orb: { x: 0.76, y: 0.22, r: 0.085, color: '#fff3cf', alpha: 0.95 },
  },
  {
    // RAIL — clear midday crossing
    sky: ['#4a89c9', '#7cb0de', '#c0dcef', '#e8ecd8'],
    far: '#9a8ac0', mid: '#6f5b9e', near: '#46346e',
    starAlpha: 0,
    orb: { x: 0.82, y: 0.15, r: 0.07, color: '#fff7dd', alpha: 1 },
  },
  {
    // AIR — blue day above the clouds
    sky: ['#4685cc', '#6ba5da', '#aacde8', '#e2edf4'],
    far: '#dfeaf4', mid: '#c6daec', near: '#a8c4de',
    starAlpha: 0,
    orb: { x: 0.3, y: 0.17, r: 0.075, color: '#fff5d6', alpha: 0.9 },
  },
  {
    // SEA — sparkling day on the water
    sky: ['#5594cf', '#84b4df', '#d0e2e8', '#f4dda4'],
    far: '#6f9dc6', mid: '#4f80b0', near: '#2f5f8e',
    starAlpha: 0,
    orb: { x: 0.66, y: 0.18, r: 0.08, color: '#fff3cf', alpha: 0.95 },
  },
]

const GOLD = '#e8c268'
const GOLD_DEEP = '#c9a24b'
const CREAM = '#f5e7c6'
const BODY = '#3a2366'
const BODY_HI = '#4e3188'
const BODY_LO = '#241646'
const GLASS = '#f0e2b8'

const CH = 5.6          // seconds per chapter
const XF = 0.16         // crossfade fraction at chapter end
const N = 4

/* ---------------- particles ---------------- */

const P_DUST = 0, P_SMOKE = 1, P_SPARK = 2, P_FOAM = 3
interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; grow: number; kind: number }

interface TrailPt { x: number; y: number; t: number }

export class HeroEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private W = 0
  private H = 0
  private dpr = 1
  private S = 1 // scale unit (design height 760)

  private raf = 0
  private last = 0
  private gt = 0
  private running = false
  private visible = true
  private inView = true
  private reduced = false

  private mx = 0; my = 0; tx = 0; ty = 0 // mouse parallax w/ momentum
  private lastChapter = -1

  // day/night theme blending (0 = dark, 1 = sunny)
  private themeTarget = 0
  private lookMix = 0

  private onChapter?: (i: number) => void
  onTick?: (chapter: number, ct: number) => void

  // pre-generated geometry
  private ridgeFar: { x: number; y: number }[] = []
  private ridgeMid: { x: number; y: number }[] = []
  private stars: { x: number; y: number; r: number; ph: number; f: number }[] = []
  private clouds: { x: number; y: number; w: number; h: number; layer: number }[] = []
  private grain: HTMLCanvasElement | null = null
  private grainPat: CanvasPattern | null = null
  private logo: HTMLImageElement
  private particles: Particle[] = []
  private trailA: TrailPt[] = []
  private trailB: TrailPt[] = []
  private scroll = 0 // road/rail scroll accumulator
  private smokeAcc = 0
  private foamAcc = 0
  private wakeAcc = 0

  private io: IntersectionObserver | null = null
  private onResize = () => this.resize()
  private onVis = () => { this.visible = document.visibilityState === 'visible'; this.gate() }
  private onPointer = (e: PointerEvent) => {
    this.tx = (e.clientX / window.innerWidth) * 2 - 1
    this.ty = (e.clientY / window.innerHeight) * 2 - 1
  }

  constructor(canvas: HTMLCanvasElement, opts?: { onChapter?: (i: number) => void }) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('no 2d context')
    this.ctx = ctx
    this.onChapter = opts?.onChapter
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    this.logo = new Image()
    this.logo.src = `${import.meta.env.BASE_URL}logo.png`

    window.addEventListener('resize', this.onResize)
    document.addEventListener('visibilitychange', this.onVis)
    window.addEventListener('pointermove', this.onPointer, { passive: true })
    this.io = new IntersectionObserver((es) => {
      this.inView = es[0]?.isIntersecting ?? true
      this.gate()
    })
    this.io.observe(canvas)

    this.resize()
    this.buildGrain()

    if (this.reduced) {
      this.gt = CH * 0.55
      this.render(0)
    } else {
      this.start()
    }
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.onResize)
    document.removeEventListener('visibilitychange', this.onVis)
    window.removeEventListener('pointermove', this.onPointer)
    this.io?.disconnect()
  }

  jumpTo(i: number) {
    this.gt = ((i % N) + N) % N * CH + 0.001
    this.lastChapter = -1
    this.particles.length = 0
    this.trailA.length = 0
    this.trailB.length = 0
  }

  /** switch between the dark cinematic look and the sunny-day look */
  setTheme(theme: 'dark' | 'light') {
    this.themeTarget = theme === 'light' ? 1 : 0
    if (this.reduced) this.lookMix = this.themeTarget
  }

  /** effective look for a chapter, blended between dark and light sets */
  private mixedLook(i: number): Look {
    const m = this.lookMix
    if (m <= 0.001) return LOOKS[i]
    if (m >= 0.999) return LOOKS_LIGHT[i]
    const A = LOOKS[i], B = LOOKS_LIGHT[i]
    return {
      sky: [
        mixHex(A.sky[0], B.sky[0], m),
        mixHex(A.sky[1], B.sky[1], m),
        mixHex(A.sky[2], B.sky[2], m),
        mixHex(A.sky[3], B.sky[3], m),
      ],
      far: mixHex(A.far, B.far, m),
      mid: mixHex(A.mid, B.mid, m),
      near: mixHex(A.near, B.near, m),
      starAlpha: lerp(A.starAlpha, B.starAlpha, m),
      orb: {
        x: lerp(A.orb.x, B.orb.x, m),
        y: lerp(A.orb.y, B.orb.y, m),
        r: lerp(A.orb.r, B.orb.r, m),
        color: mixHex(A.orb.color, B.orb.color, m),
        alpha: lerp(A.orb.alpha, B.orb.alpha, m),
      },
    }
  }

  /** blend a dark-theme prop color with its light-theme variant */
  private themed(dark: string, light: string): string {
    return this.lookMix <= 0.001 ? dark : mixHex(dark, light, this.lookMix)
  }

  private gate() {
    if (this.visible && this.inView && !this.reduced) this.start()
    else this.stop()
  }
  private start() {
    if (this.running) return
    this.running = true
    this.last = performance.now()
    const loop = (now: number) => {
      if (!this.running) return
      const dt = clamp((now - this.last) / 1000, 0, 0.05)
      this.last = now
      this.gt += dt
      this.render(dt)
      this.raf = requestAnimationFrame(loop)
    }
    this.raf = requestAnimationFrame(loop)
  }
  private stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  /* ---------------- world build ---------------- */

  private resize() {
    const r = this.canvas.getBoundingClientRect()
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.W = Math.max(320, r.width)
    this.H = Math.max(320, r.height)
    this.canvas.width = Math.round(this.W * this.dpr)
    this.canvas.height = Math.round(this.H * this.dpr)
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.S = this.H / 760

    // mountain ridges (seeded, stable across resizes)
    const rng = mulberry32(2007)
    const mk = (base: number, amp: number, step: number) => {
      const pts: { x: number; y: number }[] = []
      let y = base
      for (let x = -80; x <= this.W + 80; x += step) {
        y = clamp(y + (rng() - 0.5) * amp, base - amp * 0.9, base + amp * 0.9)
        pts.push({ x, y })
      }
      return pts
    }
    this.ridgeFar = mk(this.H * 0.60, this.H * 0.10, this.W / 26)
    this.ridgeMid = mk(this.H * 0.68, this.H * 0.07, this.W / 18)

    const rngS = mulberry32(891952)
    this.stars = Array.from({ length: 110 }, () => ({
      x: rngS() * this.W, y: rngS() * this.H * 0.55,
      r: 0.5 + rngS() * 1.4, ph: rngS() * Math.PI * 2, f: 0.6 + rngS() * 1.8,
    }))

    const rngC = mulberry32(1548)
    this.clouds = []
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < 6; i++) {
        this.clouds.push({
          x: rngC() * this.W,
          y: this.H * (0.58 + layer * 0.11) + (rngC() - 0.5) * 36,
          w: 150 + rngC() * 220 + layer * 90,
          h: 20 + rngC() * 16 + layer * 6,
          layer,
        })
      }
    }

    if (this.grain) this.grainPat = this.ctx.createPattern(this.grain, 'repeat')
  }

  private buildGrain() {
    const g = document.createElement('canvas')
    g.width = g.height = 128
    const gc = g.getContext('2d')
    if (!gc) return
    const img = gc.createImageData(128, 128)
    const rng = mulberry32(42)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.floor(rng() * 255)
      img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255
    }
    gc.putImageData(img, 0, 0)
    this.grain = g
    this.grainPat = this.ctx.createPattern(g, 'repeat')
  }

  /* ---------------- frame ---------------- */

  private render(dt: number) {
    const { ctx, W, H } = this
    const ci = Math.floor(this.gt / CH) % N
    const ct = (this.gt % CH) / CH
    const inX = ct > 1 - XF
    const xf = inX ? easeInOut((ct - (1 - XF)) / XF) : 0
    const ni = (ci + 1) % N

    if (ci !== this.lastChapter) {
      this.lastChapter = ci
      this.onChapter?.(ci)
    }
    this.onTick?.(ci, ct)

    // mouse momentum
    this.mx += (this.tx - this.mx) * 0.03
    this.my += (this.ty - this.my) * 0.03

    // theme crossfade (~0.8s ease toward target)
    this.lookMix += (this.themeTarget - this.lookMix) * Math.min(1, dt * 2.5)
    if (Math.abs(this.themeTarget - this.lookMix) < 0.001) this.lookMix = this.themeTarget

    // scroll speed: fast during enter/exit, cruise otherwise
    const ph = this.phase(ct)
    this.scroll += dt * 460 * ph * this.S

    const A = this.mixedLook(ci), B = this.mixedLook(ni)

    // 1 — sky
    const sky = ctx.createLinearGradient(0, 0, 0, H)
    for (let i = 0; i < 4; i++) {
      sky.addColorStop(i / 3, inX ? mixHex(A.sky[i], B.sky[i], xf) : A.sky[i])
    }
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, W, H)

    // 2 — stars
    const starA = lerp(A.starAlpha, B.starAlpha, xf)
    if (starA > 0.02) this.drawStars(starA)

    // 3 — celestial orb
    this.drawOrb(A, B, xf)

    // 4 — layered world + vehicle per chapter (crossfade)
    ctx.save()
    if (inX) {
      ctx.globalAlpha = 1 - xf * 0.85
      this.drawChapter(ci, ct, dt, -xf * W * 0.12)
      ctx.globalAlpha = clamp(xf * 1.35, 0, 1)
      this.drawChapter(ni, 0.001, dt, (1 - xf) * W * 0.12)
    } else {
      this.drawChapter(ci, ct, dt, 0)
    }
    ctx.restore()

    // 5 — golden light sweep at chapter change
    if (inX && !this.reduced) {
      const sx = easeInOut(xf) * (W * 1.4) - W * 0.2
      const g = ctx.createLinearGradient(sx - W * 0.14, 0, sx + W * 0.14, 0)
      g.addColorStop(0, 'rgba(232,194,104,0)')
      g.addColorStop(0.5, 'rgba(232,194,104,0.14)')
      g.addColorStop(1, 'rgba(232,194,104,0)')
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
      ctx.restore()
    }

    // 6 — particles
    this.drawParticles(dt)

    // 7 — vignette + grain
    const v = ctx.createRadialGradient(W / 2, H * 0.55, H * 0.35, W / 2, H * 0.55, H * 0.95)
    v.addColorStop(0, 'rgba(6,4,16,0)')
    v.addColorStop(1, mixRGBA('rgba(6,4,16,0.5)', 'rgba(20,14,44,0.22)', this.lookMix))
    ctx.fillStyle = v
    ctx.fillRect(0, 0, W, H)

    if (this.grainPat) {
      ctx.save()
      ctx.globalAlpha = 0.05
      ctx.globalCompositeOperation = 'overlay'
      ctx.translate(-((Math.random() * 128) | 0), -((Math.random() * 128) | 0))
      ctx.fillStyle = this.grainPat
      ctx.fillRect(0, 0, W + 128, H + 128)
      ctx.restore()
    }
  }

  private phase(ct: number) {
    if (ct < 0.16) return lerp(1.6, 1, easeOutExpo(ct / 0.16))
    if (ct > 0.84) return lerp(1, 1.7, easeInCubic((ct - 0.84) / 0.16))
    return 1
  }

  private vehX(ct: number, cruise: number) {
    const { W } = this
    if (ct < 0.16) return lerp(-0.4 * W, cruise, easeOutExpo(ct / 0.16))
    if (ct > 0.84) return lerp(cruise, 1.4 * W, easeInCubic((ct - 0.84) / 0.16))
    return cruise
  }

  /* ---------------- sky bits ---------------- */

  private drawStars(alpha: number) {
    const { ctx, gt } = this
    ctx.save()
    for (const s of this.stars) {
      const tw = 0.55 + 0.45 * Math.sin(gt * s.f + s.ph)
      ctx.globalAlpha = alpha * tw * 0.9
      ctx.fillStyle = '#efe6ff'
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }

  private drawOrb(A: Look, B: Look, xf: number) {
    const { ctx, W, H } = this
    const x = lerp(A.orb.x, B.orb.x, xf) * W
    const y = lerp(A.orb.y, B.orb.y, xf) * H
    const r = lerp(A.orb.r, B.orb.r, xf) * H
    const alpha = lerp(A.orb.alpha, B.orb.alpha, xf)
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2)
    const col = xf > 0 ? mixHex(A.orb.color, B.orb.color, xf) : A.orb.color
    glow.addColorStop(0, col)
    glow.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.globalAlpha = alpha * 0.5
    ctx.fillStyle = glow
    ctx.fillRect(x - r * 3.2, y - r * 3.2, r * 6.4, r * 6.4)
    ctx.globalAlpha = alpha
    ctx.fillStyle = col
    ctx.beginPath()
    ctx.arc(x, y, r * 0.55, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  /* ---------------- chapters ---------------- */

  private drawChapter(i: number, ct: number, dt: number, slideX: number) {
    switch (i) {
      case 0: this.drawRoad(ct, dt, slideX); break
      case 1: this.drawRail(ct, dt, slideX); break
      case 2: this.drawAir(ct, dt, slideX); break
      case 3: this.drawSea(ct, dt, slideX); break
    }
  }

  private ridge(pts: { x: number; y: number }[], color: string, depth: number, slideX: number) {
    const { ctx, W, H, mx, my } = this
    ctx.save()
    ctx.translate(mx * depth * 26 + slideX * depth, my * depth * 10)
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(-100, H + 100)
    for (const p of pts) ctx.lineTo(p.x, p.y)
    ctx.lineTo(W + 100, H + 100)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  private drawLogo(cx: number, cy: number, h: number, alpha = 1) {
    const { ctx, logo } = this
    if (!logo.complete || !logo.naturalWidth) return
    const w = h * (logo.naturalWidth / logo.naturalHeight)
    ctx.save()
    ctx.globalAlpha *= alpha
    ctx.drawImage(logo, cx - w / 2, cy - h / 2, w, h)
    ctx.restore()
  }

  /* ---- chapter 0: ROAD ---- */

  private drawRoad(ct: number, _dt: number, slideX: number) {
    const { ctx, W, H, S, gt, mx, scroll } = this
    const look = this.mixedLook(0)
    const roadY = H * 0.80

    this.ridge(this.ridgeFar, look.far, 0.25, slideX)
    this.ridge(this.ridgeMid, look.mid, 0.5, slideX)

    // ground + road band
    ctx.save()
    ctx.translate(mx * 14 + slideX, 0)
    ctx.fillStyle = look.near
    ctx.fillRect(-80, roadY, W + 160, H - roadY + 80)
    ctx.fillStyle = this.themed('#0e0820', '#3f3554')
    ctx.fillRect(-80, roadY + 10 * S, W + 160, H * 0.12)

    // golden thread — scrolling center dashes
    const dy = roadY + 10 * S + H * 0.06
    ctx.save()
    ctx.shadowColor = GOLD
    ctx.shadowBlur = 8
    ctx.fillStyle = GOLD
    const dash = 46 * S, gap = 34 * S, span = dash + gap
    const off = scroll % span
    for (let x = -span; x < W + span; x += span) {
      ctx.globalAlpha = 0.85
      ctx.fillRect(x - off, dy, dash, 3.4 * S)
    }
    ctx.restore()

    // mile markers (near parallax)
    ctx.fillStyle = look.mid
    const mSpan = 340 * S
    const mOff = (scroll * 1.5) % mSpan
    for (let x = -mSpan; x < W + mSpan; x += mSpan) {
      ctx.fillRect(x - mOff, roadY - 26 * S, 5 * S, 26 * S)
    }
    ctx.restore()

    // truck
    const x = this.vehX(ct, W * 0.44) + slideX * 1.2 + mx * 20
    const bob = Math.sin(gt * 9) * 1.4 * S
    const y = dy - 4 * S + bob
    this.drawTruck(x, y, 1)

    // dust motes
    if (!this.reduced && Math.random() < 0.25) {
      this.spawn(P_DUST, x - 150 * S + Math.random() * 60 * S, y - 8 * S, -30 - Math.random() * 30, -8 - Math.random() * 14, 1.6, 2.2 * S, 1.4)
    }
  }

  private drawTruck(x: number, groundY: number, alpha: number) {
    const { ctx, S, scroll } = this
    ctx.save()
    ctx.globalAlpha *= alpha
    ctx.translate(x, groundY)

    // ground shadow
    ctx.fillStyle = 'rgba(4,2,12,0.45)'
    ctx.beginPath()
    ctx.ellipse(0, 4 * S, 190 * S, 9 * S, 0, 0, Math.PI * 2)
    ctx.fill()

    const u = S
    // trailer
    ctx.fillStyle = BODY
    ctx.beginPath()
    ctx.roundRect(-196 * u, -120 * u, 208 * u, 92 * u, 5 * u)
    ctx.fill()
    // facet highlight
    ctx.fillStyle = BODY_HI
    ctx.globalAlpha *= 0.55
    ctx.beginPath()
    ctx.moveTo(-196 * u, -120 * u)
    ctx.lineTo(-60 * u, -120 * u)
    ctx.lineTo(-150 * u, -28 * u)
    ctx.lineTo(-196 * u, -28 * u)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha /= 0.55
    // gold skirt line
    ctx.fillStyle = GOLD_DEEP
    ctx.fillRect(-196 * u, -34 * u, 208 * u, 3.2 * u)
    // dove
    this.drawLogo(-92 * u, -76 * u, 56 * u, 0.95)

    // cab
    ctx.fillStyle = BODY_LO
    ctx.beginPath()
    ctx.moveTo(14 * u, -28 * u)
    ctx.lineTo(14 * u, -104 * u)
    ctx.lineTo(52 * u, -104 * u)
    ctx.lineTo(84 * u, -72 * u)
    ctx.lineTo(88 * u, -28 * u)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = BODY
    ctx.fillRect(14 * u, -40 * u, 74 * u, 12 * u)
    // glass
    ctx.fillStyle = GLASS
    ctx.globalAlpha *= 0.9
    ctx.beginPath()
    ctx.moveTo(48 * u, -98 * u)
    ctx.lineTo(72 * u, -72 * u)
    ctx.lineTo(48 * u, -72 * u)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha /= 0.9
    // gold trim
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2.4 * u
    ctx.beginPath()
    ctx.moveTo(14 * u, -104 * u)
    ctx.lineTo(52 * u, -104 * u)
    ctx.lineTo(84 * u, -72 * u)
    ctx.stroke()
    // exhaust stack
    ctx.fillStyle = BODY_LO
    ctx.fillRect(6 * u, -112 * u, 6 * u, 30 * u)

    // wheels
    const wr = 17 * u
    const rot = scroll / wr
    const wheel = (wx: number) => {
      ctx.fillStyle = '#0a0616'
      ctx.beginPath(); ctx.arc(wx, -wr, wr, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = GOLD_DEEP
      ctx.lineWidth = 2 * u
      ctx.beginPath(); ctx.arc(wx, -wr, wr * 0.55, 0, Math.PI * 2); ctx.stroke()
      ctx.strokeStyle = 'rgba(232,194,104,0.75)'
      ctx.lineWidth = 1.6 * u
      for (let i = 0; i < 5; i++) {
        const a = rot + (i * Math.PI * 2) / 5
        ctx.beginPath()
        ctx.moveTo(wx, -wr)
        ctx.lineTo(wx + Math.cos(a) * wr * 0.5, -wr + Math.sin(a) * wr * 0.5)
        ctx.stroke()
      }
    }
    wheel(52 * u); wheel(-160 * u); wheel(-116 * u)

    // headlight cone
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    const hg = ctx.createLinearGradient(88 * u, -34 * u, 300 * u, -10 * u)
    hg.addColorStop(0, 'rgba(232,194,104,0.35)')
    hg.addColorStop(1, 'rgba(232,194,104,0)')
    ctx.fillStyle = hg
    ctx.beginPath()
    ctx.moveTo(88 * u, -40 * u)
    ctx.lineTo(310 * u, -72 * u)
    ctx.lineTo(310 * u, 6 * u)
    ctx.lineTo(88 * u, -24 * u)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = 'rgba(245,231,198,0.9)'
    ctx.beginPath(); ctx.arc(86 * u, -34 * u, 3.4 * u, 0, Math.PI * 2); ctx.fill()
    ctx.restore()

    ctx.restore()
  }

  /* ---- chapter 1: RAIL ---- */

  private drawRail(ct: number, dt: number, slideX: number) {
    const { ctx, W, H, S, gt, mx, scroll } = this
    const look = this.mixedLook(1)
    const railY = H * 0.78

    this.ridge(this.ridgeFar, look.far, 0.25, slideX)
    this.ridge(this.ridgeMid, look.mid, 0.5, slideX)

    // bridge deck + piers
    ctx.save()
    ctx.translate(mx * 14 + slideX, 0)
    ctx.fillStyle = look.near
    ctx.fillRect(-80, railY + 8 * S, W + 160, H - railY)
    const pierW = 34 * S, pierSpan = 300 * S
    const pOff = (scroll * 0.9) % pierSpan
    ctx.fillStyle = this.themed('#0c0720', '#453a5e')
    for (let x = -pierSpan; x < W + pierSpan; x += pierSpan) {
      ctx.beginPath()
      ctx.moveTo(x - pOff, railY + 8 * S)
      ctx.lineTo(x - pOff + pierW, railY + 8 * S)
      ctx.lineTo(x - pOff + pierW * 0.72, H)
      ctx.lineTo(x - pOff + pierW * 0.28, H)
      ctx.closePath()
      ctx.fill()
    }

    // sleepers (the golden thread, rail style)
    ctx.fillStyle = 'rgba(201,162,75,0.5)'
    const slSpan = 34 * S
    const slOff = scroll % slSpan
    for (let x = -slSpan; x < W + slSpan; x += slSpan) {
      ctx.fillRect(x - slOff, railY + 2 * S, 4 * S, 12 * S)
    }
    // rails with gold glow
    ctx.save()
    ctx.shadowColor = GOLD
    ctx.shadowBlur = 6
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2.2 * S
    ctx.globalAlpha = 0.9
    ctx.beginPath(); ctx.moveTo(-80, railY); ctx.lineTo(W + 80, railY); ctx.stroke()
    ctx.restore()
    ctx.strokeStyle = 'rgba(232,194,104,0.4)'
    ctx.lineWidth = 1.6 * S
    ctx.beginPath(); ctx.moveTo(-80, railY + 6 * S); ctx.lineTo(W + 80, railY + 6 * S); ctx.stroke()

    // telegraph poles (fast near layer)
    ctx.strokeStyle = this.themed('#0e0922', '#4a3e66')
    ctx.lineWidth = 5 * S
    const tpSpan = 420 * S
    const tpOff = (scroll * 1.35) % tpSpan
    for (let x = -tpSpan; x < W + tpSpan; x += tpSpan) {
      const px = x - tpOff
      ctx.beginPath(); ctx.moveTo(px, railY - 90 * S); ctx.lineTo(px, railY); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(px - 16 * S, railY - 84 * S); ctx.lineTo(px + 16 * S, railY - 84 * S); ctx.stroke()
    }
    ctx.restore()

    // train
    const x = this.vehX(ct, W * 0.54) + slideX * 1.2 + mx * 20
    const y = railY - 2 * S
    this.drawTrain(x, y, ct, dt)

    // catenary wires above (subtle)
    ctx.save()
    ctx.strokeStyle = 'rgba(232,194,104,0.14)'
    ctx.lineWidth = 1.2 * S
    ctx.beginPath()
    ctx.moveTo(0, railY - 150 * S + mx * 6)
    ctx.quadraticCurveTo(W / 2, railY - 132 * S + mx * 6, W, railY - 150 * S + mx * 6)
    ctx.stroke()
    ctx.restore()
    void gt
  }

  private drawTrain(x: number, railY: number, ct: number, dt: number) {
    const { ctx, S, scroll } = this
    ctx.save()
    ctx.translate(x, railY)
    const u = S
    const bob = (p: number) => Math.sin(this.gt * 11 + p) * 0.8 * u

    // ground shadow
    ctx.fillStyle = 'rgba(3,2,10,0.5)'
    ctx.beginPath()
    ctx.ellipse(-140 * u, 4 * u, 320 * u, 8 * u, 0, 0, Math.PI * 2)
    ctx.fill()

    const wr = 13 * u
    const rot = scroll / wr
    const wheel = (wx: number, wy: number, r: number) => {
      ctx.fillStyle = '#080512'
      ctx.beginPath(); ctx.arc(wx, wy, r, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = GOLD_DEEP
      ctx.lineWidth = 1.8 * u
      ctx.beginPath(); ctx.arc(wx, wy, r * 0.5, 0, Math.PI * 2); ctx.stroke()
      ctx.strokeStyle = 'rgba(232,194,104,0.6)'
      ctx.lineWidth = 1.3 * u
      for (let i = 0; i < 4; i++) {
        const a = rot + (i * Math.PI) / 2
        ctx.beginPath()
        ctx.moveTo(wx, wy)
        ctx.lineTo(wx + Math.cos(a) * r * 0.46, wy + Math.sin(a) * r * 0.46)
        ctx.stroke()
      }
    }

    // wagons (behind loco, drawn first)
    const wagon = (ox: number, kind: number, phase: number) => {
      ctx.save()
      ctx.translate(ox, bob(phase))
      ctx.fillStyle = kind === 2 ? BODY_LO : BODY
      if (kind === 2) {
        // tank wagon
        ctx.beginPath()
        ctx.roundRect(-62 * u, -58 * u, 124 * u, 40 * u, 20 * u)
        ctx.fill()
        ctx.fillStyle = BODY_HI
        ctx.globalAlpha *= 0.5
        ctx.fillRect(-62 * u, -58 * u, 124 * u, 10 * u)
        ctx.globalAlpha /= 0.5
      } else {
        ctx.beginPath()
        ctx.roundRect(-62 * u, -64 * u, 124 * u, 46 * u, 3 * u)
        ctx.fill()
        if (kind === 1) {
          // covered — arched roof
          ctx.fillStyle = BODY_HI
          ctx.beginPath()
          ctx.roundRect(-62 * u, -72 * u, 124 * u, 12 * u, 6 * u)
          ctx.fill()
        } else {
          // box — rib lines
          ctx.strokeStyle = 'rgba(10,6,22,0.6)'
          ctx.lineWidth = 2 * u
          for (let rx = -44; rx <= 44; rx += 22) {
            ctx.beginPath(); ctx.moveTo(rx * u, -64 * u); ctx.lineTo(rx * u, -18 * u); ctx.stroke()
          }
        }
      }
      // gold line + dove
      ctx.fillStyle = GOLD_DEEP
      ctx.fillRect(-62 * u, -24 * u, 124 * u, 2.6 * u)
      this.drawLogo(0, kind === 2 ? -38 * u : -44 * u, 30 * u, 0.9)
      // wheels
      wheel(-38 * u, -wr, wr); wheel(38 * u, -wr, wr)
      ctx.restore()
      // coupler
      ctx.fillStyle = '#0a0616'
      ctx.fillRect(ox + 62 * u, -12 * u, 12 * u, 5 * u)
    }
    wagon(-186 * u, 0, 0.7)
    wagon(-324 * u, 1, 1.9)
    wagon(-462 * u, 2, 3.1)

    // locomotive
    ctx.save()
    ctx.translate(0, bob(0))
    ctx.fillStyle = BODY
    ctx.beginPath()
    ctx.moveTo(-120 * u, -18 * u)
    ctx.lineTo(-120 * u, -78 * u)
    ctx.lineTo(-30 * u, -78 * u)
    ctx.lineTo(-30 * u, -96 * u)   // cab rise
    ctx.lineTo(30 * u, -96 * u)
    ctx.lineTo(30 * u, -78 * u)
    ctx.lineTo(96 * u, -72 * u)
    ctx.lineTo(118 * u, -46 * u)   // nose slope
    ctx.lineTo(118 * u, -18 * u)
    ctx.closePath()
    ctx.fill()
    // facet
    ctx.fillStyle = BODY_HI
    ctx.globalAlpha *= 0.5
    ctx.beginPath()
    ctx.moveTo(-120 * u, -78 * u)
    ctx.lineTo(-30 * u, -78 * u)
    ctx.lineTo(-90 * u, -18 * u)
    ctx.lineTo(-120 * u, -18 * u)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha /= 0.5
    // cab window
    ctx.fillStyle = GLASS
    ctx.fillRect(-20 * u, -88 * u, 40 * u, 16 * u)
    // gold stripes
    ctx.fillStyle = GOLD
    ctx.fillRect(-120 * u, -30 * u, 238 * u, 3 * u)
    ctx.fillStyle = GOLD_DEEP
    ctx.fillRect(-120 * u, -22 * u, 238 * u, 2 * u)
    // dove + stack
    this.drawLogo(-70 * u, -52 * u, 34 * u, 0.95)
    ctx.fillStyle = BODY_LO
    ctx.fillRect(86 * u, -84 * u, 10 * u, 14 * u)
    // wheels: 2 bogies × 2
    wheel(-88 * u, -wr, wr); wheel(-52 * u, -wr, wr)
    wheel(48 * u, -wr, wr); wheel(88 * u, -wr, wr)
    // headlight beam
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    const hg = ctx.createLinearGradient(118 * u, -40 * u, 420 * u, -20 * u)
    hg.addColorStop(0, 'rgba(232,194,104,0.30)')
    hg.addColorStop(1, 'rgba(232,194,104,0)')
    ctx.fillStyle = hg
    ctx.beginPath()
    ctx.moveTo(118 * u, -48 * u)
    ctx.lineTo(430 * u, -86 * u)
    ctx.lineTo(430 * u, 0)
    ctx.lineTo(118 * u, -28 * u)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = 'rgba(245,231,198,0.95)'
    ctx.beginPath(); ctx.arc(116 * u, -40 * u, 3.6 * u, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
    ctx.restore()

    // smoke from stack
    if (!this.reduced) {
      this.smokeAcc += dt
      const rate = ct > 0.02 && ct < 0.86 ? 0.05 : 0.12
      while (this.smokeAcc > rate) {
        this.smokeAcc -= rate
        this.spawn(P_SMOKE, x + 91 * u, railY - 86 * u, -26 - Math.random() * 22, -34 - Math.random() * 20, 1.5 + Math.random(), 4 * u, 9 * u)
      }
    }
    ctx.restore()
  }

  /* ---- chapter 2: AIR ---- */

  private drawAir(ct: number, dt: number, slideX: number) {
    const { ctx, W, H, S, gt, mx, my } = this
    const look = this.mixedLook(2)

    // cloud deck — wide soft stratus bands at 3 depths
    for (let layer = 0; layer < 3; layer++) {
      const depth = 0.3 + layer * 0.3
      ctx.save()
      ctx.translate(mx * depth * 30 + slideX * depth, my * depth * 12)
      const col = [look.far, look.mid, look.near][layer]
      ctx.fillStyle = col
      for (const c of this.clouds) {
        if (c.layer !== layer) continue
        const drift = (gt * (5 + layer * 4)) % (W + 700)
        let cx = c.x + drift
        if (cx > W + 350) cx -= W + 700
        ctx.globalAlpha = 0.30 + layer * 0.13
        ctx.beginPath()
        ctx.ellipse(cx, c.y, c.w * this.S, c.h * this.S, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    // golden thread — contrail dashes across the sky
    const threadY = H * 0.72
    ctx.save()
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2 * S
    ctx.shadowColor = GOLD
    ctx.shadowBlur = 6
    ctx.setLineDash([26 * S, 20 * S])
    ctx.lineDashOffset = -gt * 60 * S
    ctx.globalAlpha = 0.4
    ctx.beginPath()
    for (let x = -20; x <= W + 20; x += 24) {
      const y = threadY + Math.sin(x * 0.006 + gt * 0.8) * 12 * S
      if (x === -20) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.restore()

    // plane — cruises low over the cloud deck, right of the copy
    const enterY = lerp(H * 0.74, H * 0.64, easeOutExpo(clamp(ct / 0.3, 0, 1)))
    const exitLift = ct > 0.84 ? easeInCubic((ct - 0.84) / 0.16) * H * 0.16 : 0
    const x = this.vehX(ct, W * 0.66) + slideX * 1.2 + mx * 24
    const y = enterY - exitLift + Math.sin(gt * 2.2) * 4 * S
    const pitch = lerp(-0.14, -0.04, easeOutExpo(clamp(ct / 0.35, 0, 1))) + (ct > 0.84 ? -0.1 * easeInCubic((ct - 0.84) / 0.16) : 0)
    this.drawPlane(x, y, pitch, ct > 0.1 ? dt : 0, 0.85)
  }

  private drawPlane(x: number, y: number, pitch: number, dt: number, scale = 1) {
    const { ctx, S, gt } = this
    const u = S * scale

    // record contrail points at engine positions
    if (!this.reduced && dt > 0) {
      const c = Math.cos(pitch), s = Math.sin(pitch)
      const ex1 = x + (-30 * u) * c - (16 * u) * s
      const ey1 = y + (-30 * u) * s + (16 * u) * c
      this.trailA.push({ x: ex1, y: ey1, t: gt })
      this.trailB.push({ x: ex1 - 6 * u * s, y: ey1 + 10 * u * c, t: gt })
      while (this.trailA.length && gt - this.trailA[0].t > 3.4) this.trailA.shift()
      while (this.trailB.length && gt - this.trailB[0].t > 3.4) this.trailB.shift()
    }
    // draw contrails (age → wider + fainter)
    for (const tr of [this.trailA, this.trailB]) {
      for (let i = 1; i < tr.length; i++) {
        const p0 = tr[i - 1], p1 = tr[i]
        const age = (gt - p1.t) / 3.4
        ctx.strokeStyle = `rgba(232,194,104,${(1 - age) * 0.32})`
        ctx.lineWidth = lerp(1.5, 9, age) * u
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.stroke()
      }
    }

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(pitch)

    // far wing (behind fuselage)
    ctx.fillStyle = BODY_LO
    ctx.beginPath()
    ctx.moveTo(-20 * u, 2 * u)
    ctx.lineTo(-86 * u, 34 * u)
    ctx.lineTo(-64 * u, 6 * u)
    ctx.closePath()
    ctx.fill()

    // fuselage
    ctx.fillStyle = BODY
    ctx.beginPath()
    ctx.moveTo(-150 * u, -4 * u)
    ctx.quadraticCurveTo(-150 * u, -16 * u, -120 * u, -17 * u)
    ctx.lineTo(100 * u, -15 * u)
    ctx.quadraticCurveTo(150 * u, -12 * u, 156 * u, -2 * u)
    ctx.quadraticCurveTo(150 * u, 8 * u, 100 * u, 12 * u)
    ctx.lineTo(-120 * u, 13 * u)
    ctx.quadraticCurveTo(-150 * u, 10 * u, -150 * u, -4 * u)
    ctx.closePath()
    ctx.fill()
    // facet highlight
    ctx.fillStyle = BODY_HI
    ctx.globalAlpha *= 0.55
    ctx.beginPath()
    ctx.moveTo(-140 * u, -12 * u)
    ctx.lineTo(90 * u, -13 * u)
    ctx.lineTo(30 * u, 2 * u)
    ctx.lineTo(-140 * u, 2 * u)
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha /= 0.55
    // gold cheatline
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2.2 * u
    ctx.beginPath()
    ctx.moveTo(-146 * u, 2 * u)
    ctx.quadraticCurveTo(0, 8 * u, 152 * u, -2 * u)
    ctx.stroke()

    // tail fin with dove
    ctx.fillStyle = BODY_LO
    ctx.beginPath()
    ctx.moveTo(-136 * u, -12 * u)
    ctx.lineTo(-168 * u, -58 * u)
    ctx.lineTo(-146 * u, -58 * u)
    ctx.lineTo(-116 * u, -14 * u)
    ctx.closePath()
    ctx.fill()
    this.drawLogo(-142 * u, -38 * u, 30 * u, 0.95)
    // tailplane
    ctx.beginPath()
    ctx.moveTo(-140 * u, 0)
    ctx.lineTo(-172 * u, 16 * u)
    ctx.lineTo(-150 * u, 4 * u)
    ctx.closePath()
    ctx.fill()

    // near wing + engines
    ctx.fillStyle = BODY_HI
    ctx.beginPath()
    ctx.moveTo(10 * u, 4 * u)
    ctx.lineTo(-70 * u, 52 * u)
    ctx.lineTo(-38 * u, 8 * u)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = BODY_LO
    ctx.beginPath(); ctx.roundRect(-34 * u, 18 * u, 26 * u, 9 * u, 4 * u); ctx.fill()

    // windows
    ctx.fillStyle = GLASS
    for (let i = 0; i < 9; i++) {
      ctx.globalAlpha = 0.85
      ctx.beginPath()
      ctx.arc((108 - i * 13) * u, -6 * u, 1.7 * u, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // beacon strobe
    const strobe = Math.pow(Math.max(0, Math.sin(gt * 5.2)), 24)
    if (strobe > 0.05) {
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.globalAlpha = strobe
      ctx.fillStyle = '#fff7e0'
      ctx.beginPath(); ctx.arc(-20 * u, -19 * u, 3 * u, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
    // engine glow
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = 'rgba(232,194,104,0.7)'
    ctx.beginPath(); ctx.arc(-36 * u, 24 * u, 2.6 * u, 0, Math.PI * 2); ctx.fill()
    ctx.restore()

    ctx.restore()

    // ice crystal sparkles
    if (!this.reduced && Math.random() < 0.15) {
      this.spawn(P_SPARK, x - 160 * u + Math.random() * 80 * u, y + (Math.random() - 0.5) * 90 * u, -14, 4, 1.2, 1.4 * u, 0)
    }
  }

  /* ---- chapter 3: SEA ---- */

  private drawSea(ct: number, dt: number, slideX: number) {
    const { ctx, W, H, S, gt, mx } = this
    const look = this.mixedLook(3)
    const horizon = H * 0.66

    // sun glint column on water
    const sunX = look.orb.x * W + mx * 8
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    for (let yy = horizon; yy < H; yy += 7 * S) {
      const spread = (yy - horizon) * 0.22 + 8 * S
      const flick = 0.5 + 0.5 * Math.sin(gt * 3 + yy * 0.14)
      ctx.globalAlpha = 0.10 * flick + 0.05
      ctx.fillStyle = GOLD
      ctx.fillRect(sunX - spread / 2 + Math.sin(yy * 0.2 + gt * 2) * 6 * S, yy, spread, 3 * S)
    }
    ctx.restore()

    // wave bands (far → near)
    const bands = [
      { y: 0.68, amp: 3, sp: 0.5, col: look.far, a: 1 },
      { y: 0.74, amp: 5, sp: 0.8, col: look.mid, a: 1 },
      { y: 0.81, amp: 7, sp: 1.1, col: this.themed('#2b1739', '#4a7aaa'), a: 1 },
      { y: 0.90, amp: 9, sp: 1.5, col: look.near, a: 1 },
    ]
    bands.forEach((b, bi) => {
      const depth = 0.2 + bi * 0.25
      ctx.save()
      ctx.translate(mx * depth * 22 + slideX * depth, 0)
      ctx.fillStyle = b.col
      ctx.beginPath()
      ctx.moveTo(-80, H + 80)
      for (let x = -80; x <= W + 80; x += 18) {
        const y = b.y * H + Math.sin(x * 0.012 + gt * b.sp + bi * 2.1) * b.amp * S
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W + 80, H + 80)
      ctx.closePath()
      ctx.fill()
      // gold crest line
      ctx.strokeStyle = `rgba(232,194,104,${0.22 - bi * 0.04})`
      ctx.lineWidth = 1.6 * S
      ctx.beginPath()
      for (let x = -80; x <= W + 80; x += 18) {
        const y = b.y * H + Math.sin(x * 0.012 + gt * b.sp + bi * 2.1) * b.amp * S
        if (x === -80) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()
    })

    // ship
    const x = this.vehX(ct, W * 0.60) + slideX * 1.2 + mx * 18
    const wl = horizon + 14 * S
    const y = wl + Math.sin(gt * 1.6) * 3 * S
    const pitch = Math.sin(gt * 1.6 + 0.6) * 0.012
    this.drawShip(x, y, pitch, dt)

    // gulls
    ctx.save()
    ctx.strokeStyle = mixRGBA('rgba(245,231,198,0.7)', 'rgba(43,32,74,0.65)', this.lookMix)
    ctx.lineWidth = 1.8 * S
    for (let i = 0; i < 3; i++) {
      const gx = W * 0.62 + i * 60 * S + Math.sin(gt * 0.7 + i * 2) * 30 * S
      const gy = H * 0.30 + Math.sin(gt * 1.1 + i) * 12 * S + i * 14 * S
      const flap = Math.sin(gt * 9 + i * 1.7) * 5 * S
      ctx.beginPath()
      ctx.moveTo(gx - 8 * S, gy)
      ctx.quadraticCurveTo(gx - 3 * S, gy - flap, gx, gy)
      ctx.quadraticCurveTo(gx + 3 * S, gy - flap, gx + 8 * S, gy)
      ctx.stroke()
    }
    ctx.restore()
  }

  private drawShip(x: number, wl: number, pitch: number, dt: number) {
    const { ctx, S, gt } = this
    const u = S
    ctx.save()
    ctx.translate(x, wl)
    ctx.rotate(pitch)

    // hull
    ctx.fillStyle = '#22123a'
    ctx.beginPath()
    ctx.moveTo(-190 * u, -40 * u)
    ctx.lineTo(150 * u, -40 * u)
    ctx.lineTo(192 * u, -26 * u)   // bow
    ctx.lineTo(172 * u, 2 * u)
    ctx.lineTo(-160 * u, 6 * u)
    ctx.lineTo(-190 * u, -10 * u)
    ctx.closePath()
    ctx.fill()
    // gold waterline stripe
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 2.4 * u
    ctx.beginPath()
    ctx.moveTo(-188 * u, -12 * u)
    ctx.lineTo(176 * u, -12 * u)
    ctx.stroke()
    // dove on hull
    this.drawLogo(-120 * u, -26 * u, 26 * u, 0.9)

    // containers
    const cols = ['#8a6a3a', '#4a2f7e', '#6a3a5c', '#a08040', '#3a2a60']
    let ci2 = 0
    for (let stack = 0; stack < 5; stack++) {
      const rows = 2 + ((stack * 7) % 3)
      for (let r = 0; r < rows; r++) {
        ctx.fillStyle = cols[ci2++ % cols.length]
        ctx.fillRect((-96 + stack * 44) * u, (-40 - 14 * (r + 1)) * u, 40 * u, 12 * u)
      }
    }

    // bridge tower (stern)
    ctx.fillStyle = '#e9dfc8'
    ctx.fillRect(-178 * u, -86 * u, 34 * u, 46 * u)
    ctx.fillStyle = '#22123a'
    for (let wy = 0; wy < 3; wy++) {
      ctx.fillRect(-174 * u, (-80 + wy * 12) * u, 26 * u, 4 * u)
    }
    // funnel
    ctx.fillStyle = BODY
    ctx.fillRect(-172 * u, -104 * u, 22 * u, 18 * u)
    ctx.fillStyle = GOLD_DEEP
    ctx.fillRect(-172 * u, -104 * u, 22 * u, 4 * u)

    // bow foam
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    ctx.globalAlpha = 0.5
    ctx.fillStyle = CREAM
    ctx.beginPath()
    ctx.ellipse(188 * u, 2 * u, 16 * u, 4 * u, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    ctx.restore()

    // wake trail + foam particles
    if (!this.reduced && dt > 0) {
      this.wakeAcc += dt
      while (this.wakeAcc > 0.22) {
        this.wakeAcc -= 0.22
        this.spawn(P_FOAM, x - 190 * u, wl + 2 * u, -34 - Math.random() * 16, 2, 2.6, 3 * u, 10 * u)
      }
      this.foamAcc += dt
      while (this.foamAcc > 0.1) {
        this.foamAcc -= 0.1
        this.spawn(P_FOAM, x + 186 * u, wl + Math.random() * 3 * u, -20 - Math.random() * 20, -2, 1.1, 1.6 * u, 3 * u)
      }
    }
    void gt
  }

  /* ---------------- particles ---------------- */

  private spawn(kind: number, x: number, y: number, vx: number, vy: number, max: number, size: number, grow: number) {
    if (this.particles.length > 260) return
    this.particles.push({ x, y, vx: vx * this.S, vy: vy * this.S, life: 0, max, size, grow, kind })
  }

  private drawParticles(dt: number) {
    const { ctx, S } = this
    ctx.save()
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.life += dt
      if (p.life >= p.max) {
        this.particles.splice(i, 1)
        continue
      }
      p.x += p.vx * dt * 60 * 0.016
      p.y += p.vy * dt * 60 * 0.016
      const t = p.life / p.max
      const size = p.size + p.grow * t
      const alpha = (1 - t) * (p.kind === P_SMOKE ? 0.30 : p.kind === P_FOAM ? 0.4 : p.kind === P_SPARK ? 0.8 : 0.35)
      if (p.kind === P_SMOKE) ctx.fillStyle = `rgba(180,170,205,${alpha})`
      else if (p.kind === P_FOAM) ctx.fillStyle = `rgba(245,231,198,${alpha})`
      else if (p.kind === P_SPARK) ctx.fillStyle = `rgba(232,194,104,${alpha})`
      else ctx.fillStyle = `rgba(201,162,75,${alpha})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, size * S, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }
}
