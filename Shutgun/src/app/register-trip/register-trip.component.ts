import { LiftActions } from './../find-a-lift/lift-actions';
import { AuthService } from './../auth/auth.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../entities/trip';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';

@Component({
  selector: 'app-register-trip',
  templateUrl: './register-trip.component.html',
  styleUrls: ['./register-trip.component.scss']
})
export class RegisterTripComponent implements OnInit {
  tripForm: FormGroup;
  public isLoading: boolean;
  
  constructor(private fb: FormBuilder, private router: Router, private data: DataService,
    private auth: AuthService, private liftActions: LiftActions, private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    this.tripForm = this.fb.group({
      'origin': ['', Validators.required],
      'destination': ['', Validators.required],
      'availableSeats': ['', Validators.required],
      'departureTime': ['', Validators.required],
    });

    this.ngRedux.select(x => x.trips).subscribe(state => {
      this.isLoading = state.isLoading;
    });

  }

  onTripSubmit() : void {
    if (this.tripForm.valid) {
      let trip = this.tripForm.value as Trip;
      trip.owner = this.auth.loggedInUser;

      // this.data.addTrip(trip);
      this.liftActions.createTrip(trip);
      
    }
  }
}
