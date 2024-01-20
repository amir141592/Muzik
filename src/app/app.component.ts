import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EventSliderComponent } from './event-slider/event-slider.component';
import { SongSliderComponent } from './song-slider/song-slider.component';
import { PlayerComponent } from './player/player.component';
import { Song } from './interfaces/song.interface';
import { Artist } from './interfaces/artist.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'muzik-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    EventSliderComponent,
    SongSliderComponent,
    PlayerComponent,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'muzik';

  public faIcons = {
    home: faHome,
  };

  public favoriteSongs: Song[] = [
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
  ];

  public favoriteArtists: Artist[] = [
    {
      id: '1',
      firstName: 'mohammad reza',
      lastName: 'shayea',
      artisticName: 'shayea',
      image: 'assets/artist-images/shayea.jpg',
    },
    {
      id: '2',
      firstName: 'mohammad reza',
      lastName: 'shayea',
      artisticName: 'shayea',
      image: 'assets/artist-images/shayea.jpg',
    },
    {
      id: '3',
      firstName: 'mohammad reza',
      lastName: 'shayea',
      artisticName: 'shayea',
      image: 'assets/artist-images/shayea.jpg',
    },
  ];
}
