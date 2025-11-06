import { Link } from 'react-router';
import Button from '../shared/Button/Button';

export default function NotFound() {
  return (
    <div className="text-center">
      <h3>Oops! The page you’re looking for doesn’t exist.</h3>
      <p className="mb-4">
        It might have been moved, deleted, or maybe the URL was typed
        incorrectly.
      </p>
      <Link to={'/'}>
        <Button title="Go Back Home" />
      </Link>
    </div>
  );
}
