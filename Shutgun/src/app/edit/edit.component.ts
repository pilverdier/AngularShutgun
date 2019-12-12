import { LiftActions } from './../find-a-lift/lift-actions';
import { AuthService } from './../auth/auth.service';
import { DataService } from './../data.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../entities/trip';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  tripForm: FormGroup
  @Input() trip: Trip

  constructor(private fb: FormBuilder, private router: Router, private data: DataService,
    private auth: AuthService, private liftActions: LiftActions, private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    this.tripForm = this.fb.group({
      'origin': [this.trip.origin, Validators.required],
      'destination': [this.trip.destination, Validators.required],
      'availableSeats': [this.trip.availableSeats, Validators.required],
      'departureTime': [this.trip.departureTime, Validators.required],
    });

}}
