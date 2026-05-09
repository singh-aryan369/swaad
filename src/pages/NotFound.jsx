import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="Lost in the kitchen."
        subtitle="The page you're looking for has wandered off — perhaps to grab a bite. Let's get you back to the table."
      />
      <section className="notfound-cta">
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </section>
    </>
  );
}
