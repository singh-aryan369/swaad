export const contact = {
  name: 'Swaad',
  tagline: 'Authentic Indian Cuisine',
  address: '42 Curry Lane, Brick Quarter, Mumbai 400001',
  shortAddress: '42 Curry Lane, Mumbai',
  phone: '+91 22 4040 4040',
  phoneTel: '+912240404040',
  whatsapp: '912240404040',
  email: 'hello@swaad.in',
  hoursShort: 'Tue–Sun · 12:00 — 23:30',
  hours: [
    { day: 'Monday',    time: 'Closed' },
    { day: 'Tuesday',   time: '12:00 — 23:30' },
    { day: 'Wednesday', time: '12:00 — 23:30' },
    { day: 'Thursday',  time: '12:00 — 23:30' },
    { day: 'Friday',    time: '12:00 — 00:30' },
    { day: 'Saturday',  time: '12:00 — 00:30' },
    { day: 'Sunday',    time: '12:00 — 22:30' }
  ],
  rating: { score: 4.8, count: 1247 },
  socials: [
    { label: 'Instagram', icon: 'instagram', href: '#' },
    { label: 'Facebook',  icon: 'facebook',  href: '#' },
    { label: 'Zomato',    icon: 'text',      href: '#' }
  ],
  // Public Google Maps embed format — no API key needed for basic iframe
  mapQuery: 'Brick Lane Mumbai India'
};
