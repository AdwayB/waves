import { Route, Routes } from 'react-router-dom';
import { Error } from '../../components';
import { UserHome } from '../UserHome';
import { BrowseEvents } from '../BrowseEvents';

const NestedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/browse-events" element={<BrowseEvents />} />
      <Route
        path="/saved-events"
        element={<div style={{ fontSize: '50px', color: 'red' }}>Testing Saved Events</div>}
      />
      <Route path="/calendar" element={<div style={{ fontSize: '50px', color: 'red' }}>Testing Calendar</div>} />
      <Route path="/my-events" element={<div style={{ fontSize: '50px', color: 'red' }}>Testing My Events</div>} />
      <Route path="/my-profile" element={<div style={{ fontSize: '50px', color: 'red' }}>Testing My Profile</div>} />
      <Route path="*" element={<Error message="Page not found" />} />
    </Routes>
  );
};

export { NestedRoutes };
