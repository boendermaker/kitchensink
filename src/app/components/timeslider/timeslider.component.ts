import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { DateTime } from 'luxon';
import { distinctUntilChanged, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-timeslider',
  standalone: true,
  imports: [],
  templateUrl: './timeslider.component.html',
  styleUrl: './timeslider.component.scss'
})
export class TimesliderComponent implements OnInit, AfterViewInit {

  timeFrom: number = DateTime.now().minus({days: 1}).toMillis();
  timeTo: number = DateTime.now().toMillis();
  hostEl: HTMLElement;
  sliderContainer: HTMLElement;
  dateAxis: HTMLElement;
  tick: HTMLElement;
  range: HTMLElement;
  resizerLeft: HTMLElement;
  resizerRight: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    console.log();
  }

  ngAfterViewInit(): void {
    this.initElements();
    this.dragResizer('left');
    this.dragResizer('right');
  }

  //########################################################################

  initElements(): void {
    this.hostEl = this.el.nativeElement;
    this.sliderContainer = this.hostEl.querySelector('#timeslider');
    this.dateAxis = this.hostEl.querySelector('#dateaxis')
    this.range = this.hostEl.querySelector('#range');
    this.resizerLeft = this.hostEl.querySelector('#resizer-left');
    this.resizerRight = this.hostEl.querySelector('#resizer-right');
  }

  //########################################################################

  positionResizer(type: 'left'|'right', posX: number): void {
    if(type === 'left') {
      this.resizerLeft.style.left = posX + 'px';
    }
    if(type === 'right') {
      this.resizerRight.style.left = posX + 'px';
    }
  }

  //########################################################################

  dragResizer(type: 'left'|'right'): void {

    const resizer:HTMLElement = type === 'left' ? this.resizerLeft : this.resizerRight;

    fromEvent<MouseEvent>(resizer, 'mousedown').pipe(
      tap((e) => e.preventDefault()),
      
      switchMap(() => {
        const { width, right, left } = this.dateAxis.getBoundingClientRect();

        return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
          map(({ clientX }) => {
            const posX = clientX - left;
            console.log(posX);
            return posX;
          }),
          distinctUntilChanged(),
          takeUntil(
            fromEvent(this.documentRef, 'mouseup').pipe())
          );
        })

    )
    .subscribe({
      next: (value) => {
        this.positionResizer(type, value);
      }
    })


  }

  //########################################################################

  drawTicks(): void {

  }

  //########################################################################

}
