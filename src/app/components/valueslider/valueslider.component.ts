import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';

interface IRect {
  hostRect: DOMRect;
  sliderContainerRect: DOMRect;
  dateAxisRect: DOMRect;
  rangeRect: DOMRect;
  resizerLeftRect: DOMRect;
  resizerRightRect: DOMRect;
  scaleRect: DOMRect;
  tickRect: DOMRect;
}

/**
 * inputs: minValue, maxValue
 * outputs: sliderLeftValue, sliderRightValue
 */
@Component({
  selector: 'app-valueslider',
  standalone: true,
  imports: [],
  templateUrl: './valueslider.component.html',
  styleUrl: './valueslider.component.scss'
})
export class ValueSliderComponent implements OnInit, AfterViewInit {

  @Input() set minValue(value: number) {
    this._minValue = Number(value);
  };
  @Input() set maxValue(value: number) {
    this._maxValue = Number(value);
  };
  @Output() sliderLeftValue: EventEmitter<number> = new EventEmitter();
  @Output() sliderRightValue: EventEmitter<number> = new EventEmitter();

  _minValue: number = null;
  _maxValue: number = null;

  hostEl: HTMLElement;
  sliderContainer: HTMLElement;
  dateAxis: HTMLElement;
  scale: HTMLElement;
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

  initElements(): void {
    this.hostEl = this.el.nativeElement;
    this.sliderContainer = this.hostEl.querySelector('#valueslider');
    this.dateAxis = this.hostEl.querySelector('#dateaxis')
    this.range = this.hostEl.querySelector('#range');
    this.resizerLeft = this.hostEl.querySelector('#resizer-left');
    this.resizerRight = this.hostEl.querySelector('#resizer-right');
    this.scale = this.hostEl.querySelector('#scale');
    this.tick = this.hostEl.querySelector('#tick');
  }

  //########################################################################

  getRect() {
    return {
      hostRect: this.hostEl.getBoundingClientRect(),
      sliderContainerRect: this.sliderContainer.getBoundingClientRect(),
      dateAxisRect: this.dateAxis.getBoundingClientRect(),
      rangeRect: this.range.getBoundingClientRect(),
      resizerLeftRect: this.resizerLeft.getBoundingClientRect(),
      resizerRightRect: this.resizerRight.getBoundingClientRect(),
      scaleRect: this.scale.getBoundingClientRect(),
      tickRect: this.tick.getBoundingClientRect()
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
    const {rangeRect, dateAxisRect} = this.getRect();
    //const rangeRect = this.range.getBoundingClientRect();
    
    const limitBounds = () => {
      if(posX <= 0) {
        this.range.style.left = 0 + 'px';
        this.positionResizer('left', 0);
        this.positionResizer('right', this.distance);
      }
      if(posX > dateAxisRect.width - rangeRect.width) {
        this.range.style.left = dateAxisRect.width - rangeRect.width + 'px';
        this.positionResizer('left', rangeRect.left - dateAxisRect.left);
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
    const resizerRect: DOMRect = resizer.getBoundingClientRect();
    const {dateAxisRect, resizerLeftRect, resizerRightRect} = this.getRect();

    const limitBounds = (type: 'left'|'right') => {
      if(posX <= 0) {
        resizer.style.left = 0 + 'px';
      }
      if(posX > dateAxisRect.width - resizerRect.width) {
        resizer.style.left = dateAxisRect.width - resizerRect.width + 'px';
      }
      if(type == 'right' && posX <= dateAxisRect.left - resizerRect.left + resizerRect.width) {
        resizer.style.left = dateAxisRect.left + resizerRect.width + 'px';
      }else {

      }
      /*if(this.distance < (resizerLeftRect.width + resizerRightRect.width)) {
        resizer.style.left = resizerLeftRect.left - dateAxisRect.left + resizerLeftRect.width + 'px';
      }*/
    }
    
    resizer.style.left = posX + 'px';
    limitBounds(type);
        
    this.positionToValue();
  }

  //########################################################################
  
  resizeRange(type: 'left'|'right'): void {
    this.distance = this.getResizerDistance();
    const {resizerLeftRect, dateAxisRect} = this.getRect();

    if(type == 'left') {
      this.range.style.left = resizerLeftRect.left - dateAxisRect.left + 'px';
      this.range.style.width = this.distance + 'px';
    }
    if(type == 'right') {
      this.range.style.width = this.distance + 'px';
    }
  }

  //########################################################################

  getResizerDistance(): number {
    const {resizerLeftRect, resizerRightRect, dateAxisRect} = this.getRect();

    const distance = Math.abs(((resizerRightRect.left - dateAxisRect.left) - (resizerLeftRect.left - dateAxisRect.left)));

    return distance;
  }

  //########################################################################

  positionToValue(): void {
    const {resizerLeftRect, resizerRightRect, dateAxisRect} = this.getRect();

      const leftPercent = (resizerLeftRect.left - dateAxisRect.left) / dateAxisRect.width;
      const rightPercent = (resizerRightRect.left - dateAxisRect.left) / dateAxisRect.width;

      const diff = this._maxValue - this._minValue;
      const valueLeft = this._minValue + diff * leftPercent;
      const valueRight = this._minValue + diff * rightPercent;

      this.sliderLeftValue.emit(valueLeft);
      this.sliderRightValue.emit(valueRight);

      /*console.log(
        this._minValue,
        this._maxValue,
        valueLeft,
        valueRight
      )*/
    
    /*for(let i=0; i<rangeMinutes; i++) {
      this.tickContainer.append(this.tick.cloneNode(true));
    }*/

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

}
