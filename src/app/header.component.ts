import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SimulationService } from './simulation.service';
@Component({ selector: 'app-header', imports: [DatePipe], template: `
  <header class="header"><a href="./" class="brand" aria-label="HACK OS Startseite"><span class="brand-icon">⌘</span> HACK<span>//</span>OS <small>v.4.0.2</small></a>
  <div class="header-right"><span class="online"><i></i> SYSTEM ONLINE</span><span class="clock">{{ sim.time() | date:'HH:mm:ss' }} <small>LOCAL</small></span><span class="avatar">G</span></div></header>
` })
export class HeaderComponent { readonly sim = inject(SimulationService); }
