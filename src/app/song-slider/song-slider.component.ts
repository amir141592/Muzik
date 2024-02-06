import { Component, Input } from '@angular/core';
import { SongComponent } from '../song/song.component';
import { Song } from '../interfaces/song.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'muzik-song-slider',
  standalone: true,
  imports: [SongComponent, AsyncPipe],
  templateUrl: './song-slider.component.html',
  styleUrl: './song-slider.component.scss',
})
export class SongSliderComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) songs: Song[] = [];
}
