import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MuzikService implements OnDestroy {
  constructor(
    @Inject('BACKEND_URL') private readonly BACKEND_URL: string,
    private readonly http: HttpClient
  ) {
    this.subs.push(
      ...[
        this.setPlayingSong$.subscribe((value) => {
          this.playingSong = value;

          if (!this.playList.find((song) => song.id == value.id))
            this.playList.push(value);
        }),
        this.addSongToList$.subscribe((value) => {
          if (!this.playList.find((song) => song.id == value.id))
            this.playList.push(value);
        }),
        this.removeSongFromList$.subscribe((value) => {
          this.playList.splice(
            this.playList.findIndex((song) => song.id == value.id),
            1
          );

          if (this.playList.length) {
            if (this.playingSong?.id == value.id) this.nextSong$.emit();
          } else this.playingSong = null;
        }),
      ]
    );
  }

  setPlayingSong$ = new EventEmitter<Song>(false);
  addSongToList$ = new EventEmitter<Song>(false);
  removeSongFromList$ = new EventEmitter<Song>(false);
  playSong$ = new EventEmitter<void>(false);
  pauseSong$ = new EventEmitter<void>(false);
  nextSong$ = new EventEmitter<void>(false);
  previousSong$ = new EventEmitter<void>(false);
  toggleRepeat$ = new EventEmitter<void>(false);
  toggleShuffle$ = new EventEmitter<void>(false);
  muteSlider$ = new EventEmitter<void>(false);

  PLAYING_SONG_STATE: 'PLAYING' | 'PAUSED' | 'LOADING' = 'PAUSED';
  REPEATE_STATE: 'NO_LOOP' | 'LOOP_ALL' | 'LOOP_ONE' = 'NO_LOOP';
  VOLUME_STATE: 'VOLUBLE' | 'MUTE' = 'VOLUBLE';

  subs: Subscription[] = [];

  playingSong?: Song | null;

  playList: Song[] = [];

  getHomeRecommendedSongs() {
    return this.http.get<Song[]>(this.BACKEND_URL + '/muziks/home/recommended');
  }

  getHomeTopTracksSongs() {
    return this.http.get<Song[]>(this.BACKEND_URL + '/muziks/home/top-tracks');
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) sub.unsubscribe();
  }
}
