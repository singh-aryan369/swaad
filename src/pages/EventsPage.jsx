import PageHeader from '../components/PageHeader.jsx';
import Festivals from '../components/Festivals.jsx';
import Events from '../components/Events.jsx';

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Celebrate With Us"
        title="Events & Festivals"
        subtitle="From a quiet anniversary dinner to a thousand-guest sangeet — we host with the warmth of a home and the pace of a kitchen that's been at it for twenty-five years."
      />
      <Festivals />
      <Events />
    </>
  );
}
