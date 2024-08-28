import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
        Crafted with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            Crafted with ❤️, care, and a splash of Squirtle's 🐢 coolness
          </span>{' '}
          Powered by the genius of Ro 🧠 and Kari 💡 - the masterminds behind StallCourt®
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
