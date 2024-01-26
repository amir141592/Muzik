import { Component } from '@angular/core';
import { SongComponent } from '../song/song.component';
import { Song } from '../interfaces/song.interface';

@Component({
  selector: 'muzik-song-slider',
  standalone: true,
  imports: [SongComponent],
  templateUrl: './song-slider.component.html',
  styleUrl: './song-slider.component.scss',
})
export class SongSliderComponent {
  songs: Song[] = [
    {
      id: '1',
      title: 'Khab Nabashim',
      artist: 'Shayea',
      image: 'assets/song-images/amadebash.jpg',
    },
    {
      id: '2',
      title: 'Khab Nabashim',
      artist: 'Shayea',
      image: 'assets/song-images/amadebash.jpg',
    },
    {
      id: '3',
      title: 'Khab Nabashim',
      artist: 'Shayea',
      image: 'assets/song-images/amadebash.jpg',
    },
    {
      id: '4',
      title: 'Khab Nabashim',
      artist: 'Shayea',
      image: 'assets/song-images/amadebash.jpg',
    },
    {
      id: '5',
      title: 'Khab Nabashim',
      artist: 'Shayea',
      image: 'assets/song-images/amadebash.jpg',
    },
  ];
}
