import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EventSliderComponent } from './event-slider/event-slider.component';
import { SongSliderComponent } from './song-slider/song-slider.component';
import { PlayerComponent } from './player/player.component';
import { Song } from './interfaces/song.interface';
import { Artist } from './interfaces/artist.interface';
import { MuzikService } from './services/muzik.service';
import { AuthenticationService } from './services/authentication.service';
import { map } from 'rxjs';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly muzikService: MuzikService
  ) {
    this.muzikService
      .getHomeRecommendedSongs()
      .subscribe((songs) => (this.homeRecommendedSongs = songs));

    this.muzikService
      .getHomeTopTracksSongs()
      .subscribe((songs) => (this.homeTopTracksSongs = songs));

    this.muzikService.setPlayingSong.subscribe(
      (value) => (this.playingSong = value)
    );
  }

  title = 'muzik';

  homeRecommendedSongs: Song[] = [];
  homeTopTracksSongs: Song[] = [];

  playingSong?: Song;

  favoriteSongs = [
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

  favoriteArtists: Artist[] = [
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
