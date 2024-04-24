import { Event, User } from './Responses';

const UserTestData: User[] = [
  {
    UserId: '1',
    Username: 'admin1',
    Password: '$2a$12$QWb3B5ti3tcHbMqXWx9lme/Ipsoe1p/Ov/hi0Jad5SFS68CUPbR3K', // bcrypt hash example
    LegalName: 'Admin One',
    Email: 'admin1@gmail.com',
    MobileNumber: '+1234567890',
    Country: 'USA',
    Type: 'Admin',
  },
  {
    UserId: '2',
    Username: 'admin2',
    Password: '$2a$12$G0J4TJ1DmFaQow1wEzovhu/UaxDfRr.BsMhkCjRX8/jMyhoC2lo6y',
    LegalName: 'Admin Two',
    Email: 'admin2@gmail.com',
    MobileNumber: '+1234567891',
    Country: 'Canada',
    Type: 'Admin',
  },
  {
    UserId: '3',
    Username: 'admin3',
    Password: '$2a$12$XolQ07ZOWwqPso1oqM0QDOQVtxwz9CmF9v3fAiJ4nNR/TD5QShxOe',
    LegalName: 'Admin Three',
    Email: 'admin3@gmail.com',
    MobileNumber: '+1234567892',
    Country: 'UK',
    Type: 'Admin',
  },
  {
    UserId: '4',
    Username: 'admin4',
    Password: '$2a$12$TiX3OeK3uCDciv53w.zvXehlj7ZbkTjIgISnNRAw6g6P/Qkp1g7C.',
    LegalName: 'Admin Four',
    Email: 'admin4@gmail.com',
    MobileNumber: '+1234567893',
    Country: 'Australia',
    Type: 'Admin',
  },
  {
    UserId: '5',
    Username: 'admin5',
    Password: '$2a$12$SZZ5zKHzX8eFvVonH.E0b.ezUWjF95Do2txk6rKkFvTMnOHICh3C6',
    LegalName: 'Admin Five',
    Email: 'admin5@gmail.com',
    MobileNumber: '+1234567894',
    Country: 'Germany',
    Type: 'Admin',
  },
  {
    UserId: '6',
    Username: 'user1',
    Password: '$2a$12$GzPlN4hFpe/20CQc4T3Pje3wKHzA9VM5uH4Fx7AB8JpYUwLk9mggC',
    LegalName: 'User One',
    Email: 'user1@gmail.com',
    MobileNumber: '+1234567895',
    Country: 'France',
    Type: 'User',
  },
  {
    UserId: '7',
    Username: 'user2',
    Password: '$2a$12$HHuxLec8fLjTBm5fZ8yPI.IGKKpPK/mHRBMRCHTftIXWz3uxsQwwi',
    LegalName: 'User Two',
    Email: 'user2@gmail.com',
    MobileNumber: '+1234567896',
    Country: 'Spain',
    Type: 'User',
  },
  {
    UserId: '8',
    Username: 'user3',
    Password: '$2a$12$Q0J4xx6i5wNx6z/6I3PwEOJIzZv48OkFxMDePXxVZV3AElT9K7D3K',
    LegalName: 'User Three',
    Email: 'user3@gmail.com',
    MobileNumber: '+1234567897',
    Country: 'Italy',
    Type: 'User',
  },
  {
    UserId: '9',
    Username: 'user4',
    Password: '$2a$12$i/1D83puxT0.kmFD5fG2POUMjQydR2Q3nBmNFbW/h2kYDBfP1SYG6',
    LegalName: 'User Four',
    Email: 'user4@gmail.com',
    MobileNumber: '+1234567898',
    Country: 'Brazil',
    Type: 'User',
  },
  {
    UserId: '10',
    Username: 'user5',
    Password: '$2a$12$uA6ZzZ8Nx3npESFHzMsZQeXvKhX7Y2swLw3fAQ6IluJ1l3Y8lVnMS',
    LegalName: 'User Five',
    Email: 'user5@gmail.com',
    MobileNumber: '+1234567899',
    Country: 'India',
    Type: 'User',
  },
  {
    UserId: '11',
    Username: 'user6',
    Password: '$2a$12$nBm7N7rQbPAr93qV3n7/uOoLzKvHzL.xV4F8XxvGXZuQwumK1k/7e',
    LegalName: 'User Six',
    Email: 'user6@gmail.com',
    MobileNumber: '+1234567800',
    Country: 'China',
    Type: 'User',
  },
  {
    UserId: '12',
    Username: 'user7',
    Password: '$2a$12$sE9T5Vm5X.7R9T63A0pYeOONxjrSg2DOpFqQ9ph0ADYX8hwY8Go7m',
    LegalName: 'User Seven',
    Email: 'user7@gmail.com',
    MobileNumber: '+1234567801',
    Country: 'Russia',
    Type: 'User',
  },
  {
    UserId: '13',
    Username: 'user8',
    Password: '$2a$12$6.VI9SsnaOznWrtNUpJoJOKF7dKEdXrTpFPJc2IHT5zcHrHp/ZzVu',
    LegalName: 'User Eight',
    Email: 'user8@gmail.com',
    MobileNumber: '+1234567802',
    Country: 'South Africa',
    Type: 'User',
  },
  {
    UserId: '14',
    Username: 'user9',
    Password: '$2a$12$Ffzg.c5uG1f7pIkwHvAWLeQrL9FsieBJxM.S3Gb04kGJzD9K5BbFu',
    LegalName: 'User Nine',
    Email: 'user9@gmail.com',
    MobileNumber: '+1234567803',
    Country: 'Nigeria',
    Type: 'User',
  },
  {
    UserId: '15',
    Username: 'user10',
    Password: '$2a$12$bBQPxZ.8W5ZDqZqx0sODzOcHtuj9lqyN/LXe2YKo0n8Ad0.nvy4I6',
    LegalName: 'User Ten',
    Email: 'user10@gmail.com',
    MobileNumber: '+1234567804',
    Country: 'Egypt',
    Type: 'User',
  },
  {
    UserId: '16',
    Username: 'user11',
    Password: '$2a$12$R1njFulD8c0Fb7pYxsv7xej3kTiWi3C6nJrX5lD.qyzkTymBCpx6W',
    LegalName: 'User Eleven',
    Email: 'user11@gmail.com',
    MobileNumber: '+1234567805',
    Country: 'Mexico',
    Type: 'User',
  },
  {
    UserId: '17',
    Username: 'user12',
    Password: '$2a$12$ZxxxD3h0N/bp3xVvMzBwjeY8nVf3qCJ92nq1k1C6H5g0UDY.yAxE6',
    LegalName: 'User Twelve',
    Email: 'user12@gmail.com',
    MobileNumber: '+1234567806',
    Country: 'Japan',
    Type: 'User',
  },
  {
    UserId: '18',
    Username: 'user13',
    Password: '$2a$12$y2S/xDQf5G6OyfpUnKjuQeWtZRPZVw0ph9QvGnpYBz0fwKvBW4VOa',
    LegalName: 'User Thirteen',
    Email: 'user13@gmail.com',
    MobileNumber: '+1234567807',
    Country: 'Australia',
    Type: 'User',
  },
  {
    UserId: '19',
    Username: 'user14',
    Password: '$2a$12$a7jB9F0tHfIyR/pRS/8beO6X3KqFtwsqzwhZ2BJCqEKxpLVjOG96C',
    LegalName: 'User Fourteen',
    Email: 'user14@gmail.com',
    MobileNumber: '+1234567808',
    Country: 'New Zealand',
    Type: 'User',
  },
  {
    UserId: '20',
    Username: 'user15',
    Password: '$2a$12$1IXzNIAkBqpb7pMZ9PHBHehCjM5kUy0FkHuR.K6PpbDl8wC1zLJZC',
    LegalName: 'User Fifteen',
    Email: 'user15@gmail.com',
    MobileNumber: '+1234567809',
    Country: 'Canada',
    Type: 'User',
  },
];

