import { Injectable } from '@angular/core';
import { IUser } from '@app/views/webcomponent/webcomponent.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  state$: BehaviorSubject<{[p: string]: IUser[]}> = new BehaviorSubject({});

  constructor() { }

  setState(namespace: string, user: IUser[]) {
    this.state$.next({...this.state$.value, [namespace]: user});
  }

  getState(namespace: string) {
    return this.state$.value[namespace];
  }

  getStateLength(namespace: string): number {
    return this.state$.value[namespace].length;
  }

  removeState(namespace: string) {
    if(this.state$.value.hasOwnProperty(namespace)) {
      delete this.state$.value[namespace];
      this.state$.next(this.state$.value);
    }
  }


}
