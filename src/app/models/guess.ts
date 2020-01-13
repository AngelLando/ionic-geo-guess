import { Point } from 'leaflet';

export class Guess {
    _id: string;
    created_at: string;
    location: {
      coordinates: number[];
      type: string;
    };
    user_id: string;
    thumbnail_id: string;
    score: number;
  }

