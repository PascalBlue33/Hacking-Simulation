import { Component, effect, inject, signal } from '@angular/core';
import { HeaderComponent } from './header.component';
import { TerminalComponent } from './terminal.component';
import { SystemMonitorComponent } from './system-monitor.component';
import { MissionPanelComponent } from './mission-panel.component';
import { MatrixBackgroundComponent } from './matrix-background.component';
import { MissionService } from './mission.service';
import { SimulationService } from './simulation.service';
import { TerminalService } from './terminal.service';
@Component({ selector: 'app-root', imports: [HeaderComponent, TerminalComponent, SystemMonitorComponent, MissionPanelComponent, MatrixBackgroundComponent], template: `
  <app-matrix-background/><div class="app-shell"><app-header/>
  <main><div class="page-heading"><div><div class="eyebrow">SECURE ENVIRONMENT / SESSION 001</div><h1>Control center<span class="green">.</span></h1><p>Willkommen zurück, <span class="light">GHOST_01</span>. Dein nächster Auftrag wartet.</p></div><button class="matrix-toggle" [attr.aria-pressed]="sim.matrix()" (click)="sim.matrix.update(toggle)"><span class="toggle" [class.on]="sim.matrix()"><i></i></span> MATRIX FX</button></div>
  <div class="simulation-banner"><span class="shield">⬡</span><span><b>SIMULATION MODE</b><span class="banner-divider">/</span> Isolierte Umgebung. Fiktive Ziele. Keine echten Angriffe.</span><span class="sandbox-badge">SANDBOX ACTIVE</span></div>
  <div class="dashboard"><div class="left-column"><app-terminal/><section class="intel-strip"><div class="intel-icon">⌁</div><div><span class="eyebrow">OPERATOR INTEL</span><p>Jedes System hat eine Geschichte. Beginne mit <button (click)="terminal.execute('scan')">scan</button>, um diese zu entdecken.</p></div><span class="intel-index">// 001</span></section></div><aside><app-system-monitor/><app-mission-panel/></aside></div>
  </main><footer><span><i class="tiny-dot"></i> {{ mission.stage() > 1 ? 'VIRTUELL VERBUNDEN' : 'LOKALE SITZUNG AKTIV' }}<span class="footer-divider">│</span> ENCRYPTION: SIMULATED</span><span>LEVEL 01 <span class="footer-divider">│</span> {{ mission.complete() ? 'MISSION COMPLETE' : 'AWAITING COMMAND' }} <span class="footer-version">HACK//OS © 2026</span></span></footer></div>
  @if (mission.complete() && !dismissed()) { <div class="success-overlay"><section role="dialog" aria-modal="true" aria-labelledby="success-title" class="success-card"><div class="success-icon">✓</div><div class="eyebrow">OPERATION BLACKOUT</div><h2 id="success-title">MISSION COMPLETE</h2><p>Das Archiv ist gesichert. Der geheime Zugangscode gehört dir.</p><div class="secret-code">ECLIPSE-7749</div><span class="eyebrow">4 / 4 ZIELE ERREICHT • SIMULATION BEENDET</span><button autofocus class="primary-button" (click)="dismissed.set(true)">Zurück zum Terminal ↗</button><button class="text-button" (click)="terminal.execute('reboot')">Neue Sitzung starten</button></section></div> }
` })
export class AppComponent {
  readonly mission = inject(MissionService); readonly sim = inject(SimulationService); readonly terminal = inject(TerminalService);
  readonly dismissed = signal(false); readonly toggle = (value: boolean): boolean => !value;
  constructor() { effect(() => { if (!this.mission.complete()) this.dismissed.set(false); }); }
}
