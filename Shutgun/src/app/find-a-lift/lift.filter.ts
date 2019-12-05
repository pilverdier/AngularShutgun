import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { Trip } from '../entities/trip';


@Pipe({name: 'filterLift'}) //Name you use to apply the filter
@Injectable()
export class FilterLift implements PipeTransform { //The search function runs every time a keystroke is entered into the search bar it is tied into
     transform(items: Trip[], args: any): any { //Args is what is searched for. We have it as any so we can see if it is a number or string. Transform is a method inherited from PipeTransform


  console.log('filterLift is running')

  if(args === undefined){
    return items
  }
  args = args.toLowerCase(); //changes search argument to lowercase to ensure that both cases are being searched after. The destination and origin are both made into lowercase too
  console.log('searching for string'+args)
  return items.filter(trip => trip.destination && trip.destination.toLowerCase().includes(args) || trip.origin && trip.origin.toLowerCase().includes(args) || trip.availableSeats >= args);
  /* Above filters the items so the origin and destination (which has to exist/be true) has to match or include the search string(arg). Furthermore the available seats has to be equal to or larger than the args (javascript can do this as a number like in Python????)
   Checking whether trip.destination or trip.origin is true only shows results where the variable exists*/
  }
 }
