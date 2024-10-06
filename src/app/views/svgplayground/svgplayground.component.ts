import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Renderer2, ViewContainerRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { combineAll, combineLatest, combineLatestAll, firstValueFrom, forkJoin, fromEvent, interval, map, mergeMap, Observable, switchMap, takeUntil, tap, timer } from 'rxjs';

interface IChangingValue {
  id: string;
  name: string;
  value: number;
}

@Component({
  selector: 'app-svgplayground',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './svgplayground.component.html',
  styleUrl: './svgplayground.component.scss'
})
export class SvgplaygroundComponent implements AfterViewInit {

  svg: SVGElement;
  svgContainer: HTMLElement;
  svgContentControl: FormControl = new FormControl('');
  changingValueSelectControl: FormControl = new FormControl('');
  svgElementModifier = {
    text: this.updateTextElement,
    rect: this.updateRectElement
  }
  changingValues: IChangingValue[] = [
    { id: '1234', name: 'Changing value 1', value: 0 },
    { id: '5678', name: 'Changing value 2', value: 0 },
    { id: '9012', name: 'Changing value 3', value: 0 }
  ]

  initialSVGContent: string = '';

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) {
  }

  async ngAfterViewInit(): Promise<void> {
    await this.setInitialSVGContent();
    this.initElements();
    this.updateChangingValues();
    this.render();
  }

  //###########################################

  async setInitialSVGContent(): Promise<void> {
    this.initialSVGContent = await this.loadSVGContent();
    this.svgContentControl.setValue(this.initialSVGContent);
  }

  //###########################################
  async loadSVGContent(): Promise<string> {
    return await firstValueFrom(this.http.get('/assets/media/svgplayground.svg', { responseType: 'text' }));
  }

  //###########################################

  initElements(): void {
    this.svgContainer = this.el.nativeElement.querySelector('#svgcontainer');
  }

  //###########################################

  addSvgElement(): void {
    const svgContent = this.svgContentControl.value;
    this.renderer.setProperty(this.svgContainer, 'innerHTML', svgContent);
    this.handleSVGEvents();
  }

  //###########################################

  svgMouseOver(): Observable<MouseEvent> {
    return fromEvent(this.svg, 'mouseover').pipe(
      tap((mouseOverEvent: MouseEvent) => {
        const target = mouseOverEvent.target as SVGElement;
        target.style.strokeWidth = '5';
        target.style.stroke = 'red';
        console.log('over')
        return mouseOverEvent;
      })
    )
  }

  //###########################################

  svgMouseLeave(): Observable<MouseEvent> {
    return fromEvent(this.svg, 'mouseout').pipe(
      map((mouseLeaveEvent: MouseEvent) => {
        const target = mouseLeaveEvent.target as SVGElement;
        target.style.stroke = 'none';
        return mouseLeaveEvent;
      })
    )
  }

  //###########################################

  svgMouseClick(): Observable<MouseEvent> {
    return fromEvent(this.svg, 'click').pipe(
      map((mouseClickEvent: MouseEvent) => this.addIdToSVGElement(mouseClickEvent))
    )
  }

  //###########################################

  addIdToSVGElement(mouseClickEvent: MouseEvent) {
    const target = mouseClickEvent.target as SVGElement;

    if(Object.keys(this.svgElementModifier).includes(target.tagName.toLocaleLowerCase()) && this.changingValueSelectControl.value) {
      console.log(target.dataset);
      target.setAttribute('data-changingvalueid', this.changingValueSelectControl.value);
      target.style.stroke = 'lightgreen';
      console.log('SVG ', this.svg)
      console.log('click', mouseClickEvent.target)
    }

    return mouseClickEvent;
  }

  //###########################################

  handleSVGEvents(): void {
    this.svg = this.el.nativeElement.querySelector('#svgcontainer').querySelector('svg');

    this.svgMouseOver().pipe(
      switchMap(() => this.svgMouseClick().pipe(takeUntil(this.svgMouseLeave()))),
    )
    .subscribe((event) => {
      console.log('Mouse over event', event);
    });

  }

  //###########################################

  updateChangingValues(): void {
    interval(1000).subscribe({
      next: () => {
        this.changingValues.forEach((changingValue) => {
          changingValue.value = Math.floor(Math.random() * 1000);
        })
        this.updateSVGElements();
      }
    })
  }

  //###########################################

  updateSVGElements(): void {

    this.changingValues.forEach((changingValue: IChangingValue) => {

      const svgElements = this.svg.querySelectorAll(`[data-changingvalueid="${changingValue.id.toString()}"]`);

      if(svgElements.length > 0) {

        svgElements.forEach((svgElement: SVGElement) => {
          this.svgElementModifier[svgElement.tagName.toLowerCase()](svgElement, changingValue.value);
        })

      }

    })
  }

  //###########################################

  updateTextElement(svgElement: SVGTextElement, value: string, options: {[p: string]: any}): void {
    svgElement.textContent = value;
  }

  //###########################################

  updateRectElement(svgElement: SVGRectElement, value: string, options: {[p: string]: any}): void {
    const maxHeight = parseInt(svgElement.getAttribute('height'));
    const currentHeight = svgElement.getBoundingClientRect().height;
    const newScale = Math.round((parseInt(value) / 1000) * 100);

    svgElement.style.transformOrigin = `${svgElement.x.baseVal.value}px ${svgElement.y.baseVal.value + maxHeight}px`;
    svgElement.style.transition = 'transform 1s';
    svgElement.style.transform = `scaleY(${newScale.toString()}%)`;
  }

  //###########################################

  render(): void {
    const svgContent = this.svgContentControl.value;
    this.renderer.setProperty(this.svgContainer, 'innerHTML', svgContent);
    this.updateChangingValues();
    this.handleSVGEvents();
  }

  //###########################################

}
