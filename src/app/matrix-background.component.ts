import { AfterViewInit, Component, DestroyRef, ElementRef, effect, inject, viewChild } from '@angular/core';
import { SimulationService } from './simulation.service';
@Component({ selector: 'app-matrix-background', template: '<canvas #canvas aria-hidden="true"></canvas>', styles: ['canvas { position: fixed; inset: 0; width: 100%; height: 100%; opacity: .13; pointer-events: none; z-index: 0; }'] })
export class MatrixBackgroundComponent implements AfterViewInit {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly sim = inject(SimulationService);
  private frame = 0;
  private enabled = false;
  private draw: (() => void) | undefined;
  constructor() {
    effect(() => { this.enabled = this.sim.matrix(); cancelAnimationFrame(this.frame); if (this.enabled && this.draw) this.draw(); else this.canvas()?.nativeElement.getContext('2d')?.clearRect(0, 0, window.innerWidth, window.innerHeight); });
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }
  ngAfterViewInit(): void {
    const canvas = this.canvas().nativeElement; const ctx = canvas.getContext('2d'); if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let drops: number[] = []; let last = 0;
    this.draw = () => {
      if (!this.enabled || reduced.matches) return;
      const now = performance.now();
      if (canvas.width !== innerWidth || canvas.height !== innerHeight) { canvas.width = innerWidth; canvas.height = innerHeight; drops = Array.from({ length: Math.ceil(innerWidth / 24) }, () => -Math.random() * 80); }
      if (now - last > 75 && !document.hidden) {
        ctx.fillStyle = 'rgba(5,8,5,.12)'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#00ff88'; ctx.font = '12px monospace';
        drops.forEach((drop, index) => { ctx.fillText('01アイウエオカキクケコ'[Math.floor(Math.random() * 12)], index * 24, drop * 20); drops[index] = drop * 20 > canvas.height && Math.random() > .98 ? 0 : drop + 1; }); last = now;
      }
      this.frame = requestAnimationFrame(this.draw!);
    };
    this.draw();
  }
}
