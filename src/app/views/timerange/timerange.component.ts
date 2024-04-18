import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ValueSliderComponent } from "../../components/valueslider/valueslider.component";

@Component({
    selector: 'app-timerange',
    standalone: true,
    templateUrl: './timerange.component.html',
    styleUrl: './timerange.component.scss',
    imports: [ValueSliderComponent]
})
export class TimerangeComponent implements OnInit {

    valueLeft: number;
    valueRight: number;

    constructor(private cdr: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.cdr.detectChanges();
    }

    leftValue(value: number): void {
        //console.log('LEFT ', value)
        this.valueLeft = value;
    }

    rightValue(value: number): void {
        //console.log('RIGHT ', value)
        this.valueRight = value;
    }

}
