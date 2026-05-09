import PageHeader from '../components/PageHeader.jsx';
import Gallery from '../components/Gallery.jsx';

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Moments at Swaad"
        title="Gallery"
        subtitle="Steam rising from a fresh tandoor, the colours of a Mumbai spice market, laughter at a long table."
      />
      <Gallery />
    </>
  );
}
