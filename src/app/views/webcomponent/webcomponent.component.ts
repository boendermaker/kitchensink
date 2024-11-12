import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, delay } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

export interface IUser {
    "id": number,
    "uid": string,
    "password": string,
    "first_name": string,
    "last_name": string,
    "username": string,
    "email": string,
    "avatar": string,
    "gender": string,
    "phone_number": string,
    "social_insurance_number": number,
    "date_of_birth": string,
    "employment": {
        "title": string,
        "key_skill": string
    },
    "address": {
        "city": string,
        "street_name": string,
        "street_address": string,
        "zip_code": number,
        "state": string,
        "country": string,
        "coordinates": {
            "lat": number,
            "lng": number
        }
    },
    "credit_card": {
        "cc_number": number
    },
    "subscription": {
        "plan": string,
        "status": string,
        "payment_method": string,
        "term": string
    }
}

@UntilDestroy()
@Component({
  selector: 'app-webcomponent',
  templateUrl: './webcomponent.component.html',
  styleUrls: ['./webcomponent.component.scss']
})
export class WebcomponentComponent implements OnInit, AfterViewInit {

  @ViewChild('webcdatatest') webcdatatest: Element;

  randomData: any[];
  randomDataColumns: any[] = [
    {key: 'index', label: 'Nr'},
    {key: 'first_name', label: 'First name'},
    {key: 'last_name', label: 'Last name'},
    {key: 'username', label: 'Username'},
    {key: 'password', label: 'Password'}
  ];
  randomDataColumnsSelection: SelectionModel<any[]>;
  randomDataString: string;
  randomDataColumnsString: string;
  isLoading: boolean = false;
  meshAngleSpeed: number = 0.01;
  meshRotationSpeed: number = 0.01;
  meshRadius: number = 5;
  meshControls = {
    meshAngleControl: new FormControl(),
    meshRotationSpeedControl:new FormControl(),
    meshRadiusControl: new FormControl()
  }
  meshSlideFormGroup: FormGroup = new FormGroup(this.meshControls);


  constructor(private http: HttpClient) {
    this.randomData = []
    this.randomDataString = '';
    this.randomDataColumnsString = '';
    this.randomDataColumnsSelection = new SelectionModel<any[]>(
      true, // <- multi-select
      [], // <- Initial selections
      true, // <- emit an event on selection change
    );
  }

  ngOnInit(): void {
    this.handleSlideFormGroup();
    this.handleColumnSelection();
  }

  ngAfterViewInit(): void {
    console.log(this.webcdatatest, this.randomDataColumnsSelection)
  }

  handleSlideFormGroup(): void {
    this.meshSlideFormGroup.valueChanges.pipe(untilDestroyed(this)).subscribe({
      next: (formState) => {
        this.meshAngleSpeed = formState.meshAngleControl ?? 0.01;
        this.meshRotationSpeed = formState.meshRotationSpeedControl ?? 0.01;
        this.meshRadius = formState.meshRadiusControl ?? 3;
      }
    })
  }

  fetchUsers(amount: number): Observable<IUser[]> {
    const url = `https://random-data-api.com/api/v2/users?size=${amount}&response_type=json`;
    return this.http.get<IUser[]>(url);
  }

  handleColumnSelection(): void {
    this.randomDataColumnsSelection.changed.pipe(untilDestroyed(this)).subscribe({
      next: (selection) => {
        this.randomDataColumnsString = JSON.stringify(this.randomDataColumnsSelection.selected);
      }
    })
  }

  setRandomData(): void {
    this.isLoading = true;
    this.fetchUsers(this.randomNumberRange(5,50))
    .pipe(
      delay(2000),
      untilDestroyed(this)
    ).subscribe({
      next: (userArray) => {
        this.randomDataString = JSON.stringify(userArray);
        //this.randomDataColumnsString = JSON.stringify(this.randomDataColumns);
        this.isLoading = false;
      }
    })
  }

  randomNumberRange(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  logWebC(): void {
    console.log(this.webcdatatest, this.randomDataColumnsSelection.selected);
  }

}
