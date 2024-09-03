// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div className="text-light">Gearin' up the circuits...</div>;
  }
  return (
    <div className="my-3 bg-dark text-light p-4 rounded">
      <h3 className="card-header bg-secondary text-warning p-2 m-0">
        {thought.thoughtAuthor} <span>{thought.likes} likes</span> <br />
        <span style={{ fontSize: '1rem', color: '#E0E0E0' }}>
          Sparked this idea on {thought.createdAt}
        </span>
      </h3>
      <div className="bg-dark py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #444',
            lineHeight: '1.5',
            backgroundColor: '#2C2C3E',
            color: '#E0E0E0',
            borderRadius: '5px',
          }}
        >
          {thought.thoughtText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4 bg-secondary text-light" style={{ border: '1px dotted #444' }}>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;
