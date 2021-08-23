import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserContext } from 'src/app/shared/models/user-context/user.context';

@Injectable({
  providedIn: 'root'
})
export class UsercontextService {
  private _currentUserSubject: BehaviorSubject<UserContext>;
  currentUserObservable: Observable<UserContext>;
  constructor() {
    let userContext = localStorage.getItem('currentUser');

    this._currentUserSubject = new BehaviorSubject<UserContext>((userContext == undefined || userContext == null) ? userContext : JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserObservable = this._currentUserSubject.asObservable();
   }

   get currentUser(): UserContext {
    return this._currentUserSubject.value;
  }

  set currentUser(user: UserContext) {
    if (user)
      localStorage.setItem('currentUser', JSON.stringify(user));
    else
      localStorage.removeItem('currentUser');
    this._currentUserSubject.next(user);
  }
}
