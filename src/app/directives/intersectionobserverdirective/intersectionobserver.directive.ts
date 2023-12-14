import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {delay, filter} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

/**
* <div style="height: 400px; overflow-y: scroll; border:1px solid #CC0000;">
*    <div *ngFor="let item of longList" style="width: 300px; padding:24px; border:1px solid #666; border-radius: 5px; margin-bottom: 24px;">
*        <div>{{item?.first_name}} {{item?.last_name}}</div>
*        <div>{{item?.address?.zip_code}} {{item?.address?.city}}</div>
*    </div>
*    <div observevisibility [debounceTime]="3000" (currentstate)="onState($event)" style="width: 300px; padding: 24px;"><mat-progress-bar mode="indeterminate"></mat-progress-bar></div>
* </div>
*/
@UntilDestroy()
@Directive({
  selector: '[observevisibility]',
})
export class ObserveVisibilityDirective implements OnDestroy, OnInit, AfterViewInit {
  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  @Input() debounceTime = 0;
  @Input() threshold = 1;
  @Output() currentstate: EventEmitter<{visible: boolean; element: HTMLElement}> = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.createObserver();
  }

  ngAfterViewInit() {
    this.startObservingElements();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }

  private isVisible(element: HTMLElement) {
    return new Promise((resolve) => {
      const observer = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1);
        observer.disconnect();
      });

      observer.observe(element);
    });
  }

  private createObserver() {
    const options = {
      rootMargin: '0px',
      threshold: this.threshold,
    };

    const isIntersecting = (entry: IntersectionObserverEntry) => entry.isIntersecting || entry.intersectionRatio > 0;

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (isIntersecting(entry)) {
          this.subject$.next({entry, observer});
        }
      });
    }, options);
  }

  private startObservingElements() {
    if (!this.observer) {
      return;
    }

    const visEls: any[] = [];

    this.observer.observe(this.element.nativeElement);

    this.subject$
      .pipe(delay(this.debounceTime), filter(Boolean), untilDestroyed(this))
      .subscribe(async ({entry, observer}) => {
        const target = entry.target as HTMLElement;
        const isStillVisible = await this.isVisible(target);

        if (isStillVisible) {
          this.currentstate.emit({visible: true, element: target});
          //observer.unobserve(target);
        }
      });
  }
}
