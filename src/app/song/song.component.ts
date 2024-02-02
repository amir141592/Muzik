import { Component, Input } from '@angular/core';
import { Song } from '../interfaces/song.interface';

@Component({
  selector: 'muzik-song',
  standalone: true,
  imports: [],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
})
export class SongComponent {
  @Input({ required: true }) song: Song = {
    id: '',
    type: 'SINGLE',
    title: '',
    artist: '',
    coArtists: [],
    album: '',
    image: '',
  };
}
