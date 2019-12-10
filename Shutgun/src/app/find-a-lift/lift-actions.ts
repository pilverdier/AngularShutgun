import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';
import { Trip } from '../entities/trip';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class LiftActions {
constructor(private ngRedux: NgRedux<AppState>, private apiService: ApiService,
  private router: Router /* Autowired */) {}


  static SET_TYPE: string = 'SET_TYPE';
  static MyAction: string = 'MY_ACTION';
  static CREATE_TRIP: string = 'CREATE_TRIP';
  static DELETE_TRIP: string = 'DELETE_TRIP';
  static IS_LOADING: string = 'IS_LOADING';
  static GET_TRIPS: string = 'GET_TRIPS';

  getTrips() {
    this.ngRedux.dispatch({
      type: LiftActions.IS_LOADING,
      payload: true
    });
    this.apiService.getAllTrips().subscribe((result: any[]) => {
      const myTrips = result.filter(x => x.localFilter === 'Thomas'); // Hack to only display my data. This also needs to be changed in the api ts file.
      this.ngRedux.dispatch({
        type: LiftActions.GET_TRIPS,
        payload: myTrips
      });
    });
  }

  createTrip(trip: Trip): void {
    this.ngRedux.dispatch({
      type: LiftActions.IS_LOADING,
      payload: true
    });
    this.apiService.createTrip(trip).subscribe((tripObjFromApi: Trip) => {

      this.ngRedux.dispatch({
        type: LiftActions.CREATE_TRIP,
        payload: tripObjFromApi
      });
      this.router.navigate(['/portal/findalift']);
    });
    console.log("Hi");
  }

  deleteTrip(id: string): void {
    this.ngRedux.dispatch({
      type: LiftActions.IS_LOADING,
      payload: true
    });
    
    this.apiService.deletetTrip(id).subscribe(() => {
      this.ngRedux.dispatch({
        type: LiftActions.DELETE_TRIP,
        payload: id
      });
    });
  }

  callMyAction(isLift: boolean): void {
    this.ngRedux.dispatch({
      type: LiftActions.MyAction,
      payload: isLift
    });
  }

  setType(isLift: boolean): void { //This is an example of an action
    this.ngRedux.dispatch({
      type: LiftActions.SET_TYPE,
      payload: isLift
    });
  }
}
