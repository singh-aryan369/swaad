import PageHeader from '../components/PageHeader.jsx';
import Menu from '../components/Menu.jsx';

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="A Taste of India"
        title="Our Menu"
        subtitle="A journey through the regions of India — from smoky kebabs of the north to slow-cooked curries of the south."
      />
      <Menu />
    </>
  );
}
