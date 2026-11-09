import { Component, computed, inject } from '@angular/core';
import { SimulationService } from './simulation.service';
@Component({ selector: 'app-system-monitor', template: `
  <section class="panel monitor"><div class="panel-heading"><span>◷ SYSTEM MONITOR</span><span class="live">LIVE <i class="tiny-dot"></i></span></div>
  <div class="monitor-content"><div class="metric-label"><span>CPU AUSLASTUNG</span><strong>{{ sim.cpu() }}<small>%</small></strong></div><div class="segmented"><i [style.width.%]="sim.cpu()"></i></div><div class="metric-note">VIRTUAL CORE / 4 THREADS <span>3.60 GHz</span></div>
  <div class="metric-label"><span>ARBEITSSPEICHER</span><strong class="blue">{{ sim.memory() }}<small>%</small></strong></div><div class="segmented memory"><i [style.width.%]="sim.memory()"></i></div><div class="metric-note">{{ (sim.memory() * 0.16).toFixed(1) }} GB / 16 GB <span>DDR5</span></div>
  <div class="metric-label network-label"><span>NETZWERKVERKEHR</span><strong>{{ sim.traffic() }}<small> KB/s</small></strong></div>
  <svg class="network-chart" viewBox="0 0 320 85" role="img" aria-label="Simulierter Netzwerkverkehr"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00ff88" stop-opacity=".25"/><stop offset="100%" stop-color="#00ff88" stop-opacity="0"/></linearGradient></defs><path [attr.d]="area()" fill="url(#chart-fill)"/><polyline [attr.points]="points()" fill="none" stroke="#00df88" stroke-width="1.5"/><path d="M0 84H320 M0 42H320 M0 1H320" stroke="#183025" stroke-dasharray="3 5"/></svg>
  <div class="metric-note"><span>↑ TX {{ sim.traffic() }} KB/s</span><span>↓ RX 48 KB/s</span></div></div><div class="panel-foot">◇ Alle Messwerte sind simuliert</div></section>
` })
export class SystemMonitorComponent {
  readonly sim = inject(SimulationService);
  readonly points = computed(() => this.sim.samples().map((v, i) => `${i * 320 / 39},${85 - v}`).join(' '));
  readonly area = computed(() => `M0,85 L${this.points().replaceAll(' ', ' L')} L320,85 Z`);
}
