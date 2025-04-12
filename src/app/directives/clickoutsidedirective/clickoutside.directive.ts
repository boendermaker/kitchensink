import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[clickoutside]',
})
export class ClickOutsideDirective {
  constructor(private _elementRef: ElementRef) {}

  @Output()
  public clickoutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickoutside.emit(event);
    }
  }
}
