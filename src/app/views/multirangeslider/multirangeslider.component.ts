import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ValueSliderComponent } from "../../components/valueslider/valueslider.component";

@Component({
    selector: 'app-multirangeslider',
    standalone: true,
    templateUrl: './multirangeslider.component.html',
    styleUrl: './multirangeslider.component.scss',
    imports: [ValueSliderComponent],
})
export class MultirangeSliderComponent implements OnInit {

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
