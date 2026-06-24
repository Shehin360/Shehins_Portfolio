import {
  Component,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  ViewChild,
  QueryList,
  PLATFORM_ID,
  inject,
  Renderer2,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser, NgFor } from '@angular/common';

@Component({
  selector: 'app-liquid-hero',
  standalone: true,
  imports: [NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero-section" [attr.aria-label]="name">
      <span class="sr-only">{{ name }}</span>

      <!-- Ambient particles behind everything -->
      <svg
        class="hero-bg-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <g class="particles-layer">
          <circle *ngFor="let p of particles" [attr.cx]="p.x" [attr.cy]="p.y" [attr.r]="p.r"
            [attr.fill]="p.fill" [attr.opacity]="p.opacity" class="ambient-particle" />
        </g>
      </svg>

      <div class="hero-content-wrapper container">
        <!-- Left Column: Text -->
        <div class="hero-text-column">
          <p class="hello-lead-in">Hello I'm</p>
          
          <svg
            #svgRoot
            class="hero-svg-name"
            [attr.viewBox]="svgViewBox"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lhGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop id="lhStop1" offset="0%"   stop-color="#FF6B6B" />
                <stop id="lhStop2" offset="100%" stop-color="#40E0D0" />
              </linearGradient>

              <filter id="lhDisplace" x="-5%" y="-15%" width="110%" height="130%">
                <feTurbulence
                  #turbulenceEl
                  type="fractalNoise"
                  baseFrequency="0.02 0.04"
                  numOctaves="3"
                  seed="2"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="3"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>

            <text
              class="name-text"
              [attr.x]="textX"
              [attr.y]="textY"
              text-anchor="start"
              dominant-baseline="middle"
              filter="url(#lhDisplace)"
              fill="url(#lhGrad)"
            >
              <tspan
                *ngFor="let letter of letters; let i = index"
                #letterEls
                class="letter-span"
                [attr.data-index]="i"
              >{{ letter }}</tspan>
            </text>
          </svg>

          <div class="hero-sub">
            <p class="hero-role">Aspiring Software Engineer</p>
            <p class="hero-tagline">Full Stack · ML / AI · Open to Opportunities</p>
            <a href="#" class="btn-primary hero-cta">Resume</a>
          </div>
        </div>

        <!-- Right Column: Avatar -->
        <div class="hero-avatar-column">
          <div #avatarContainer class="avatar-container">
            <!-- Single img element used for frame sequence playback -->
            <img 
              #avatarImg
              src="png_output/ezgif-frame-001.png" 
              alt="Shehin waving" 
              class="avatar-img hidden"
            />
            <div #loadingOverlay class="loading-overlay">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .hero-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      position: relative;
      border-radius: var(--radius-lg);
      background: var(--glass-bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: var(--glass-border);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 12px 32px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }

    .hero-section::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
      z-index: 10;
    }

    .hero-bg-svg {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .hero-content-wrapper {
      position: relative;
      z-index: 1;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-xl);
      align-items: center;
    }

    /* --- Left Column: Text --- */
    .hero-text-column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .hello-lead-in {
      font-family: var(--font-mono, 'Fira Code', monospace);
      font-size: 1.25rem;
      color: var(--color-accent);
      margin-bottom: -1rem; /* pull name closer */
      font-weight: 500;
    }

    .hero-svg-name {
      width: 100%;
      height: 200px;
      cursor: default;
      overflow: visible;
      margin-left: -5px; /* Offset the viewBox padding if needed to perfectly align left */
    }

    .name-text {
      font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
      font-size: 120px;
      font-weight: 800;
      letter-spacing: -3px;
    }

    .letter-span {
      cursor: pointer;
    }

    .hero-sub {
      text-align: left;
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .hero-role {
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: clamp(1.25rem, 2.5vw, 1.75rem);
      font-weight: 600;
      color: var(--color-text);
      line-height: 1.2;
      background: var(--gradient-flowing);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: flowGradient 6s ease infinite;
    }

    .hero-tagline {
      font-family: var(--font-mono, 'Fira Code', monospace);
      font-size: clamp(0.9rem, 1.5vw, 1rem);
      color: var(--color-text-muted);
      letter-spacing: 0.05em;
    }

    .hero-cta {
      margin-top: var(--space-md, 1.5rem);
    }

    /* --- Right Column: Avatar --- */
    .hero-avatar-column {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .avatar-container {
      position: relative;
      width: 100%;
      max-width: 500px;
      aspect-ratio: 4/5;
      animation: floatIdle 4s ease-in-out infinite;
      cursor: pointer;
    }

    @keyframes floatIdle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .avatar-img {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      object-fit: contain;
      transform: scale(1.35);
      transform-origin: bottom center;
      transition: opacity 0.3s ease-in-out;
    }

    .avatar-img.hidden {
      opacity: 0;
    }

    .loading-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      background: transparent;
      z-index: 2;
      transition: opacity 0.3s;
    }

    .loading-overlay.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .loader {
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      width: 30px; height: 30px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin { 100% { transform: rotate(360deg); } }

    .ambient-particle {
      will-change: transform;
    }

    .sr-only {
      position: absolute;
      width: 1px; height: 1px;
      padding: 0; margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap;
      border: 0;
    }

    /* --- Responsive --- */
    @media (max-width: 900px) {
      .hero-content-wrapper {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-text-column, .hero-sub {
        align-items: center;
        text-align: center;
      }
      .hello-lead-in { margin-bottom: 0; }
      .name-text { text-anchor: middle; }
      .hero-svg-name { height: 160px; margin-left: 0; }
      .avatar-container { max-width: 320px; margin-top: 2rem; }
    }

    @media (max-width: 768px) {
      .name-text { font-size: 84px; }
      .hero-svg-name { height: 120px; }
    }
    @media (max-width: 480px) {
      .name-text { font-size: 56px; }
      .hero-svg-name { height: 90px; }
      .avatar-container { max-width: 260px; }
    }
  `]
})
export class LiquidHeroComponent implements AfterViewInit, OnDestroy {
  @Input() name: string = 'Shehin T Shaji';

  @ViewChild('svgRoot', { static: true }) svgRoot!: ElementRef<SVGSVGElement>;
  @ViewChild('turbulenceEl') turbulenceEl!: ElementRef<SVGFETurbulenceElement>;
  @ViewChildren('letterEls') letterEls!: QueryList<ElementRef<SVGTSpanElement>>;
  @ViewChild('avatarContainer') avatarContainerEl!: ElementRef<HTMLDivElement>;
  @ViewChild('avatarImg') avatarImgEl!: ElementRef<HTMLImageElement>;
  @ViewChild('loadingOverlay') loadingOverlayEl!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);
  private gsap: any;
  private cleanups: any[] = [];
  private hoverListeners: (() => void)[] = [];

  private isAvatarPlaying = false;
  private preloadedFrames: string[] = [];

  readonly svgViewBox = '0 0 1000 200'; // Adjusted for left-aligned layout
  readonly textX = 0; // Text starts at left
  readonly textY = 100;

  readonly particles = Array.from({ length: 15 }, (_, i) => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 8 + Math.random() * 20,
    fill: i % 2 === 0 ? '#FF6B6B' : '#40E0D0',
    opacity: 0.05 + Math.random() * 0.05,
  }));

  get letters(): string[] {
    return this.name.split('');
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    this.gsap = gsap;

    this.ngZone.runOutsideAngular(() => {
      this.setupAmbientFlow();
      this.setupParticleDrift();
      this.setupPerLetterHover();
      this.preloadAndPlayAvatar();
      this.setupAvatarHover();
    });
  }

  ngOnDestroy(): void {
    this.cleanups.forEach(c => { if (typeof c === 'function') c(); else c?.kill?.(); });
    this.hoverListeners.forEach(fn => fn());
  }

  // ══════════════════════════════════════════════════════════════
  //  AMBIENT FLOW — continuous, gentle, keeps text legible
  // ══════════════════════════════════════════════════════════════
  private setupAmbientFlow(): void {
    const gsap = this.gsap;
    const turb = this.turbulenceEl?.nativeElement;

    // Seed crawl for organic noise drift
    if (turb) {
      let seed = 2;
      const id = setInterval(() => {
        seed = (seed + 1) % 100;
        turb.setAttribute('seed', String(seed));
      }, 200);
      this.cleanups.push(() => clearInterval(id));

      // BaseFrequency breathe (slow sine cycle)
      const obj = { progress: 0 };
      const freqTween = gsap.to(obj, {
        progress: 1,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        onUpdate: () => {
          const p = obj.progress;
          const fx = (0.018 + p * 0.008).toFixed(4);
          const fy = (0.035 + p * 0.012).toFixed(4);
          turb.setAttribute('baseFrequency', `${fx} ${fy}`);
        }
      });
      this.cleanups.push(freqTween);
    }

    // Gradient color breathe (coral ↔ mint)
    const s1 = document.getElementById('lhStop1');
    const s2 = document.getElementById('lhStop2');
    if (s1 && s2) {
      const ct = gsap.timeline({ repeat: -1, yoyo: true });
      ct.to(s1, { attr: { 'stop-color': '#40E0D0' }, duration: 10, ease: 'sine.inOut' }, 0)
        .to(s2, { attr: { 'stop-color': '#FF6B6B' }, duration: 10, ease: 'sine.inOut' }, 0);
      this.cleanups.push(ct);
    }
  }

  // ══════════════════════════════════════════════════════════════
  //  PARTICLE DRIFT
  // ══════════════════════════════════════════════════════════════
  private setupParticleDrift(): void {
    const els = document.querySelectorAll('.ambient-particle');
    els.forEach(p => {
      const tw = this.gsap.to(p, {
        x: () => Math.random() * 100 - 50,
        y: () => Math.random() * -100 - 50,
        opacity: () => 0.04 + Math.random() * 0.08,
        duration: 10 + Math.random() * 6,
        repeat: -1, yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 3,
      });
      this.cleanups.push(tw);
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  PER-LETTER HOVER — jump + wobble + spring-back
  //  Each <tspan> gets its own mouseenter handler.
  //  Hovering the whole container staggers all letters.
  // ══════════════════════════════════════════════════════════════
  private setupPerLetterHover(): void {
    const gsap = this.gsap;
    const spans = this.letterEls?.toArray().map(r => r.nativeElement) ?? [];

    // Individual letter hover — cursor directly over one letter
    spans.forEach((span, _idx) => {
      const unlisten = this.renderer.listen(span, 'mouseenter', () => {
        this.bounceOneLetter(span);
      });
      this.hoverListeners.push(unlisten);
    });

    // Whole-name hover — stagger ripple across all letters
    const svgTextEl = this.svgRoot?.nativeElement.querySelector('.name-text');
    if (svgTextEl) {
      const unlisten = this.renderer.listen(svgTextEl, 'mouseenter', () => {
        this.bounceAllLettersStaggered(spans);
      });
      this.hoverListeners.push(unlisten);
    }
  }

  /** Bounce a single letter: jump up, wobble rotation, spring back. */
  private bounceOneLetter(el: SVGTSpanElement): void {
    const gsap = this.gsap;

    // Kill any in-progress tween on this specific element
    gsap.killTweensOf(el, 'y,rotation,skewX');

    const jumpY = -(8 + Math.random() * 6);       // -8 to -14px
    const wobble = (Math.random() * 8 - 4);        // ±4deg rotation
    const skew = (Math.random() * 6 - 3);          // ±3deg skew

    gsap.to(el, {
      y: jumpY,
      rotation: wobble,
      skewX: skew,
      duration: 0.35,
      ease: 'power2.out',
      onComplete: () => {
        // Spring back to rest
        gsap.to(el, {
          y: 0,
          rotation: 0,
          skewX: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    });
  }

  /** Stagger bounce all letters when hovering the whole name. */
  private bounceAllLettersStaggered(els: SVGTSpanElement[]): void {
    const gsap = this.gsap;
    gsap.killTweensOf(els, 'y,rotation,skewX');

    els.forEach((el, i) => {
      const jumpY = -(8 + Math.random() * 6);
      const wobble = (Math.random() * 8 - 4);
      const skew = (Math.random() * 6 - 3);

      gsap.to(el, {
        y: jumpY,
        rotation: wobble,
        skewX: skew,
        duration: 0.35,
        ease: 'power2.out',
        delay: i * 0.04,    // 40ms stagger per letter
        onComplete: () => {
          gsap.to(el, {
            y: 0, rotation: 0, skewX: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
          });
        }
      });
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  AVATAR FRAME SEQUENCE PLAYER
  // ══════════════════════════════════════════════════════════════
  private async preloadAndPlayAvatar(): Promise<void> {
    const totalFrames = 180;
    const loadPromises: Promise<string>[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const paddedStr = i.toString().padStart(3, '0');
      const src = `png_output/ezgif-frame-${paddedStr}.png`;
      
      const p = new Promise<string>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(src); // continue even if one frame fails
        img.src = src;
      });
      loadPromises.push(p);
    }

    this.preloadedFrames = await Promise.all(loadPromises);

    if (this.loadingOverlayEl) {
      this.renderer.addClass(this.loadingOverlayEl.nativeElement, 'hidden');
    }
    if (this.avatarImgEl) {
      this.renderer.removeClass(this.avatarImgEl.nativeElement, 'hidden');
      this.renderer.setAttribute(this.avatarImgEl.nativeElement, 'src', this.preloadedFrames[0]);
      
      // Auto-play once all frames are loaded
      this.playAvatarSequence();
    }
  }

  private setupAvatarHover(): void {
    if (this.avatarContainerEl) {
      const unlisten = this.renderer.listen(this.avatarContainerEl.nativeElement, 'mouseenter', () => {
        this.playAvatarSequence();
      });
      this.hoverListeners.push(unlisten);
    }
  }

  private playAvatarSequence(): void {
    // If it's already playing, ignore new hover
    if (this.isAvatarPlaying || this.preloadedFrames.length === 0) return;
    this.isAvatarPlaying = true;
    
    let currentFrameIndex = 0;
    const totalFrames = this.preloadedFrames.length;
    const imgEl = this.avatarImgEl.nativeElement;

    const fps = 24;
    const frameInterval = 1000 / fps;

    const id = setInterval(() => {
      currentFrameIndex++;
      if (currentFrameIndex >= totalFrames) {
        clearInterval(id);
        this.renderer.setAttribute(imgEl, 'src', this.preloadedFrames[0]); // Snap back to resting frame
        this.isAvatarPlaying = false;
      } else {
        this.renderer.setAttribute(imgEl, 'src', this.preloadedFrames[currentFrameIndex]);
      }
    }, frameInterval);

    // Push cleanup function in case component is destroyed mid-play
    this.cleanups.push(() => {
      clearInterval(id);
      this.isAvatarPlaying = false;
    });
  }
}
