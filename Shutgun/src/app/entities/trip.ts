import { User } from './user';

export class Trip {
  _id: string;
  localFilter?: string; // Only used because the api cannot give me MY objects, but returns everything
  origin: string
  destination: string;
  availableSeats: number;
  departureTime: Date;
  owner: User;

  
}