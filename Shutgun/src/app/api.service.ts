import { Trip } from './entities/trip';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://angular2api2.azurewebsites.net/api/internships';

  constructor(private http: HttpClient) { }

  getAllTrips(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createTrip(trip: Trip) {
    trip.localFilter = 'Thomas'; //Local filter that filters away the data. Also change in the lift action ts!
    return this.http.post(this.baseUrl, trip);
  }

  deletetTrip(id: string) {
    return this.http.delete(this.baseUrl + '/' + id, {responseType: 'text'});
  }
  updateTrip(id: string){
    return this.http.put(this.baseUrl+'/'+id, {responseType: 'text'});
  }
}
