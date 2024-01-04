import { Component } from '@angular/core';
import { SamuraiButtonDirective } from '@kuro-samurai/ngx-samurai-button';

@Component({
  selector: 'muzik-event-slider',
  standalone: true,
  imports: [SamuraiButtonDirective],
  templateUrl: './event-slider.component.html',
  styleUrl: './event-slider.component.scss',
})
export class EventSliderComponent {}
