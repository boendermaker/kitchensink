import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { CompositionClassA } from './compositiona.class';
import { CompositionClassB } from './compositionb.class';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrl: './composition.component.scss',
  standalone: false,
})
export class CompositionComponent implements OnInit, AfterViewInit, AfterContentInit {

  compositionClassA: CompositionClassA = new CompositionClassA(this);
  compositionClassB: CompositionClassB = new CompositionClassB(this);

  demoPropA: number = 0;
  demoPropB: number = 0;
  demoPropC: number = 0;
  privatesValue: string = '---';
  code: string = '';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    this.compositionClassA.onInit();
    this.compositionClassB.onInit();
    this.render();
  }

  ngAfterViewInit(): void {
    this.compositionClassA.afterViewInit();
    this.compositionClassB.afterViewInit();
  }

  ngAfterContentInit(): void {
    this.compositionClassA.afterContentInit();
    this.compositionClassB.afterContentInit();
  }

  //################################################

  render(): void {
    this.compositionClassA.render();
    this.compositionClassB.render();
  }

  //################################################

  getPrivateFunction() {
    return this.privateFunction.bind(this);
  }

  //################################################

  private privateFunction(value: string): void {
    if(value) {
      this.privatesValue = value;
    }else {
      this.privatesValue = 'Private function called';
    }
  }

  //################################################


}
