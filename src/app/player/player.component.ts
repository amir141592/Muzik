import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Song } from '../interfaces/song.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'muzik-player',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements AfterViewInit, OnDestroy, OnChanges {
  private audioElement?: HTMLAudioElement;
  private seekerElement?: HTMLInputElement;
  private volumeElement?: HTMLInputElement;

  AUDIO_STATE: 'PLAYING' | 'PAUSED' | 'LOADING' = 'PAUSED';
  VOLUME_STATE: 'VOLUBLE' | 'MUTE' = 'VOLUBLE';

  audioCurrentTime$ = new Observable<number>((sub) => {
    setInterval(() => sub.next(this.audioElement?.currentTime), 1000);
  });

  $audioCurrentTime$?: Subscription;

  @Input({ required: true }) playingSong: Song = {
    id: '',
    type: 'SINGLE',
    parentalAdvisory: false,
    title: '',
    artist: '',
    coArtists: [],
    album: '',
    image: '',
    file: '',
  };

  private play(): void {
    this.audioElement?.play().then(() => {
      this.AUDIO_STATE = 'PLAYING';

      this.audioCurrentTime$.subscribe((value) => {
        if (this.seekerElement) this.seekerElement.value = String(value);
      });
    });
  }

  private pause(): void {
    this.audioElement?.pause();
    this.$audioCurrentTime$?.unsubscribe();
    this.AUDIO_STATE = 'PAUSED';
  }

  loadingSong() {
    this.AUDIO_STATE = 'LOADING';
  }

  loadedSong(): void {
    if (this.seekerElement && this.audioElement) {
      this.seekerElement.value = '0';
      this.seekerElement.max = String(this.audioElement.duration);
      this.play();
    }
  }

  endedSong(): void {
    if (this.seekerElement && this.audioElement) {
      this.seekerElement.value = '0';
      this.audioElement.currentTime = 0;
      this.AUDIO_STATE = 'PAUSED';
    }
  }

  togglePlay(): void {
    if (this.AUDIO_STATE == 'PLAYING') this.pause();
    else if (this.AUDIO_STATE == 'PAUSED') this.play();
  }

  seek(): void {
    if (this.seekerElement && this.audioElement)
      this.audioElement.currentTime = Number(this.seekerElement.value);
  }

  toggleVolume(): void {
    if (this.VOLUME_STATE == 'VOLUBLE') this.mute();
    else this.unmute();
  }

  mute(): void {
    if (this.audioElement && this.volumeElement) {
      this.audioElement.volume = 0;
      this.VOLUME_STATE = 'MUTE';
    }
  }

  unmute(): void {
    if (this.audioElement && this.volumeElement) {
      if (this.volumeElement.value !== '0')
        this.audioElement.volume = Number(this.volumeElement.value);
      else {
        this.audioElement.volume = 0.5;
        this.volumeElement.value = '0.5';
      }

      this.VOLUME_STATE = 'VOLUBLE';
    }
  }

  changeVolume(): void {
    if (this.audioElement && this.volumeElement) {
      this.audioElement.volume = Number(this.volumeElement.value);

      if (this.volumeElement.value == '0') this.VOLUME_STATE = 'MUTE';
      else this.VOLUME_STATE = 'VOLUBLE';
    }
  }

  ngOnChanges(): void {
    Object.freeze(this.playingSong);
  }

  ngAfterViewInit(): void {
    this.audioElement = document.querySelector(
      '#audio-player'
    ) as HTMLAudioElement;

    this.seekerElement = document.querySelector('#seeker') as HTMLInputElement;
    this.volumeElement = document.querySelector('#volume') as HTMLInputElement;
  }

  ngOnDestroy(): void {
    this.$audioCurrentTime$?.unsubscribe();
  }
}
