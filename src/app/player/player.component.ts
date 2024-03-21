import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Song } from '../interfaces/song.interface';
import { TimePipe } from '../pipes/time.pipe';
import { MuzikService } from '../services/muzik.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'muzik-player',
  standalone: true,
  imports: [TitleCasePipe, TimePipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnChanges, OnDestroy {
  constructor(public muzikService: MuzikService) {
    this.$subs$.push(
      ...[
        muzikService.playSong$.subscribe(() => this.play()),
        muzikService.pauseSong$.subscribe(() => this.pause()),
        muzikService.nextSong$.subscribe(() => this.next()),
        muzikService.previousSong$.subscribe(() => this.previous()),
        muzikService.setPlayingSong$.subscribe(() => {
          if (muzikService.playingSong)
            this.playingSong = muzikService.playingSong;
        }),
      ]
    );
  }

  @ViewChild('AUDIO_PLAYER', { static: true })
  audioElement?: ElementRef<HTMLAudioElement>;

  @ViewChild('SEEKER', { static: true })
  seekerElement?: ElementRef<HTMLInputElement>;

  @ViewChild('VOLUME', { static: true })
  volumeElement?: ElementRef<HTMLInputElement>;

  playingSong: Song = this.muzikService.playingSong ?? {
    id: '1',
    type: 'ALBUM',
    parentalAdvisory: false,
    title: '',
    artist: '',
    coArtists: [],
    album: '',
    image: '',
    file: '',
  };

  $subs$: Subscription[] = [];
  $currentTime$?: Subscription;

  audioCurrentTime?: number | string = 0;
  audioDuration: number = 0;
  volume: number = 1;

  private play(): void {
    this.audioElement?.nativeElement.play().then(() => {
      this.muzikService.PLAYING_SONG_STATE = 'PLAYING';
      this.muzikService.muteSlider$.emit();

      this.$currentTime$ = interval(10).subscribe(() => {
        if (this.seekerElement && this.audioElement)
          this.audioCurrentTime = this.seekerElement.nativeElement.value =
            String(this.audioElement.nativeElement.currentTime);
      });
    });
  }

  private pause(): void {
    this.audioElement?.nativeElement.pause();
    this.$currentTime$?.unsubscribe();
    this.muzikService.PLAYING_SONG_STATE = 'PAUSED';
  }

  next(): void {
    const indexNextSong = this.muzikService.playList.findIndex(
      (song) => song.id == this.playingSong?.id
    );

    if (indexNextSong != this.muzikService.playList.length - 1)
      this.muzikService.setPlayingSong$.emit(
        this.muzikService.playList[indexNextSong + 1]
      );
    else this.muzikService.setPlayingSong$.emit(this.muzikService.playList[0]);
  }

  previous(): void {
    const indexPreviousSong = this.muzikService.playList.findIndex(
      (song) => song.id == this.playingSong?.id
    );

    if (indexPreviousSong != 0)
      this.muzikService.setPlayingSong$.emit(
        this.muzikService.playList[indexPreviousSong - 1]
      );
    else
      this.muzikService.setPlayingSong$.emit(
        this.muzikService.playList[this.muzikService.playList.length - 1]
      );
  }

  replayPlayingSong(): void {
    this.seek(0);
    this.play();
  }

  changeRepeat(): void {
    switch (this.muzikService.REPEATE_STATE) {
      case 'NO_LOOP':
        this.muzikService.REPEATE_STATE = 'LOOP_ALL';
        break;

      case 'LOOP_ALL':
        this.muzikService.REPEATE_STATE = 'LOOP_ONE';
        break;

      case 'LOOP_ONE':
        this.muzikService.REPEATE_STATE = 'NO_LOOP';
        break;
    }
  }

  loadingSong() {
    this.muzikService.PLAYING_SONG_STATE = 'LOADING';
  }

  loadedSong(): void {
    if (this.seekerElement && this.audioElement) {
      this.seekerElement.nativeElement.value = '0';
      this.seekerElement.nativeElement.max = String(
        this.audioElement.nativeElement.duration
      );
      this.audioDuration = this.audioElement.nativeElement.duration;
      this.$currentTime$?.unsubscribe();
      this.play();
    }
  }

  endedSong(): void {
    if (this.seekerElement && this.audioElement) {
      this.seekerElement.nativeElement.value = '0';
      this.audioElement.nativeElement.currentTime = 0;
      this.muzikService.PLAYING_SONG_STATE = 'PAUSED';

      if (
        this.muzikService.REPEATE_STATE == 'NO_LOOP' &&
        this.muzikService.playList.findIndex(
          (song) => song.id == this.playingSong.id
        ) !=
          this.muzikService.playList.length - 1
      )
        this.next();
      else if (this.muzikService.REPEATE_STATE == 'LOOP_ALL') this.next();
      else if (this.muzikService.REPEATE_STATE == 'LOOP_ONE')
        this.replayPlayingSong();
    }
  }

  togglePlay(): void {
    if (this.muzikService.PLAYING_SONG_STATE == 'PLAYING') this.pause();
    else if (this.muzikService.PLAYING_SONG_STATE == 'PAUSED') this.play();
  }

  seek(time?: number): void {
    if (!time && this.seekerElement && this.audioElement)
      this.audioElement.nativeElement.currentTime = Number(
        this.seekerElement.nativeElement.value
      );
    else if (time && this.seekerElement && this.audioElement)
      this.seekerElement.nativeElement.value = String(
        (this.audioElement.nativeElement.currentTime = time)
      );
  }

  toggleVolume(): void {
    if (this.muzikService.VOLUME_STATE == 'VOLUBLE') this.mute();
    else this.unmute();
  }

  mute(): void {
    if (this.audioElement) {
      this.audioElement.nativeElement.volume = 0;
      this.muzikService.VOLUME_STATE = 'MUTE';
    }
  }

  unmute(): void {
    if (this.audioElement && this.volumeElement) {
      if (this.volumeElement.nativeElement.value !== '0')
        this.audioElement.nativeElement.volume = Number(
          this.volumeElement.nativeElement.value
        );
      else {
        this.audioElement.nativeElement.volume = 0.5;
        this.volumeElement.nativeElement.value = '0.5';
      }

      this.muzikService.VOLUME_STATE = 'VOLUBLE';
    }
  }

  changeVolume(): void {
    if (this.audioElement && this.volumeElement) {
      this.audioElement.nativeElement.volume = Number(
        this.volumeElement.nativeElement.value
      );
      this.volume = Number(this.volumeElement.nativeElement.value);

      if (this.volumeElement.nativeElement.value == '0')
        this.muzikService.VOLUME_STATE = 'MUTE';
      else this.muzikService.VOLUME_STATE = 'VOLUBLE';
    }
  }

  ngOnChanges(): void {
    Object.freeze(this.playingSong);
  }

  ngOnDestroy(): void {
    this.$currentTime$?.unsubscribe();
    for (const sub of this.$subs$) sub.unsubscribe();
  }
}
