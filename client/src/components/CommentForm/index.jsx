import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="container-custom p-4">
      <h4 className="text-white">Sum up Brit and Chris in just one word—if you dare!</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : 'text-light'
            }`}
          >
            Word Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100 text-dark"
                style={{
                  lineHeight: '1.5',
                  resize: 'vertical',
                  backgroundColor: '#2C2C3E',
                  color: '#E0E0E0',
                  border: '1px solid #444',
                  borderRadius: '5px',
                }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-custom btn-block py-3" type="submit">
                Drop Your Thoughts
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="text-light">
          Mind sharing? Log in first to spill your thoughts!{' '}
          <Link to="/login" className="text-primary">login</Link> or <Link to="/signup" className="text-primary">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
