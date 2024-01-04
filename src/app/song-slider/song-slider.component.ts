import { Component } from '@angular/core';
import { SamuraiButtonDirective } from '@kuro-samurai/ngx-samurai-button';

@Component({
  selector: 'muzik-song-slider',
  standalone: true,
  imports: [SamuraiButtonDirective],
  templateUrl: './song-slider.component.html',
  styleUrl: './song-slider.component.scss',
})
export class SongSliderComponent {}
