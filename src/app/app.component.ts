import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EventSliderComponent } from './event-slider/event-slider.component';
import { SongSliderComponent } from './song-slider/song-slider.component';
import { PlayerComponent } from './player/player.component';
import { Song } from './interfaces/song.interface';
import { MuzikService } from './services/muzik.service';
import { AuthenticationService } from './services/authentication.service';
import { MuzikEvent } from './interfaces/muzik-event.interface';
import { SongItemComponent } from './song-item/song-item.component';
import { Subscription, defer, from } from 'rxjs';
import { MuzikButton } from './interfaces/muzik-button.interface';

@Component({
  selector: 'muzik-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    EventSliderComponent,
    SongSliderComponent,
    SongItemComponent,
    PlayerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  constructor(
    private readonly authService: AuthenticationService,
    public readonly muzikService: MuzikService
  ) {
    this.muzikService
      .getHomeRecommendedSongs()
      .subscribe((songs) => (this.homeRecommendedSongs = songs));

    this.muzikService
      .getHomeTopTracksSongs()
      .subscribe((songs) => (this.homeTopTracksSongs = songs));
  }

  $setPlayingSong$ = this.muzikService.setPlayingSong$.subscribe((value) => {
    this.playingSong = value;
    this.playList.unshift(value);
  });

  $addSongToList$ = this.muzikService.addSongToList$.subscribe((value) =>
    this.playList.push(value)
  );

  $nextSong$ = this.muzikService.nextSong$.subscribe(
    () =>
      (this.playingSong =
        this.playList[
          this.playList.findIndex((song) => song.id == this.playingSong?.id) + 1
        ])
  );

  homeRecommendedSongs: Song[] = [];
  homeTopTracksSongs: Song[] = [];
  sliderEvents: MuzikEvent[] = [
    {
      id: '1',
      type: 'VIDEO',
      title: 'concerts next month',
      description: "Don't miss your favorite artist's concert",
      file: 'http://localhost:3000/video/mohsen-yeganeh_behet-ghol-midam.mp4',
    },
    {
      id: '2',
      type: 'IMAGE',
      title: 'join premium membership',
      description: 'Listen to music from any device',
      file: 'http://localhost:3000/image/premium-membership.webp',
      time: 5000,
    },
  ];

  playingSong?: Song;

  playList: Song[] = [];

  favoriteSongs: Song[] = [
    {
      id: '1',
      type: 'ALBUM',
      parentalAdvisory: true,
      title: 'manam oon ke maghroor',
      artist: 'shayea',
      coArtists: [],
      album: 'injaneb',
      image: 'http://localhost:3000/image/shayea_injaneb.webp',
      file: 'http://localhost:3000/song/shayea_manam-oon-ke-maghroor.mp3',
    },
    {
      id: '2',
      type: 'SINGLE',
      parentalAdvisory: true,
      title: 'miri tu lak',
      artist: 'reza pishro',
      coArtists: ['ho3ein'],
      album: '',
      image: 'http://localhost:3000/image/reza-pishro_miri-tu-lak.webp',
      file: 'http://localhost:3000/song/reza-pishro_miri-tu-lak.mp3',
    },
    {
      id: '13',
      type: 'ALBUM',
      parentalAdvisory: true,
      title: 'yelkhi',
      artist: 'shayea',
      coArtists: ['zaal'],
      album: 'amadebash',
      image: 'http://localhost:3000/image/shayea_amadebash.webp',
      file: 'http://localhost:3000/song/shayea_yelkhi.mp3',
    },
    {
      id: '14',
      type: 'ALBUM',
      parentalAdvisory: true,
      title: 'vel kon',
      artist: 'shayea',
      coArtists: ['amir khalvat'],
      album: 'amadebash',
      image: 'http://localhost:3000/image/shayea_amadebash.webp',
      file: 'http://localhost:3000/song/shayea_vel-kon.mp3',
    },
  ];

  addSongToList(song: Song): void {
    this.playList.push(song);
  }

  playOrPause(song: Song): void {
    if (song.id == this.playingSong?.id) this.muzikService.pauseSong$.emit();
    else this.muzikService.playSong$.emit();
  }

  ngOnDestroy(): void {
    this.$setPlayingSong$.unsubscribe();
  }
}
