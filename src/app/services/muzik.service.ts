import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MuzikService {
  constructor(
    @Inject('BACKEND_URL') private readonly BACKEND_URL: string,
    private readonly http: HttpClient
  ) {}

  setPlayingSong$ = new EventEmitter<Song>(false);
  addSongToList$ = new EventEmitter<Song>(false);
  playSong$ = new EventEmitter<void>(false);
  pauseSong$ = new EventEmitter<void>(false);
  nextSong$ = new EventEmitter<void>(false);
  previousSong$ = new EventEmitter<void>(false);
  toggleRepeat$ = new EventEmitter<void>(false);
  toggleShuffle$ = new EventEmitter<void>(false);
  muteSlider$ = new EventEmitter<void>(false);

  PLAYING_SONG_STATE: 'PLAYING' | 'PAUSED' | 'LOADING' = 'PAUSED';

  // TODO combine events playSong & nextSong & previousSong & setPlayingSong to chnage PLAYING_SONG_STATE

  getHomeRecommendedSongs() {
    return this.http.get<Song[]>(this.BACKEND_URL + '/muziks/home/recommended');
  }

  getHomeTopTracksSongs() {
    return this.http.get<Song[]>(this.BACKEND_URL + '/muziks/home/top-tracks');
  }
}
