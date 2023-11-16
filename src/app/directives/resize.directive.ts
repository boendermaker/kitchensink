import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Output } from '@angular/core';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[resizable]',
})
export class ResizeDirective implements AfterViewInit {
  @Output() resizechanged: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>
  ) {

  }

  ngAfterViewInit(): void {

    fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown').pipe(
      tap((e) => e.preventDefault()),
      switchMap(() => {
  
        const { width, right } = this.elementRef.nativeElement
          .closest('th')!
          .getBoundingClientRect();
  
        return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
          map(({ clientX }) => width + clientX - right),
          distinctUntilChanged(),
          takeUntil(fromEvent(this.documentRef, 'mouseup'))
        );
      })
  
    ).subscribe({
      next: (width) => {
        this.resizechanged.emit({el: this.elementRef.nativeElement, resizedto: width});
      }
    })

  }

}


