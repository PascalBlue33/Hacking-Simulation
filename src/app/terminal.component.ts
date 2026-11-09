import { Component, ElementRef, afterRenderEffect, inject, viewChild } from '@angular/core';
import { TerminalService, COMMANDS } from './terminal.service';
@Component({ selector: 'app-terminal', template: `
  <section class="panel terminal-panel" aria-label="Interaktives Terminal">
    <div class="panel-heading"><span><span class="green">❯_</span> TERMINAL <span class="muted">/ bash</span></span><span class="window-dots"><i></i><i></i><i></i></span></div>
    <div class="terminal-tabs"><span class="active-tab">ghost&#64;hack-os: ~ <b>×</b></span><span class="terminal-session">SESSION 0x7F3A</span></div>
    <div class="terminal-body" #scrollArea role="log" aria-live="polite" aria-relevant="additions" tabindex="0">
      <pre class="ascii-logo" aria-hidden="true">HACK<span>//</span>OS<span class="logo-square">■</span></pre>
      <div class="terminal-caption">OFFENSIVE AESTHETICS. ZERO REAL-WORLD IMPACT.</div>
      @for (line of terminal.lines(); track line.id) { <div class="terminal-line" [class]="'terminal-line ' + line.kind">{{ line.text || ' ' }}</div> }
      @if (terminal.busy()) { <div class="operation"><span>{{ terminal.activity() }}</span><b>{{ terminal.progress() }}%</b><div class="bar"><i [style.width.%]="terminal.progress()"></i></div></div> }
      @if (terminal.cipher()) { <div class="cipher">{{ terminal.cipher() }}</div> }
      <form class="command-line" (submit)="submit($event, commandInput)"><label for="command">ghost<span>&#64;hack-os</span>:~$</label><input #commandInput id="command" name="command" aria-label="Terminal-Befehl" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Befehl eingeben …" (keydown)="key($event, commandInput)"><span class="cursor"></span></form>
    </div>
    <div class="terminal-bottom"><span><i class="tiny-dot"></i> SHELL BEREIT</span><span>↑ ↓ Verlauf <span class="separator">/</span> TAB Ergänzen <span class="separator">/</span> ENTER Ausführen</span></div>
  </section>
  <div class="quick-commands"><span>SCHNELLZUGRIFF</span>@for (cmd of shortcuts; track cmd) { <button (click)="terminal.execute(cmd)"><span>❯</span> {{ cmd }}</button> }</div>
` })
export class TerminalComponent {
  readonly terminal = inject(TerminalService);
  readonly shortcuts = ['help', 'scan', 'status', 'clear'];
  readonly scrollArea = viewChild<ElementRef<HTMLDivElement>>('scrollArea');
  private historyIndex = -1;
  private draft = '';
  constructor() { afterRenderEffect(() => { this.terminal.lines(); this.terminal.progress(); const area = this.scrollArea()?.nativeElement; if (area) area.scrollTop = area.scrollHeight; }); }
  submit(event: Event, input: HTMLInputElement): void { event.preventDefault(); this.terminal.execute(input.value); input.value = ''; this.historyIndex = -1; input.focus(); }
  key(event: KeyboardEvent, input: HTMLInputElement): void {
    if (event.key === 'Tab') { event.preventDefault(); const matches = COMMANDS.filter(c => c.startsWith(input.value.trim().toLowerCase())); if (matches.length === 1) input.value = matches[0]; }
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault(); const history = this.terminal.history(); if (!history.length) return;
    if (event.key === 'ArrowUp') { if (this.historyIndex === -1) { this.draft = input.value; this.historyIndex = history.length; } this.historyIndex = Math.max(0, this.historyIndex - 1); }
    else { if (this.historyIndex === -1) return; this.historyIndex++; }
    if (this.historyIndex >= history.length) { this.historyIndex = -1; input.value = this.draft; } else input.value = history[this.historyIndex];
  }
}
