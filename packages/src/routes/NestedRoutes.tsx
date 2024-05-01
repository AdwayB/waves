import { Navigate, Route, Routes } from 'react-router-dom';
import { UserHome, BrowseEvents, SavedEvents, CalendarPage, MyEvents } from '../modules';

const NestedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/browse-events" element={<BrowseEvents />} />
      <Route path="/saved-events" element={<SavedEvents />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/my-events" element={<MyEvents />} />
      <Route path="/my-profile" element={<div style={{ fontSize: '50px', color: 'red' }}>Testing My Profile</div>} />
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

export { NestedRoutes };
