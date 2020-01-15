export class Thumbnail {
    _id: string;
    title: string;
    img: string;
    created_at: string;
    location: {
      coordinates: number[];
      type: string;
    };
    user_id: string;
    numberOfDays: number;
    username?: string;
  }

