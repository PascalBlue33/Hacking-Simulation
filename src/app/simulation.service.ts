import { DestroyRef, Injectable, inject, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SimulationService {
  readonly matrix = signal(true);
  readonly time = signal(new Date());
  readonly cpu = signal(24);
  readonly memory = signal(38);
  readonly traffic = signal(128);
  readonly samples = signal(Array.from({ length: 40 }, () => 10 + Math.random() * 45));
  constructor() {
    const timer = setInterval(() => {
      this.time.set(new Date());
      this.cpu.set(Math.round(18 + Math.random() * 26));
      this.memory.set(Math.round(35 + Math.random() * 7));
      this.traffic.set(Math.round(80 + Math.random() * 180));
      this.samples.update(s => [...s.slice(1), 10 + Math.random() * 65]);
    }, 1200);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
