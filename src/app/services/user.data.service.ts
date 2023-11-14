import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser, UserRepositoryService } from './user.repository.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  repositoryService = inject(UserRepositoryService);

  private stateChanged$: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  stateChanged_: Observable<Boolean> = this.stateChanged$.asObservable();

  private loading$: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  loading_: Observable<Boolean> = this.loading$.asObservable();
  
  private userState$: BehaviorSubject<IUser[]> = new BehaviorSubject([]);
  userState_: Observable<IUser[]> = this.userState$.asObservable();

  constructor() { }

  //####################################################################

  getUsers(amount: number) {
    this.loading$.next(true);
    this.repositoryService.fetchMultipleUsers(amount ?? 1)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (user: IUser[]) => {
        this.userState$.next(user);
        this.loading$.next(false);
        this.stateChanged$.next(true);
      }
    });
  }

  //####################################################################

  removeUserById(id: number): void {
    this.userState$.next(this.userState$.value.filter(r => r.id === id));
    this.stateChanged$.next(true);
  }

  //####################################################################

  getFirstUser(): IUser {
    return this.userState$.value[0];
  }

  //####################################################################

  getLastUser(): IUser {
    const user = this.userState$.value;
    return user[user.length-1];
  }

  //####################################################################

  getUserCount(): number {
    return this.userState$.value.length;
  }

  //####################################################################

  changeUserValueById(id: number, key: string, value: string|number): void {
    const changedUsers = this.userState$.value.map((currentUser: IUser) => {
      if(currentUser.id === id) {
        currentUser[key] = value;
      }
      return currentUser;
    })
    this.userState$.next(changedUsers);
    this.stateChanged$.next(true);
  }

  //####################################################################

}
