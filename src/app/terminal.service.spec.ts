import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TerminalService } from './terminal.service';
describe('TerminalService', () => {
  let terminal: TerminalService;
  beforeEach(() => { vi.useFakeTimers(); TestBed.configureTestingModule({}); terminal = TestBed.inject(TerminalService); });
  afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); });
  it('normalizes commands and reports unknown commands safely', () => {
    terminal.execute('  WHOAMI  '); expect(terminal.lines().at(-1)?.text).toContain('GHOST_01');
    terminal.execute('<script>alert(1)</script>'); expect(terminal.lines().at(-1)?.kind).toBe('error');
  });
  it('enforces prerequisites and prevents overlapping operations', () => {
    terminal.execute('decrypt'); expect(terminal.busy()).toBe(false); expect(terminal.mission.stage()).toBe(0);
    terminal.execute('scan'); terminal.execute('scan'); expect(terminal.lines().at(-1)?.text).toContain('läuft bereits');
    vi.advanceTimersByTime(3000); expect(terminal.mission.stage()).toBe(1); expect(terminal.busy()).toBe(false);
  });
  it('completes the entire mission and reveals the code', () => {
    for (const cmd of ['scan', 'connect', 'breach', 'decrypt']) { terminal.execute(cmd); vi.advanceTimersByTime(3000); }
    expect(terminal.mission.complete()).toBe(true); expect(terminal.cipher()).toBe('ECLIPSE-7749');
    expect(terminal.lines().at(-1)?.text).toContain('MISSION COMPLETE');
  });
  it('reboot cancels active operations without stale completion', () => {
    terminal.execute('scan'); vi.advanceTimersByTime(500); terminal.execute('reboot'); vi.advanceTimersByTime(5000);
    expect(terminal.mission.stage()).toBe(0); expect(terminal.busy()).toBe(false); expect(terminal.history()).toEqual([]);
  });
  it('clears output, records history, and toggles matrix', () => {
    terminal.execute('matrix'); expect(terminal.simulation.matrix()).toBe(false);
    terminal.execute('history'); expect(terminal.lines().at(-1)?.text).toContain('history');
    terminal.execute('clear'); expect(terminal.lines()).toEqual([]); expect(terminal.history()).toHaveLength(3);
  });
});
