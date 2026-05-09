import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404 — Off the Menu"
        title="This dish isn't on tonight's card."
        subtitle="The page you were looking for has wandered out of the kitchen. Let's walk you back to the table — or pull up a chair and start with the menu."
      />
      <section className="notfound-cta">
        <div className="container notfound-actions">
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <Link to="/menu" className="btn btn-ghost">
            <BookOpen size={16} /> Browse the menu
          </Link>
        </div>
      </section>
    </>
  );
}
