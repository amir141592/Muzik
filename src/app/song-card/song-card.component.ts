import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import { TitleCasePipe } from '@angular/common';
import { MuzikService } from '../services/muzik.service';

@Component({
  selector: 'muzik-song-card',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongCardComponent {
  constructor(private readonly muzikService: MuzikService) {}

  song = input.required<Song>();

  playSong(): void {
    this.muzikService.setPlayingSong$.emit(this.song());
  }

  addSongToList(): void {
    this.muzikService.addSongToList$.emit(this.song());
  }
}
