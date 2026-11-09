import { Injectable, computed, signal } from '@angular/core';
export const STAGES = [
  { command: 'scan', title: 'Netzwerk untersuchen', detail: 'Finde das virtuelle Ziel im isolierten Netzwerk.' },
  { command: 'connect', title: 'Verbindung herstellen', detail: 'Verbinde dich mit dem fiktiven BLACKOUT-Knoten.' },
  { command: 'breach', title: 'Firewall überwinden', detail: 'Überwinde die simulierte Sicherheitsebene.' },
  { command: 'decrypt', title: 'Geheimdatei entschlüsseln', detail: 'Entschlüssle archive.enc und entdecke den Zugangscode.' }
] as const;
@Injectable({ providedIn: 'root' })
export class MissionService {
  readonly stage = signal(0);
  readonly complete = computed(() => this.stage() === STAGES.length);
  readonly progress = computed(() => this.stage() * 25);
  readonly current = computed(() => STAGES[this.stage()] ?? null);
  check(command: string): string | null {
    if (this.complete()) return 'Mission bereits abgeschlossen. Mit reboot eine neue Sitzung starten.';
    const index = STAGES.findIndex(s => s.command === command);
    if (index < this.stage()) return 'Dieser Missionsschritt ist bereits abgeschlossen.';
    if (index !== this.stage()) return `Zugriff verweigert. Zuerst ${this.current()?.command} ausführen.`;
    return null;
  }
  advance(): void { this.stage.update(s => Math.min(STAGES.length, s + 1)); }
  reset(): void { this.stage.set(0); }
}
