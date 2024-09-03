import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_LIKE, REMOVE_LIKE } from '../../utils/mutations'; // Import your GraphQL mutations

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
  userId, // Pass the user ID as a prop
}) => {
  if (!thoughts.length) {
    return <h3>Be the first to ignite a thought!</h3>;
  }

  const [addLike] = useMutation(ADD_LIKE);
  const [removeLike] = useMutation(REMOVE_LIKE);

  const handleLike = async (thoughtId) => {
    try {
      await addLike({ variables: { thoughtId } });
      // Optionally, refetch the thoughts or update the UI to reflect the new like
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleUnlike = async (thoughtId) => {
    try {
      await removeLike({ variables: { thoughtId } });
      // Optionally, refetch the thoughts or update the UI to reflect the removed like
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };
  return (
    <div>
      {showTitle && <h3 className="text-light">{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3 bg-dark text-light">
            <h4 className="card-header bg-secondary text-warning p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Had this spark on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You sparked this idea on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-dark text-light p-2">
              <p>{thought.thoughtText}</p>
              <button
                className="btn btn-success"
                onClick={() => handleLike(thought._id)}
              >
                Like
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleUnlike(thought._id)}
              >
                Unlike
              </button>
              <div>
                {/* Ensure likes is initialized as an array */}
                {(thought.likes || []).length} {((thought.likes || []).length === 1) ? 'Like' : 'Likes'}
              </div>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Jump into the conversation on this spark.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
