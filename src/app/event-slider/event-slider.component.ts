import {
  Component,
  ElementRef,
  Inject,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  input,
} from '@angular/core';
import { MuzikEvent } from '../interfaces/muzik-event.interface';
import { MuzikService } from '../services/muzik.service';
import { Subscription, timer } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'muzik-event-slider',
  standalone: true,
  imports: [],
  templateUrl: './event-slider.component.html',
  styleUrl: './event-slider.component.scss',
})
export class EventSliderComponent implements OnChanges, OnDestroy {
  constructor(
    private readonly muzikService: MuzikService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.$muteSlider$ = muzikService.muteSlider$.subscribe(() => this.mute());
  }

  @ViewChild('VIDEO_PLAYER') VIDEO_PLAYER?: ElementRef<HTMLVideoElement>;

  // @Input({ required: true }) events!: MuzikEvent[];
  events = input.required<MuzikEvent[]>();

  VOLUME_STATE: 'VOLUBLE' | 'MUTE' = 'MUTE';

  $muteSlider$: Subscription;
  $currentEventTimer$?: Subscription;

  currentEvent: MuzikEvent = {
    id: '1',
    type: 'VIDEO',
    title: 'concerts next month',
    description: "Don't miss your favorite artist's concert",
    file: '',
  };

  currentEventIndex: number = 0;

  private setNewTimer() {
    this.$currentEventTimer$?.unsubscribe();

    if (!isPlatformServer(this.platformId) && this.currentEvent.time)
      this.$currentEventTimer$ = timer(this.currentEvent.time).subscribe(() =>
        this.next()
      );

    // if (this.currentEvent.time)
    //   this.$currentEventTimer$ = timer(this.currentEvent.time).subscribe(() =>
    //     this.next()
    //   );
  }

  toggleVolume(): void {
    if (this.VOLUME_STATE == 'MUTE') this.unmute();
    else this.mute();
  }

  unmute(): void {
    if (this.VIDEO_PLAYER) {
      this.muzikService.pauseSong$.emit();
      this.VIDEO_PLAYER.nativeElement.volume = 1;
      this.VOLUME_STATE = 'VOLUBLE';
    }
  }

  mute(): void {
    if (this.VIDEO_PLAYER) {
      this.VIDEO_PLAYER.nativeElement.volume = 0;
      this.VOLUME_STATE = 'MUTE';
    }
  }

  next(): void {
    if (this.currentEventIndex != this.events().length - 1)
      this.currentEvent = this.events()[++this.currentEventIndex];
    else this.currentEvent = this.events()[(this.currentEventIndex = 0)];

    this.setNewTimer();

    if (this.currentEvent.type == 'VIDEO') {
      this.VOLUME_STATE = 'MUTE';
      this.mute();
    }
  }

  slide(index: number): void {
    this.currentEvent = this.events()[index];
    this.currentEventIndex = index;
    this.setNewTimer();

    if (this.currentEvent.type == 'VIDEO') {
      this.VOLUME_STATE = 'MUTE';
      this.mute();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentEvent = changes['events'].currentValue[0];
    this.setNewTimer();
  }

  ngOnDestroy(): void {
    this.$muteSlider$?.unsubscribe();
  }
}
