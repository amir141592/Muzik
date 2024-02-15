import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MuzikEvent } from '../interfaces/muzik-event.interface';
import { MuzikService } from '../services/muzik.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'muzik-event-slider',
  standalone: true,
  imports: [],
  templateUrl: './event-slider.component.html',
  styleUrl: './event-slider.component.scss',
})
export class EventSliderComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly muzikService: MuzikService
  ) {
    this.$muteSlider$ = muzikService.muteSlider$.subscribe(() => this.mute());
  }

  private videoElement?: HTMLVideoElement;

  @Input({ required: true }) events: MuzikEvent[] = [];

  VOLUME_STATE: 'VOLUBLE' | 'MUTE' = 'MUTE';

  $muteSlider$: Subscription;

  currentEvent: MuzikEvent = {
    id: '',
    type: 'VIDEO',
    title: 'concerts next month',
    description: "Don't miss your favorite artist's concert",
    file: '',
  };

  currentEventIndex: number = 0;

  toggleVolume(): void {
    if (this.VOLUME_STATE == 'MUTE') this.unmute();
    else this.mute();
  }

  unmute(): void {
    if (this.videoElement) {
      this.muzikService.pauseSong$.emit();
      this.videoElement.volume = 1;
      this.VOLUME_STATE = 'VOLUBLE';
    }
  }

  mute(): void {
    if (this.videoElement) {
      this.videoElement.volume = 0;
      this.VOLUME_STATE = 'MUTE';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentEvent = changes['events'].currentValue[0];
  }

  ngAfterViewInit(): void {
    this.videoElement = this.document.querySelector(
      '#videoPlayer'
    ) as HTMLVideoElement;
  }

  ngOnDestroy(): void {
    this.$muteSlider$?.unsubscribe();
  }
}
