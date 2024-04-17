import { Component } from '@angular/core';
import { TimesliderComponent } from "../../components/timeslider/timeslider.component";

@Component({
    selector: 'app-timerange',
    standalone: true,
    templateUrl: './timerange.component.html',
    styleUrl: './timerange.component.scss',
    imports: [TimesliderComponent]
})
export class TimerangeComponent {

}
