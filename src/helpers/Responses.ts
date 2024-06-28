interface APIResponse {
  status: number;
  data: unknown;
}

interface User {
  Id?: string;
  UserId: string;
  Username: string;
  Password: string;
  LegalName: string;
  Email: string;
  MobileNumber: string;
  Country: string;
  Type: string;
}

interface Location {
  Type: string;
  Coordinates: number[];
}

interface Discount {
  discountCode: string;
  discountPercentage: number;
}

interface Event {
  Id?: string;
  eventId?: string;
  eventName?: string;
  eventDescription?: string;
  eventBackgroundImage?: string;
  eventTotalSeats?: number;
  eventRegisteredSeats?: number;
  eventTicketPrice?: number;
  eventGenres?: string[];
  eventCollab?: string[];
  eventStartDate?: string;
  eventEndDate?: string;
  eventLocation?: Location;
  eventStatus?: string;
  eventCreatedBy?: string;
  eventAgeRestriction?: number;
  eventCountry?: string;
  eventDiscounts?: Discount[];
}

export type { APIResponse, User, Location, Discount, Event };
