import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Song } from '../interfaces/song.interface';

@Component({
  selector: 'muzik-song-item',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './song-item.component.html',
  styleUrl: './song-item.component.scss',
})
export class SongItemComponent {
  @Input({ required: true }) song!: Song;
  @Input() playingSong?: Song | null;
}
