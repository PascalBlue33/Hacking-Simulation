import { Component, inject } from '@angular/core';
import { MissionService, STAGES } from './mission.service';
import { TerminalService } from './terminal.service';
@Component({ selector: 'app-mission-panel', template: `
  <section class="panel mission-panel"><div class="panel-heading"><span>⌖ AKTIVE MISSION</span><span class="tag">LVL 01</span></div><div class="mission-content"><div class="eyebrow">CLASSIFIED // SIMULATION</div><h2>OPERATION<br><span>BLACKOUT</span></h2><p>Infiltriere das virtuelle Sicherheitssystem.<br>Entschlüssle die Datei. Enthülle das Geheimnis.</p><div class="mission-progress"><span>MISSIONSFORTSCHRITT</span><b>{{ mission.progress() }}%</b></div><div class="bar"><i [style.width.%]="mission.progress()"></i></div>
  <ol class="steps">@for (step of stages; track step.command; let index = $index) { <li [class.done]="index < mission.stage()" [class.current]="index === mission.stage()"><span class="step-number">{{ index < mission.stage() ? '✓' : '0' + (index + 1) }}</span><div>{{ step.title }}<small>{{ index < mission.stage() ? 'ABGESCHLOSSEN' : index === mission.stage() ? 'BEREIT ZUR AUSFÜHRUNG' : 'GESPERRT' }}</small></div><span class="step-symbol">{{ index < mission.stage() ? '✓' : index === mission.stage() ? '←' : '·' }}</span></li> }</ol>
  @if (mission.current(); as current) { <button class="primary-button" [disabled]="terminal.busy()" (click)="terminal.execute(current.command)">❯ {{ current.command }} ausführen <span>↗</span></button> } @else { <div class="mission-complete">✓ MISSION ERFOLGREICH</div> }</div></section>
` })
export class MissionPanelComponent { readonly mission = inject(MissionService); readonly terminal = inject(TerminalService); readonly stages = STAGES; }
