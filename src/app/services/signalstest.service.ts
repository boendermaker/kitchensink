import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private state$: BehaviorSubject<(string|number)[]> = new BehaviorSubject(null);

  constructor() { }

  getState(): Observable<(string|number)[]> {
    return this.state$.asObservable();
  }

  addStateItem(stateItem: string|number): void {
    this.state$.next([...this.state$.value, stateItem]);
  }

}
