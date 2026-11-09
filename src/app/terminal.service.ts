import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { MissionService } from './mission.service';
import { SimulationService } from './simulation.service';
export interface TerminalLine { id: number; text: string; kind: 'info' | 'success' | 'error' | 'command' | 'muted'; }
export const COMMANDS = ['help', 'clear', 'status', 'scan', 'connect', 'decrypt', 'breach', 'matrix', 'whoami', 'mission', 'history', 'reboot'];
@Injectable({ providedIn: 'root' })
export class TerminalService {
  readonly mission = inject(MissionService);
  readonly simulation = inject(SimulationService);
  readonly lines = signal<TerminalLine[]>([]);
  readonly history = signal<string[]>([]);
  readonly busy = signal(false);
  readonly progress = signal(0);
  readonly activity = signal('Warte auf Eingabe');
  readonly cipher = signal('');
  private sequence = 0;
  private timer: ReturnType<typeof setInterval> | undefined;
  constructor() { this.boot(); inject(DestroyRef).onDestroy(() => this.cancel()); }
  private cancel(): void { clearInterval(this.timer); this.timer = undefined; this.busy.set(false); }
  private boot(): void {
    this.log('HACK//OS KERNEL v.4.0.2 • SECURE SANDBOX', 'success');
    this.log('Initialisiere isolierte Simulationsumgebung …', 'muted');
    this.log('[ OK ] Virtuelle Schnittstellen geladen', 'muted');
    this.log('[ OK ] Anonyme Sitzung erstellt • GHOST_01', 'muted');
    this.log('Alle Systeme bereit. Keine Verbindung zu echten Zielsystemen.', 'success');
    this.log('');
    this.log('Neue Mission verfügbar: OPERATION BLACKOUT');
    this.log('Beginne mit scan. Eine Befehlsübersicht findest du unter help.', 'muted');
  }
  private log(text: string, kind: TerminalLine['kind'] = 'info'): void {
    this.lines.update(lines => [...lines.slice(-299), { id: this.sequence++, text, kind }]);
  }
  execute(raw: string): void {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    this.history.update(h => [...h.slice(-99), raw.trim()]);
    this.log(`ghost@hack-os:~$ ${raw.trim()}`, 'command');
    if (command === 'reboot') {
      this.cancel(); this.mission.reset(); this.progress.set(0); this.cipher.set(''); this.activity.set('Warte auf Eingabe');
      this.lines.set([]); this.history.set([]); this.boot(); return;
    }
    if (command === 'clear') { this.lines.set([]); return; }
    if (command === 'help') { COMMANDS.forEach(c => this.log(`${c.padEnd(10)} ${DESCRIPTIONS[c]}`, 'muted')); return; }
    if (command === 'history') { this.history().forEach((c, i) => this.log(`${String(i + 1).padStart(3, '0')}  ${c}`, 'muted')); return; }
    if (command === 'matrix') { this.simulation.matrix.update(v => !v); this.log(`Matrix-Regen ${this.simulation.matrix() ? 'aktiviert' : 'deaktiviert'}.`, 'success'); return; }
    if (command === 'whoami') { this.log('GHOST_01 • Independent operator • Clearance: LEVEL 01'); return; }
    if (command === 'status') { this.log(`SANDBOX ONLINE • CPU ${this.simulation.cpu()}% • RAM ${this.simulation.memory()}% • Alle Werte fiktiv.`); return; }
    if (command === 'mission') { this.log(this.mission.current()?.detail ?? 'MISSION COMPLETE • Zugangscode: ECLIPSE-7749', 'success'); return; }
    if (command === 'sudo') { this.log('Mit grosser Macht kommt … ein simulierter Zugriff.', 'success'); return; }
    if (command === 'hello' || command === '42') { this.log(command === '42' ? 'Die Antwort auf alles. Auch auf dein Passwort? Besser nicht.' : 'Hello, operator. Follow the white rabbit.', 'success'); return; }
    if (!['scan', 'connect', 'breach', 'decrypt'].includes(command)) { this.log(`Befehl nicht gefunden: ${command}. Tippe help.`, 'error'); return; }
    if (this.busy()) { this.log('Ein Vorgang läuft bereits. Bitte warten oder reboot ausführen.', 'error'); return; }
    const error = this.mission.check(command);
    if (error) { this.log(error, 'error'); return; }
    this.run(command);
  }
  private run(command: string): void {
    this.busy.set(true); this.progress.set(0); this.cipher.set('');
    const messages = OPERATIONS[command];
    this.activity.set(messages[0]); this.log(messages[0]);
    let tick = 0;
    this.timer = setInterval(() => {
      tick++; this.progress.set(tick * 4);
      if (tick === 8 || tick === 16) { const message = messages[tick === 8 ? 1 : 2]; this.activity.set(message); this.log(message, 'muted'); }
      if (command === 'decrypt') {
        const secret = 'ECLIPSE-7749';
        this.cipher.set([...secret].map((letter, i) => i < Math.floor(tick / 2) ? letter : '01ABCDEF#'[Math.floor(Math.random() * 9)]).join(''));
      }
      if (tick >= 25) {
        this.cancel(); this.mission.advance(); this.activity.set('Vorgang abgeschlossen'); this.log(messages[3], 'success');
        if (this.mission.complete()) this.log('MISSION COMPLETE // Zugangscode: ECLIPSE-7749 // Archiv gesichert.', 'success');
        else this.log(`Nächster Schritt: ${this.mission.current()?.command}`, 'info');
      }
    }, 120);
  }
}
const DESCRIPTIONS: Record<string, string> = { help: 'Befehle anzeigen', clear: 'Terminal leeren', status: 'Simulierten Systemstatus anzeigen', scan: 'Virtuelles Netzwerk untersuchen', connect: 'Mit fiktivem Ziel verbinden', breach: 'Simulierte Firewall überwinden', decrypt: 'Geheimdatei entschlüsseln', matrix: 'Matrix-Regen umschalten', whoami: 'Operator-Profil anzeigen', mission: 'Aktuelles Missionsziel anzeigen', history: 'Befehlshistorie anzeigen', reboot: 'Sitzung und Mission zurücksetzen' };
const OPERATIONS: Record<string, string[]> = {
  scan: ['Untersuche virtuelle Topologie …', '3 simulierte Knoten entdeckt', 'Zielsignatur BLACKOUT identifiziert', 'SCAN COMPLETE • Ziel: BLACKOUT / sandbox-node-07'],
  connect: ['Initialisiere simulierten Handshake …', 'Virtueller Tunnel wird aufgebaut', 'Sitzungsschlüssel lokal generiert', 'CONNECTED • sandbox-node-07 • Verbindung rein simuliert'],
  breach: ['Analysiere virtuelle Sicherheitsebene …', 'Simulierte Firewall-Regeln rekonstruiert', 'Sandbox-Autorisierung wird geprüft', 'ACCESS GRANTED • archive.enc verfügbar'],
  decrypt: ['Lade archive.enc aus dem fiktiven Archiv …', 'Simulierte Schlüsselblöcke rekonstruiert', 'Zugangscode wird zusammengesetzt', 'DECRYPTION COMPLETE • Datei erfolgreich entschlüsselt']
};
