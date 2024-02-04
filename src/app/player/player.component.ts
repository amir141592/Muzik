import { Component, Input } from '@angular/core';
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

  @Input({ required: true }) public playingSong: Song = {
    id: '',
    type: 'SINGLE',
    parentalAdvisory: false,
    title: '',
    artist: '',
    coArtists: [],
    album: '',
    image: '',
    file: '',
  };
}
