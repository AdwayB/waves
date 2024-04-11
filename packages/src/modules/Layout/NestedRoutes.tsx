import { Route, Routes } from 'react-router-dom';
import { Error } from '../../components';

const NestedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div style={{ fontSize: '50px', color: 'red' }}>Testing this</div>} />
      <Route
        path="/browse-events"
        element={<div style={{ fontSize: '50px', color: 'red' }}>Testing Browsing Events</div>}
      />
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
