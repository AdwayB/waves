import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loading } from '../components';

const UserHome = lazy(() => import('../modules').then((m) => ({ default: m.UserHome })));
const BrowseEvents = lazy(() => import('../modules').then((m) => ({ default: m.BrowseEvents })));
const SavedEvents = lazy(() => import('../modules').then((m) => ({ default: m.SavedEvents })));
const CalendarPage = lazy(() => import('../modules').then((m) => ({ default: m.CalendarPage })));
const MyEvents = lazy(() => import('../modules').then((m) => ({ default: m.MyEvents })));
const Profile = lazy(() => import('../modules').then((m) => ({ default: m.Profile })));
const EventUserView = lazy(() => import('../modules').then((m) => ({ default: m.EventUserView })));
const EventAdminView = lazy(() => import('../modules').then((m) => ({ default: m.EventAdminView })));
const EventEditView = lazy(() => import('../modules').then((m) => ({ default: m.EventEditView })));

const NestedRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/browse-events" element={<BrowseEvents />} />
        <Route path="/saved-events" element={<SavedEvents />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/view-event/:eventId" element={<EventUserView />} />
        <Route path="/view-event/admin/:eventId" element={<EventAdminView />} />
        <Route path="/edit-event/:eventId" element={<EventEditView />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Suspense>
  );
};

export { NestedRoutes };