const EventTestData: Event[] = [
  {
    EventId: '1',
    EventName: 'Test Event',
    EventDescription: 'A showcase of emerging artists in the rock genre.',
    EventBackgroundImage: 'url-to-image-1.jpg',
    EventTotalSeats: 100,
    EventRegisteredSeats: 25,
    EventTicketPrice: 20.0,
    EventGenres: ['Rock'],
    EventCollab: ['5'],
    EventStartDate: '2024-05-01T00:00:00Z',
    EventEndDate: '2024-05-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [40.7128, -74.006],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '1',
    EventAgeRestriction: 18,
    EventCountry: 'USA',
    EventDiscounts: [{ discountCode: 'EARLYBIRD10', discountPercentage: 10 }],
  },
  {
    EventId: '2',
    EventName: 'Test Event 2',
    EventDescription: 'Live performances from top pop artists.',
    EventBackgroundImage: 'url-to-image-2.jpg',
    EventTotalSeats: 150,
    EventRegisteredSeats: 50,
    EventTicketPrice: 25.0,
    EventGenres: ['Pop'],
    EventCollab: ['4'],
    EventStartDate: '2024-06-01T00:00:00Z',
    EventEndDate: '2024-06-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [34.0522, -118.2437],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '2',
    EventAgeRestriction: 16,
    EventCountry: 'USA',
    EventDiscounts: [{ discountCode: 'SUMMER15', discountPercentage: 15 }],
  },
  {
    EventId: '3',
    EventName: 'Test Event 3',
    EventDescription: 'An evening of jazz and soul.',
    EventBackgroundImage: 'url-to-image-3.jpg',
    EventTotalSeats: 200,
    EventRegisteredSeats: 75,
    EventTicketPrice: 30.0,
    EventGenres: ['Jazz', 'Soul'],
    EventCollab: ['2'],
    EventStartDate: '2024-07-01T00:00:00Z',
    EventEndDate: '2024-07-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [51.5074, -0.1278],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '3',
    EventAgeRestriction: 21,
    EventCountry: 'UK',
    EventDiscounts: [{ discountCode: 'JAZZ20', discountPercentage: 20 }],
  },
  {
    EventId: '4',
    EventName: 'Test Event 4',
    EventDescription: 'Electronic and techno night.',
    EventBackgroundImage: 'url-to-image-4.jpg',
    EventTotalSeats: 300,
    EventRegisteredSeats: 150,
    EventTicketPrice: 35.0,
    EventGenres: ['Electronic', 'Techno'],
    EventCollab: ['3'],
    EventStartDate: '2024-08-01T00:00:00Z',
    EventEndDate: '2024-08-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [52.52, 13.405],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '4',
    EventAgeRestriction: 18,
    EventCountry: 'Germany',
    EventDiscounts: [{ discountCode: 'TECHNO25', discountPercentage: 25 }],
  },
  {
    EventId: '5',
    EventName: 'Test Event 5',
    EventDescription: 'Classical music performances by renowned orchestras.',
    EventBackgroundImage: 'url-to-image-5.jpg',
    EventTotalSeats: 250,
    EventRegisteredSeats: 100,
    EventTicketPrice: 40.0,
    EventGenres: ['Classical'],
    EventCollab: ['1'],
    EventStartDate: '2024-09-01T00:00:00Z',
    EventEndDate: '2024-09-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [48.8566, 2.3522],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '5',
    EventAgeRestriction: 12,
    EventCountry: 'France',
    EventDiscounts: [{ discountCode: 'CLASSIC30', discountPercentage: 30 }],
  },
  {
    EventId: '6',
    EventName: 'Test Event 6',
    EventDescription: 'Hip-hop night featuring emerging and top artists.',
    EventBackgroundImage: 'url-to-image-6.jpg',
    EventTotalSeats: 220,
    EventRegisteredSeats: 120,
    EventTicketPrice: 45.0,
    EventGenres: ['Hip-Hop'],
    EventCollab: ['5'],
    EventStartDate: '2024-10-01T00:00:00Z',
    EventEndDate: '2024-10-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [-73.935242, 40.73061],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '5',
    EventAgeRestriction: 18,
    EventCountry: 'USA',
    EventDiscounts: [{ discountCode: 'HIPHOP10', discountPercentage: 10 }],
  },
  {
    EventId: '7',
    EventName: 'Test Event 7',
    EventDescription: 'Blues night with soulful performances.',
    EventBackgroundImage: 'url-to-image-7.jpg',
    EventTotalSeats: 180,
    EventRegisteredSeats: 80,
    EventTicketPrice: 50.0,
    EventGenres: ['Blues'],
    EventCollab: ['2'],
    EventStartDate: '2024-11-01T00:00:00Z',
    EventEndDate: '2024-11-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [-90.071532, 29.951065],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '4',
    EventAgeRestriction: 21,
    EventCountry: 'USA',
    EventDiscounts: [{ discountCode: 'BLUES20', discountPercentage: 20 }],
  },
  {
    EventId: '8',
    EventName: 'Test Event 8',
    EventDescription: 'An exclusive folk music retreat.',
    EventBackgroundImage: 'url-to-image-8.jpg',
    EventTotalSeats: 120,
    EventRegisteredSeats: 40,
    EventTicketPrice: 55.0,
    EventGenres: ['Folk', 'Indie'],
    EventCollab: ['3'],
    EventStartDate: '2024-12-01T00:00:00Z',
    EventEndDate: '2024-12-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [-123.123456, 49.28273],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '3',
    EventAgeRestriction: 16,
    EventCountry: 'Canada',
    EventDiscounts: [{ discountCode: 'FOLK15', discountPercentage: 15 }],
  },
  {
    EventId: '9',
    EventName: 'Test Event 9',
    EventDescription: 'Reggae and dancehall party.',
    EventBackgroundImage: 'url-to-image-9.jpg',
    EventTotalSeats: 130,
    EventRegisteredSeats: 70,
    EventTicketPrice: 60.0,
    EventGenres: ['Reggae', 'Dancehall'],
    EventCollab: ['4'],
    EventStartDate: '2025-01-01T00:00:00Z',
    EventEndDate: '2025-01-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [-76.792, 18.1096],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '2',
    EventAgeRestriction: 18,
    EventCountry: 'Jamaica',
    EventDiscounts: [{ discountCode: 'REGGAE20', discountPercentage: 20 }],
  },
  {
    EventId: '10',
    EventName: 'Test Event 10',
    EventDescription: 'Country music festival featuring top stars and emerging talents.',
    EventBackgroundImage: 'url-to-image-10.jpg',
    EventTotalSeats: 300,
    EventRegisteredSeats: 200,
    EventTicketPrice: 65.0,
    EventGenres: ['Country'],
    EventCollab: ['2'],
    EventStartDate: '2025-02-01T00:00:00Z',
    EventEndDate: '2025-02-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [-97.516428, 35.46756],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '1',
    EventAgeRestriction: 18,
    EventCountry: 'USA',
    EventDiscounts: [{ discountCode: 'COUNTRY30', discountPercentage: 30 }],
  },
  {
    EventId: '11',
    EventName: 'Test Event 11',
    EventDescription: 'An exclusive night of indie music performances.',
    EventBackgroundImage: 'url-to-image-11.jpg',
    EventTotalSeats: 160,
    EventRegisteredSeats: 60,
    EventTicketPrice: 70.0,
    EventGenres: ['Indie'],
    EventCollab: ['1'],
    EventStartDate: '2025-03-01T00:00:00Z',
    EventEndDate: '2025-03-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [51.507351, -0.127758],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '1',
    EventAgeRestriction: 18,
    EventCountry: 'UK',
    EventDiscounts: [{ discountCode: 'INDIE25', discountPercentage: 25 }],
  },
  {
    EventId: '12',
    EventName: 'Test Event 12',
    EventDescription: 'A spectacular opera night.',
    EventBackgroundImage: 'url-to-image-12.jpg',
    EventTotalSeats: 200,
    EventRegisteredSeats: 120,
    EventTicketPrice: 80.0,
    EventGenres: ['Opera'],
    EventCollab: ['2'],
    EventStartDate: '2025-04-01T00:00:00Z',
    EventEndDate: '2025-04-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [41.9028, 12.4964],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '2',
    EventAgeRestriction: 21,
    EventCountry: 'Italy',
    EventDiscounts: [{ discountCode: 'OPERA20', discountPercentage: 20 }],
  },
  {
    EventId: '13',
    EventName: 'Test Event 13',
    EventDescription: 'An exciting night of R&B and soul.',
    EventBackgroundImage: 'url-to-image-13.jpg',
    EventTotalSeats: 190,
    EventRegisteredSeats: 90,
    EventTicketPrice: 85.0,
    EventGenres: ['R&B', 'Soul'],
    EventCollab: ['3'],
    EventStartDate: '2025-05-01T00:00:00Z',
    EventEndDate: '2025-05-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [-74.006, 40.7128],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '3',
    EventAgeRestriction: 18,
    EventCountry: 'USA',
    EventDiscounts: [{ discountCode: 'RNB25', discountPercentage: 25 }],
  },
  {
    EventId: '14',
    EventName: 'Test Event 14',
    EventDescription: 'A night of intense metal music.',
    EventBackgroundImage: 'url-to-image-14.jpg',
    EventTotalSeats: 220,
    EventRegisteredSeats: 110,
    EventTicketPrice: 90.0,
    EventGenres: ['Metal'],
    EventCollab: ['3'],
    EventStartDate: '2025-06-01T00:00:00Z',
    EventEndDate: '2025-06-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [35.6895, 139.6917],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '4',
    EventAgeRestriction: 21,
    EventCountry: 'Japan',
    EventDiscounts: [{ discountCode: 'METAL30', discountPercentage: 30 }],
  },
  {
    EventId: '15',
    EventName: 'Test Event 15',
    EventDescription: 'Traditional music and dance from around the world.',
    EventBackgroundImage: 'url-to-image-15.jpg',
    EventTotalSeats: 250,
    EventRegisteredSeats: 125,
    EventTicketPrice: 95.0,
    EventGenres: ['World Music'],
    EventCollab: ['5'],
    EventStartDate: '2025-07-01T00:00:00Z',
    EventEndDate: '2025-07-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [-3.7038, 40.4168],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '5',
    EventAgeRestriction: 18,
    EventCountry: 'Spain',
    EventDiscounts: [{ discountCode: 'WORLD20', discountPercentage: 20 }],
  },
  {
    EventId: '16',
    EventName: 'Test Event 16',
    EventDescription: 'Electronic dance music festival with top DJs.',
    EventBackgroundImage: 'url-to-image-16.jpg',
    EventTotalSeats: 300,
    EventRegisteredSeats: 200,
    EventTicketPrice: 100.0,
    EventGenres: ['EDM'],
    EventCollab: ['1'],
    EventStartDate: '2025-08-01T00:00:00Z',
    EventEndDate: '2025-08-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [37.7749, -122.4194],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '5',
    EventAgeRestriction: 21,
    EventCountry: 'USA',
    EventDiscounts: [{ discountCode: 'EDM30', discountPercentage: 30 }],
  },
  {
    EventId: '17',
    EventName: 'Test Event 17',
    EventDescription: 'Celebrating the best of K-pop.',
    EventBackgroundImage: 'url-to-image-17.jpg',
    EventTotalSeats: 180,
    EventRegisteredSeats: 90,
    EventTicketPrice: 105.0,
    EventGenres: ['K-pop'],
    EventCollab: ['4'],
    EventStartDate: '2025-09-01T00:00:00Z',
    EventEndDate: '2025-09-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [37.5665, 126.978],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '4',
    EventAgeRestriction: 18,
    EventCountry: 'South Korea',
    EventDiscounts: [{ discountCode: 'KPOP25', discountPercentage: 25 }],
  },
  {
    EventId: '18',
    EventName: 'Test Event 18',
    EventDescription: 'All-star reggaeton concert.',
    EventBackgroundImage: 'url-to-image-18.jpg',
    EventTotalSeats: 200,
    EventRegisteredSeats: 100,
    EventTicketPrice: 110.0,
    EventGenres: ['Reggaeton'],
    EventCollab: ['4'],
    EventStartDate: '2025-10-01T00:00:00Z',
    EventEndDate: '2025-10-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [18.4655, -66.1057],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '3',
    EventAgeRestriction: 21,
    EventCountry: 'Puerto Rico',
    EventDiscounts: [{ discountCode: 'REGGAETON20', discountPercentage: 20 }],
  },
  {
    EventId: '19',
    EventName: 'Test Event 19',
    EventDescription: 'Latin jazz and salsa night.',
    EventBackgroundImage: 'url-to-image-19.jpg',
    EventTotalSeats: 220,
    EventRegisteredSeats: 110,
    EventTicketPrice: 115.0,
    EventGenres: ['Latin Jazz', 'Salsa'],
    EventCollab: ['1'],
    EventStartDate: '2025-11-01T00:00:00Z',
    EventEndDate: '2025-11-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [-74.006, 40.7128],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '2',
    EventAgeRestriction: 18,
    EventCountry: 'USA',
    EventDiscounts: [{ discountCode: 'SALSA25', discountPercentage: 25 }],
  },
  {
    EventId: '20',
    EventName: 'Test Event 20',
    EventDescription: 'A night dedicated to avant-garde music.',
    EventBackgroundImage: 'url-to-image-20.jpg',
    EventTotalSeats: 150,
    EventRegisteredSeats: 75,
    EventTicketPrice: 120.0,
    EventGenres: ['Avant-garde'],
    EventCollab: ['2'],
    EventStartDate: '2025-12-01T00:00:00Z',
    EventEndDate: '2025-12-02T23:59:59Z',
    EventLocation: {
      Type: 'Point',
      Coordinates: [55.7558, 37.6173],
    },
    EventStatus: 'Upcoming',
    EventCreatedBy: '1',
    EventAgeRestriction: 18,
    EventCountry: 'Russia',
    EventDiscounts: [{ discountCode: 'AVANTGARDE30', discountPercentage: 30 }],
  },
];

export { UserTestData, EventTestData };
