import { LiftActions } from './lift-actions';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';
import { Trip } from '../entities/trip';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-find-a-lift',
  templateUrl: './find-a-lift.component.html',
  styleUrls: ['./find-a-lift.component.scss']
})
export class FindALiftComponent implements OnInit {
  private isLift: boolean;
  private lifts: Trip[];
  value = 'Clear me';

  constructor(private liftActions: LiftActions,
              private ngRedux: NgRedux<AppState>) { } //this dependency injects the dataService object so it can be used in the webpage

    // Subscribe to the store on initialisation.
  ngOnInit() {
    this.ngRedux.select(x => x.trips).subscribe((state) => {
      this.isLift = state.isLift;
      this.lifts = state.lifts;
    });
  }

  onDeleteLift(id: string): void {
    this.liftActions.deleteTrip(id);
    // this.dataService.deleteTrip(id);
  }

  onTestClick(): void {
    // dispatch action by calling an action creator.
    this.liftActions.setType(true);
  }
}
