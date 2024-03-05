import {
  Component,
  ElementRef,
  Input,
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
  constructor(private readonly muzikService: MuzikService) {
    this.$subs$.push(
      ...[
        muzikService.playSong$.subscribe(() => this.play()),
        muzikService.pauseSong$.subscribe(() => this.pause()),
      ]
    );
  }

  @ViewChild('AUDIO_PLAYER', { static: true })
  audioElement?: ElementRef<HTMLAudioElement>;

  @ViewChild('SEEKER', { static: true })
  seekerElement?: ElementRef<HTMLInputElement>;

  @ViewChild('VOLUME', { static: true })
  volumeElement?: ElementRef<HTMLInputElement>;

  @Input({ required: true }) playingSong!: Song;

  AUDIO_STATE: 'PLAYING' | 'PAUSED' | 'LOADING' = 'PAUSED';
  VOLUME_STATE: 'VOLUBLE' | 'MUTE' = 'VOLUBLE';

  $subs$: Subscription[] = [];
  $currentTime$?: Subscription;

  audioCurrentTime?: number | string = 0;
  audioDuration: number = 0;
  volume: number = 1;

  private play(): void {
    this.audioElement?.nativeElement.play().then(() => {
      this.AUDIO_STATE = 'PLAYING';
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
    this.AUDIO_STATE = 'PAUSED';
  }

  nextSong(): void {
    this.muzikService.nextSong$.emit();
  }

  loadingSong() {
    this.AUDIO_STATE = 'LOADING';
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
      this.AUDIO_STATE = 'PAUSED';
      this.muzikService.nextSong$.emit();
    }
  }

  togglePlay(): void {
    if (this.AUDIO_STATE == 'PLAYING') this.pause();
    else if (this.AUDIO_STATE == 'PAUSED') this.play();
  }

  seek(): void {
    if (this.seekerElement && this.audioElement)
      this.audioElement.nativeElement.currentTime = Number(
        this.seekerElement.nativeElement.value
      );
  }

  toggleVolume(): void {
    if (this.VOLUME_STATE == 'VOLUBLE') this.mute();
    else this.unmute();
  }

  mute(): void {
    if (this.audioElement) {
      this.audioElement.nativeElement.volume = 0;
      this.VOLUME_STATE = 'MUTE';
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

      this.VOLUME_STATE = 'VOLUBLE';
    }
  }

  changeVolume(): void {
    if (this.audioElement && this.volumeElement) {
      this.audioElement.nativeElement.volume = Number(
        this.volumeElement.nativeElement.value
      );
      this.volume = Number(this.volumeElement.nativeElement.value);

      if (this.volumeElement.nativeElement.value == '0')
        this.VOLUME_STATE = 'MUTE';
      else this.VOLUME_STATE = 'VOLUBLE';
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
