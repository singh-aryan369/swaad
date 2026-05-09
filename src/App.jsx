import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import RouteBoundary from './components/RouteBoundary.jsx';
import RouteFallback from './components/RouteFallback.jsx';
import lazyWithRetry from './lib/lazyWithRetry.js';

const MenuPage    = lazyWithRetry(() => import('./pages/MenuPage.jsx'));
const TeamPage    = lazyWithRetry(() => import('./pages/TeamPage.jsx'));
const GalleryPage = lazyWithRetry(() => import('./pages/GalleryPage.jsx'));
const EventsPage  = lazyWithRetry(() => import('./pages/EventsPage.jsx'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage.jsx'));
const NotFound    = lazyWithRetry(() => import('./pages/NotFound.jsx'));

const SuspenseLayout = () => (
  <RouteBoundary>
    <Suspense fallback={<RouteFallback />}>
      <Outlet />
    </Suspense>
  </RouteBoundary>
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
