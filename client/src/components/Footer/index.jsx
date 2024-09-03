import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-dark p-4 text-light">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-custom mb-3"
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
            ❤️
          </span>, care, and a splash of Squirtle's{' '}
          <span
            className="emoji"
            role="img"
            aria-label="turtle"
            aria-hidden="false"
          >
            🐢
          </span> coolness. Powered by the genius of Ro{' '}
          <span
            className="emoji"
            role="img"
            aria-label="brain"
            aria-hidden="false"
          >
            🧠
          </span> and Kari{' '}
          <span
            className="emoji"
            role="img"
            aria-label="lightbulb"
            aria-hidden="false"
          >
            💡
          </span> - the masterminds behind StallCourt®
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
