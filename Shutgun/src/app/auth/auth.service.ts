import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  loggedInUser: User = {_id: '1', firstName:'Christian', lastName: 'K'} as User;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    console.log("Auth Service");

    return of(true).pipe( //returns a true observable that is true. Use the pipe function to delay and then use the tap function that runs a side effect without changing the observable
      delay(1000),
      tap(val => {
        console.log("test if this is running");
        this.isLoggedIn = true //changes loggedin to true before returning it
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
