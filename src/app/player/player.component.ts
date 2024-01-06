import { Component } from '@angular/core';
import { SamuraiButtonDirective } from '@kuro-samurai/ngx-samurai-button';
import { Song } from '../interfaces/song.interface';

@Component({
  selector: 'muzik-player',
  standalone: true,
  imports: [SamuraiButtonDirective],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  playingSong: Song = {
    id: '1',
    title: 'Khab Nabashim',
    artist: 'Shayea',
    image: 'assets/song-images/amadebash.jpg',
  };
}
