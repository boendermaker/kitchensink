import { time } from '@amcharts/amcharts5';
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
  tickContainer: HTMLElement;
  tick: HTMLElement;
  range: HTMLElement;
  resizerLeft: HTMLElement;
  resizerRight: HTMLElement;
  distance: number;
  isBound: boolean = false;

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
    this.render();
  }

  //########################################################################

  render(): void {
    this.dragResizer('left');
    this.dragResizer('right');
    this.dragRange();
    this.resizeRange('left');
    this.resizeRange('right');
    this.positionToValue();
  }

  //########################################################################

  initElements(): void {
    this.hostEl = this.el.nativeElement;
    this.sliderContainer = this.hostEl.querySelector('#timeslider');
    this.dateAxis = this.hostEl.querySelector('#dateaxis')
    this.range = this.hostEl.querySelector('#range');
    this.resizerLeft = this.hostEl.querySelector('#resizer-left');
    this.resizerRight = this.hostEl.querySelector('#resizer-right');
    this.tickContainer = this.hostEl.querySelector('#tick-container');
    this.tick = this.hostEl.querySelector('#tick');
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
        this.resizeRange(type);
      }
    })

  }

  //########################################################################

  dragRange(): void {
    
    fromEvent<MouseEvent>(this.range, 'mousedown').pipe(
      tap((e) => e.preventDefault()),
      switchMap(() => {
        
        const { width, right, left } = this.dateAxis.getBoundingClientRect();

        return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
          map(({ clientX, pageX }) => {
            this.isBound = false;
            const posX = clientX - left - this.distance / 2;
            return posX;
          }),
          distinctUntilChanged(),
          takeUntil(
            fromEvent(this.documentRef, 'mouseup').pipe())
          );

      })
    ).subscribe({
      next: (value: number) => {
        this.positionRange(value);
      }
    })

  }

  //########################################################################

  positionRange(posX: number): void {
    const rangeRect = this.range.getBoundingClientRect();
    const limitBounds = () => {
      if(posX <= 0) {
        this.range.style.left = 0 + 'px';
        this.positionResizer('left', 0);
        this.positionResizer('right', this.distance);
      }
      if(posX > this.dateAxis.getBoundingClientRect().width - this.range.getBoundingClientRect().width) {
        this.range.style.left = this.dateAxis.getBoundingClientRect().width - this.range.getBoundingClientRect().width + 'px';
        this.positionResizer('left', rangeRect.left - this.dateAxis.getBoundingClientRect().left);
      }
    }

    this.range.style.left = posX + 'px';
    this.positionResizer('left', posX);
    this.positionResizer('right', posX + this.distance);
    limitBounds();
  }

  //########################################################################

  positionResizer(type: 'left'|'right', posX: number): void {
    const resizer: HTMLElement = type == 'left' ? this.resizerLeft : this.resizerRight;
    const limitBounds = (type: 'left'|'right') => {
      if(posX <= 0) {
        resizer.style.left = 0 + 'px';
      }
      if(posX > this.dateAxis.getBoundingClientRect().width - resizer.getBoundingClientRect().width) {
        resizer.style.left = this.dateAxis.getBoundingClientRect().width - resizer.getBoundingClientRect().width + 'px';
      }
      if(this.distance <= (this.resizerLeft.getBoundingClientRect().width + this.resizerRight.getBoundingClientRect().width)) {
        resizer.style.left = this.range.getBoundingClientRect().left + 'px';
      }
    }

    resizer.style.left = posX + 'px';
    limitBounds(type);
    this.positionToValue();
  }

  //########################################################################
  
  resizeRange(type: 'left'|'right'): void {
    this.distance = this.getResizerDistance();

    if(type == 'left') {
      this.range.style.left = this.resizerLeft.getBoundingClientRect().left - this.dateAxis.getBoundingClientRect().left + 'px';
      this.range.style.width = this.distance + 'px';
    }
    if(type == 'right') {
      this.range.style.width = this.distance + 'px';
    }
  }

  //########################################################################

  getResizerDistance(): number {
    const resizerLeftRect = this.resizerLeft.getBoundingClientRect();
    const resizerRightRect = this.resizerRight.getBoundingClientRect();
    const dateAxisRect = this.dateAxis.getBoundingClientRect();

    const distance = Math.abs(((resizerRightRect.left - dateAxisRect.left) - (resizerLeftRect.left - dateAxisRect.left)));

    return distance;
  }

  //########################################################################

  positionToValue(): void {

    const resizerLeftRect = this.resizerLeft.getBoundingClientRect();
    const resizerRightRect = this.resizerRight.getBoundingClientRect();
    const dateAxisRect = this.dateAxis.getBoundingClientRect();

    const leftPercent = (resizerLeftRect.left - dateAxisRect.left) / dateAxisRect.width;
    const rightPercent = (resizerRightRect.left - dateAxisRect.left) / dateAxisRect.width;

    const timeDiff = this.timeTo - this.timeFrom;
    const valueLeft = this.timeFrom + timeDiff * leftPercent;
    const valueRight = this.timeTo + timeDiff * rightPercent;

    console.log(
      this.timeFrom,
      this.timeTo,
      valueLeft,
      valueRight,
      DateTime.fromMillis(valueLeft).toFormat('dd.MM.yyyy HH:mm:ss'),
      DateTime.fromMillis(valueRight).toFormat('dd.MM.yyyy HH:mm:ss')
    )

    
    /*for(let i=0; i<rangeMinutes; i++) {
      this.tickContainer.append(this.tick.cloneNode(true));
    }*/

  }

  //########################################################################

}
