export interface User {
  name: string;
  surname: string;
  email: string;
  phone: string;
  id: number;
  date: number;
  eventsCount: number;
  takenTimes: [];
  nextEvent: number;
}
