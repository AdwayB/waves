import { Event } from './Responses';

const EventTestData: Event[] = [
  {
    eventId: '1',
    eventName: 'Test Event',
    eventDescription: 'A showcase of emerging artists in the rock genre.',
    eventBackgroundImage: 'url-to-image-1.jpg',
    eventTotalSeats: 100,
    eventRegisteredSeats: 25,
    eventTicketPrice: 20.0,
    eventGenres: ['Rock'],
    eventCollab: ['5'],
    eventStartDate: '2024-05-20T08:00:00Z',
    eventEndDate: '2024-05-21T10:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [40.7128, -74.006],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '1',
    eventAgeRestriction: 18,
    eventCountry: 'USA',
    eventDiscounts: [{ discountCode: 'EARLYBIRD10', discountPercentage: 10 }],
  },
  {
    eventId: '2',
    eventName: 'Test Event 2',
    eventDescription: 'Live performances from top pop artists.',
    eventBackgroundImage: 'url-to-image-2.jpg',
    eventTotalSeats: 150,
    eventRegisteredSeats: 50,
    eventTicketPrice: 25.0,
    eventGenres: ['Pop'],
    eventCollab: ['4'],
    eventStartDate: '2024-05-08T14:00:00Z',
    eventEndDate: '2024-05-09T16:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [34.0522, -118.2437],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '2',
    eventAgeRestriction: 16,
    eventCountry: 'USA',
    eventDiscounts: [{ discountCode: 'SUMMER15', discountPercentage: 15 }],
  },
  {
    eventId: '3',
    eventName: 'Test Event 3',
    eventDescription: 'An evening of jazz and soul.',
    eventBackgroundImage: 'url-to-image-3.jpg',
    eventTotalSeats: 200,
    eventRegisteredSeats: 75,
    eventTicketPrice: 30.0,
    eventGenres: ['Jazz', 'Soul'],
    eventCollab: ['2'],
    eventStartDate: '2024-05-12T12:00:00Z',
    eventEndDate: '2024-05-13T14:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [51.5074, -0.1278],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '3',
    eventAgeRestriction: 21,
    eventCountry: 'UK',
    eventDiscounts: [{ discountCode: 'JAZZ20', discountPercentage: 20 }],
  },
  {
    eventId: '4',
    eventName: 'Test Event 4',
    eventDescription: 'Electronic and techno night.',
    eventBackgroundImage: 'url-to-image-4.jpg',
    eventTotalSeats: 300,
    eventRegisteredSeats: 150,
    eventTicketPrice: 35.0,
    eventGenres: ['Electronic', 'Techno'],
    eventCollab: ['3'],
    eventStartDate: '2024-05-10T09:00:00Z',
    eventEndDate: '2024-05-11T11:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [52.52, 13.405],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '4',
    eventAgeRestriction: 18,
    eventCountry: 'Germany',
    eventDiscounts: [{ discountCode: 'TECHNO25', discountPercentage: 25 }],
  },
  {
    eventId: '5',
    eventName: 'Test Event 5',
    eventDescription: 'Classical music performances by renowned orchestras.',
    eventBackgroundImage: 'url-to-image-5.jpg',
    eventTotalSeats: 250,
    eventRegisteredSeats: 100,
    eventTicketPrice: 40.0,
    eventGenres: ['Classical'],
    eventCollab: ['1'],
    eventStartDate: '2024-05-26T05:00:00Z',
    eventEndDate: '2024-05-27T07:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [48.8566, 2.3522],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '5',
    eventAgeRestriction: 12,
    eventCountry: 'France',
    eventDiscounts: [{ discountCode: 'CLASSIC30', discountPercentage: 30 }],
  },
  {
    eventId: '6',
    eventName: 'Test Event 6',
    eventDescription: 'Hip-hop night featuring emerging and top artists.',
    eventBackgroundImage: 'url-to-image-6.jpg',
    eventTotalSeats: 220,
    eventRegisteredSeats: 120,
    eventTicketPrice: 45.0,
    eventGenres: ['Hip-Hop'],
    eventCollab: ['5'],
    eventStartDate: '2024-05-18T05:00:00Z',
    eventEndDate: '2024-05-19T07:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [-73.935242, 40.73061],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '5',
    eventAgeRestriction: 18,
    eventCountry: 'USA',
    eventDiscounts: [{ discountCode: 'HIPHOP10', discountPercentage: 10 }],
  },
  {
    eventId: '7',
    eventName: 'Test Event 7',
    eventDescription: 'Blues night with soulful performances.',
    eventBackgroundImage: 'url-to-image-7.jpg',
    eventTotalSeats: 180,
    eventRegisteredSeats: 80,
    eventTicketPrice: 50.0,
    eventGenres: ['Blues'],
    eventCollab: ['2'],
    eventStartDate: '2024-05-16T06:00:00Z',
    eventEndDate: '2024-05-17T08:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [-90.071532, 29.951065],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '4',
    eventAgeRestriction: 21,
    eventCountry: 'USA',
    eventDiscounts: [{ discountCode: 'BLUES20', discountPercentage: 20 }],
  },
  {
    eventId: '8',
    eventName: 'Test Event 8',
    eventDescription: 'An exclusive folk music retreat.',
    eventBackgroundImage: 'url-to-image-8.jpg',
    eventTotalSeats: 120,
    eventRegisteredSeats: 40,
    eventTicketPrice: 55.0,
    eventGenres: ['Folk', 'Indie'],
    eventCollab: ['3'],
    eventStartDate: '2024-05-08T10:00:00Z',
    eventEndDate: '2024-05-09T12:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [-123.123456, 49.28273],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '3',
    eventAgeRestriction: 16,
    eventCountry: 'Canada',
    eventDiscounts: [{ discountCode: 'FOLK15', discountPercentage: 15 }],
  },
  {
    eventId: '9',
    eventName: 'Test Event 9',
    eventDescription: 'Reggae and dancehall party.',
    eventBackgroundImage: 'url-to-image-9.jpg',
    eventTotalSeats: 130,
    eventRegisteredSeats: 70,
    eventTicketPrice: 60.0,
    eventGenres: ['Reggae', 'Dancehall'],
    eventCollab: ['4'],
    eventStartDate: '2024-05-24T02:00:00Z',
    eventEndDate: '2024-05-25T04:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [-76.792, 18.1096],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '2',
    eventAgeRestriction: 18,
    eventCountry: 'Jamaica',
    eventDiscounts: [{ discountCode: 'REGGAE20', discountPercentage: 20 }],
  },
  {
    eventId: '10',
    eventName: 'Test Event 10',
    eventDescription: 'Country music festival featuring top stars and emerging talents.',
    eventBackgroundImage: 'url-to-image-10.jpg',
    eventTotalSeats: 300,
    eventRegisteredSeats: 200,
    eventTicketPrice: 65.0,
    eventGenres: ['Country'],
    eventCollab: ['2'],
    eventStartDate: '2024-05-14T11:00:00Z',
    eventEndDate: '2024-05-15T13:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [-97.516428, 35.46756],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '1',
    eventAgeRestriction: 18,
    eventCountry: 'USA',
    eventDiscounts: [{ discountCode: 'COUNTRY30', discountPercentage: 30 }],
  },
  {
    eventId: '11',
    eventName: 'Test Event 11',
    eventDescription: 'An exclusive night of indie music performances.',
    eventBackgroundImage: 'url-to-image-11.jpg',
    eventTotalSeats: 160,
    eventRegisteredSeats: 60,
    eventTicketPrice: 70.0,
    eventGenres: ['Indie'],
    eventCollab: ['1'],
    eventStartDate: '2024-05-18T09:00:00Z',
    eventEndDate: '2024-05-19T11:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [51.507351, -0.127758],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '1',
    eventAgeRestriction: 18,
    eventCountry: 'UK',
    eventDiscounts: [{ discountCode: 'INDIE25', discountPercentage: 25 }],
  },
  {
    eventId: '12',
    eventName: 'Test Event 12',
    eventDescription: 'A spectacular opera night.',
    eventBackgroundImage: 'url-to-image-12.jpg',
    eventTotalSeats: 200,
    eventRegisteredSeats: 120,
    eventTicketPrice: 80.0,
    eventGenres: ['Opera'],
    eventCollab: ['2'],
    eventStartDate: '2024-05-26T01:00:00Z',
    eventEndDate: '2024-05-27T03:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [41.9028, 12.4964],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '2',
    eventAgeRestriction: 21,
    eventCountry: 'Italy',
    eventDiscounts: [{ discountCode: 'OPERA20', discountPercentage: 20 }],
  },
  {
    eventId: '13',
    eventName: 'Test Event 13',
    eventDescription: 'An exciting night of R&B and soul.',
    eventBackgroundImage: 'url-to-image-13.jpg',
    eventTotalSeats: 190,
    eventRegisteredSeats: 90,
    eventTicketPrice: 85.0,
    eventGenres: ['R&B', 'Soul'],
    eventCollab: ['3'],
    eventStartDate: '2024-05-12T08:00:00Z',
    eventEndDate: '2024-05-13T10:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [-74.006, 40.7128],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '3',
    eventAgeRestriction: 18,
    eventCountry: 'USA',
    eventDiscounts: [{ discountCode: 'RNB25', discountPercentage: 25 }],
  },
  {
    eventId: '14',
    eventName: 'Test Event 14',
    eventDescription: 'A night of intense metal music.',
    eventBackgroundImage: 'url-to-image-14.jpg',
    eventTotalSeats: 220,
    eventRegisteredSeats: 110,
    eventTicketPrice: 90.0,
    eventGenres: ['Metal'],
    eventCollab: ['3'],
    eventStartDate: '2024-05-16T10:00:00Z',
    eventEndDate: '2024-05-17T12:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [35.6895, 139.6917],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '4',
    eventAgeRestriction: 21,
    eventCountry: 'Japan',
    eventDiscounts: [{ discountCode: 'METAL30', discountPercentage: 30 }],
  },
  {
    eventId: '15',
    eventName: 'Test Event 15',
    eventDescription: 'Traditional music and dance from around the world.',
    eventBackgroundImage: 'url-to-image-15.jpg',
    eventTotalSeats: 250,
    eventRegisteredSeats: 125,
    eventTicketPrice: 95.0,
    eventGenres: ['World Music'],
    eventCollab: ['5'],
    eventStartDate: '2024-05-14T07:00:00Z',
    eventEndDate: '2024-05-15T09:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [-3.7038, 40.4168],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '5',
    eventAgeRestriction: 18,
    eventCountry: 'Spain',
    eventDiscounts: [{ discountCode: 'WORLD20', discountPercentage: 20 }],
  },
  {
    eventId: '16',
    eventName: 'Test Event 16',
    eventDescription: 'Electronic dance music festival with top DJs.',
    eventBackgroundImage: 'url-to-image-16.jpg',
    eventTotalSeats: 300,
    eventRegisteredSeats: 200,
    eventTicketPrice: 100.0,
    eventGenres: ['EDM'],
    eventCollab: ['1'],
    eventStartDate: '2024-05-10T13:00:00Z',
    eventEndDate: '2024-05-11T15:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [37.7749, -122.4194],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '5',
    eventAgeRestriction: 21,
    eventCountry: 'USA',
    eventDiscounts: [{ discountCode: 'EDM30', discountPercentage: 30 }],
  },
  {
    eventId: '17',
    eventName: 'Test Event 17',
    eventDescription: 'Celebrating the best of K-pop.',
    eventBackgroundImage: 'url-to-image-17.jpg',
    eventTotalSeats: 180,
    eventRegisteredSeats: 90,
    eventTicketPrice: 105.0,
    eventGenres: ['K-pop'],
    eventCollab: ['4'],
    eventStartDate: '2024-05-24T06:00:00Z',
    eventEndDate: '2024-05-25T08:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [37.5665, 126.978],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '4',
    eventAgeRestriction: 18,
    eventCountry: 'South Korea',
    eventDiscounts: [{ discountCode: 'KPOP25', discountPercentage: 25 }],
  },
  {
    eventId: '18',
    eventName: 'Test Event 18',
    eventDescription: 'All-star reggaeton concert.',
    eventBackgroundImage: 'url-to-image-18.jpg',
    eventTotalSeats: 200,
    eventRegisteredSeats: 100,
    eventTicketPrice: 110.0,
    eventGenres: ['Reggaeton'],
    eventCollab: ['4'],
    eventStartDate: '2024-05-22T07:00:00Z',
    eventEndDate: '2024-05-23T09:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [18.4655, -66.1057],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '3',
    eventAgeRestriction: 21,
    eventCountry: 'Puerto Rico',
    eventDiscounts: [{ discountCode: 'REGGAETON20', discountPercentage: 20 }],
  },
  {
    eventId: '19',
    eventName: 'Test Event 19',
    eventDescription: 'Latin jazz and salsa night.',
    eventBackgroundImage: 'url-to-image-19.jpg',
    eventTotalSeats: 220,
    eventRegisteredSeats: 110,
    eventTicketPrice: 115.0,
    eventGenres: ['Latin Jazz', 'Salsa'],
    eventCollab: ['1'],
    eventStartDate: '2024-05-22T03:00:00Z',
    eventEndDate: '2024-05-23T05:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [-74.006, 40.7128],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '2',
    eventAgeRestriction: 18,
    eventCountry: 'USA',
    eventDiscounts: [{ discountCode: 'SALSA25', discountPercentage: 25 }],
  },
  {
    eventId: '20',
    eventName: 'Test Event 20',
    eventDescription: 'A night dedicated to avant-garde music.',
    eventBackgroundImage: 'url-to-image-20.jpg',
    eventTotalSeats: 150,
    eventRegisteredSeats: 75,
    eventTicketPrice: 120.0,
    eventGenres: ['Avant-garde'],
    eventCollab: ['2'],
    eventStartDate: '2024-05-20T04:00:00Z',
    eventEndDate: '2024-05-21T06:00:00Z',
    eventLocation: {
      Type: 'Point',
      Coordinates: [55.7558, 37.6173],
    },
    eventStatus: 'Scheduled',
    eventCreatedBy: '1',
    eventAgeRestriction: 18,
    eventCountry: 'Russia',
    eventDiscounts: [{ discountCode: 'AVANTGARDE30', discountPercentage: 30 }],
  },
];

export { EventTestData };
