import { Component, Input } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import { TitleCasePipe } from '@angular/common';
import { MuzikService } from '../services/muzik.service';

@Component({
  selector: 'muzik-song',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
})
export class SongComponent {
  constructor(private readonly muzikService: MuzikService) {}

  @Input({ required: true }) song: Song = {
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

  playSong() {
    this.muzikService.setPlayingSong$.emit(this.song);
  }
}
