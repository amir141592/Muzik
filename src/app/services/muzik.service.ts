import { Inject, Injectable } from '@angular/core';
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

  getHomeRecommendedSongs() {
    return this.http.get<Song[]>(this.BACKEND_URL + '/muziks/home/recommended');
  }

  getHomeTopTracksSongs() {
    return this.http.get<Song[]>(this.BACKEND_URL + '/muziks/home/top-tracks');
  }

  getSongTypeForImage(type: string) {
    switch (type) {
      case 'ALBUM':
        return 'albums';

      case 'SINGLE':
        return 'singles';

      case 'VIDEO':
        return 'videos';

      default:
        throw new Error('unknown song type');
    }
  }
}
