# waves

## Description
`waves` is a web application designed to help users browse, register, save and manage events. It serves as the View component for `waves-ems`. 
It is designed to be performant, modular, scalable and adheres to strict code style guidelines.

## Features

### **User Authentication and RBAC**
- **Login/Signup**: Secure user authentication with JWT-based session management.
- **Role-Based Access Control (RBAC)**: Different access levels for Admins and Users, where Admins can create and manage events.

### **Event Management**
- **Event Creation/Updating**: Create and modify events made with an admin role.
- **Event Browsing**: Browse a list of available events.
- **Advanced Filtering**: Filter events by date, artist, rating, genre and distance.
- **Custom Calendar Component**: Track registered and saved events on a personalized calendar interface.

### **Registration and Attendance**
- **Event Registration**: Facilitate user registrations for events.
- **Save Events for Later**: Allow users to bookmark events and add them to their personal calendar.

### **User Feedback**
- **Feedback Collection**: Enable users to submit ratings and comments on events.
- **Feedback Display**: Show user feedback on event pages to inform future attendees.

### **State Management**
- **Redux Integration**: Manage global state for user sessions and event data.
- **React Query**: Efficient data fetching and caching.

## Other `waves-ems` Components
- [**`waves-server`**](https://github.com/AdwayB/waves-server)
- [**`waves-users`**](https://github.com/AdwayB/waves-users)
- [**`waves-events`**](https://github.com/AdwayB/waves-events)
