import { describe, it, expect } from 'vitest';
import { MissionService } from './mission.service';
describe('MissionService', () => {
  it('requires all four operations in order', () => {
    const mission = new MissionService();
    expect(mission.check('decrypt')).toContain('scan');
    for (const command of ['scan', 'connect', 'breach', 'decrypt']) {
      expect(mission.check(command)).toBeNull(); mission.advance();
    }
    expect(mission.complete()).toBe(true); expect(mission.progress()).toBe(100);
    expect(mission.check('scan')).toContain('abgeschlossen');
  });
  it('rejects duplicate stages and resets cleanly', () => {
    const mission = new MissionService(); mission.advance();
    expect(mission.check('scan')).toContain('bereits'); mission.reset();
    expect(mission.progress()).toBe(0); expect(mission.current()?.command).toBe('scan');
  });
});
