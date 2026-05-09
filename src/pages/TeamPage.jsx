import PageHeader from '../components/PageHeader.jsx';
import Team from '../components/Team.jsx';

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Faces Behind the Flavour"
        title="Our Team"
        subtitle="A family of cooks, dreamers and craftsmen — bringing decades of regional Indian expertise to every plate we serve."
      />
      <Team />
    </>
  );
}
