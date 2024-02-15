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
  playSong$ = new EventEmitter<void>(false);
  pauseSong$ = new EventEmitter<void>(false);
  muteSlider$ = new EventEmitter<void>(false);

  getHomeRecommendedSongs() {
    return this.http.get<Song[]>(this.BACKEND_URL + '/muziks/home/recommended');
  }

  getHomeTopTracksSongs() {
    return this.http.get<Song[]>(this.BACKEND_URL + '/muziks/home/top-tracks');
  }
}
