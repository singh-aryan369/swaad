import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

// Home is eagerly loaded (it's the landing route). Every other page is split off
// so the initial JS bundle stays small.
const MenuPage    = lazy(() => import('./pages/MenuPage.jsx'));
const TeamPage    = lazy(() => import('./pages/TeamPage.jsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'));
const EventsPage  = lazy(() => import('./pages/EventsPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const NotFound    = lazy(() => import('./pages/NotFound.jsx'));

const RouteFallback = () => <div style={{ minHeight: '60vh' }} aria-hidden="true" />;

const SuspenseLayout = () => (
  <Suspense fallback={<RouteFallback />}>
    <Outlet />
  </Suspense>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<SuspenseLayout />}>
            <Route path="menu" element={<MenuPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
