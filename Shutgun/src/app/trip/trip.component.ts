import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../entities/trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input() trip: Trip;
  @Output() tripDeleteEmitter: EventEmitter<any> = new EventEmitter<any>(); //You need one output statement for every output you want to make. This output will only emit delete


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onDeleteLift(id: string) {
    this.tripDeleteEmitter.emit(id); //You want to call the emitter that bubbles up to the next component
  }
  onEditTrip(id: string) {
    this.router.navigate(['portal/findalift/edit', id])
  }
}
