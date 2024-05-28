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
  EventId: string;
  EventName: string;
  EventDescription: string;
  EventBackgroundImage?: string;
  EventTotalSeats: number;
  EventRegisteredSeats: number;
  EventTicketPrice?: number;
  EventGenres: string[];
  EventCollab?: string[];
  EventStartDate: string;
  EventEndDate: string;
  EventLocation: Location;
  EventStatus: string;
  EventCreatedBy: string;
  EventAgeRestriction?: number;
  EventCountry?: string;
  EventDiscounts?: Discount[];
}

export type { User, Location, Discount, Event };
