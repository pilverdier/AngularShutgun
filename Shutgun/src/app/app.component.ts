import { LiftActions } from './find-a-lift/lift-actions';
import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'shotgun 2';
  

  constructor(private liftActions: LiftActions){}

  ngOnInit(): void {
    this.liftActions.getTrips();
  }
  
}
