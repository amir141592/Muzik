import { Component } from '@angular/core';
import { Song } from '../interfaces/song.interface';

@Component({
  selector: 'muzik-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  public PLAYING = true;

  public playingSong: Song = {
    id: '1',
    title: 'Khab Nabashim',
    artist: 'Shayea',
    image: 'assets/song-images/amadebash.jpg',
  };
}
