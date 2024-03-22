import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Song } from '../interfaces/song.interface';

@Component({
  selector: 'muzik-song-item',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './song-item.component.html',
  styleUrl: './song-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongItemComponent {
  // @Input({ required: true }) song!: Song;
  // @Input() playingSong?: Song;

  song = input.required<Song>();
  playingSong = input<Song | null>();
}
