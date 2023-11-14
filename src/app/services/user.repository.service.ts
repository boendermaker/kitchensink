import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(
    private http: HttpClient
  ) { }

  fetchMultipleUsers(amount: number): Observable<IUser[]> {
    const url = `https://random-data-api.com/api/v2/users?size=${amount}&response_type=json`;
    return this.http.get<IUser[]>(url);
  }

  fetchSingleUser(): Observable<IUser[]> {
    const url = `https://random-data-api.com/api/v2/users?size=1&response_type=json`;
    return this.http.get<IUser[]>(url);
  }

}