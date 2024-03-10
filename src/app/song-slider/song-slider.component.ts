import { Component, input } from '@angular/core';
import { SongCardComponent } from '../song-card/song-card.component';
import { Song } from '../interfaces/song.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'muzik-song-slider',
  standalone: true,
  imports: [SongCardComponent, AsyncPipe],
  templateUrl: './song-slider.component.html',
  styleUrl: './song-slider.component.scss',
})
export class SongSliderComponent {
  // @Input({ required: true }) title!: string;
  // @Input({ required: true }) songs!: Song[];

  title = input.required<string>();
  songs = input.required<Song[]>();
}
