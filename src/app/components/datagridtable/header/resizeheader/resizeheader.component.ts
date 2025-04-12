import { AfterContentInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-datagridtable-resizehandle',
  standalone: true,
  imports: [],
  templateUrl: './resizeheader.component.html',
  styleUrl: './resizeheader.component.scss'
})
export class DatagridTableResizeHeaderComponent implements AfterContentInit {

  @Input() hidden: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterContentInit() {
    //console.log('RESIZE ', this.elementRef.nativeElement);
  }

}
