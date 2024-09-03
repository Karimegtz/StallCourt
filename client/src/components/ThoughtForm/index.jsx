import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3 className="text-white">What's sparking your techy thoughts? Share what you love about StallCourt®!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : 'text-light'
            }`}
          >
            Word Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
  <textarea
    name="thoughtText"
    placeholder="Here's a new thought..."
    value={thoughtText}
    className="form-input w-100"
    style={{
      lineHeight: '1.5',
      resize: 'none', // Evitar que el usuario cambie el tamaño manualmente
      backgroundColor: '#2C2C3E',
      color: '#E0E0E0',
      border: '1px solid #444',
      borderRadius: '5px',
      padding: '10px',
      minHeight: '100px', // Altura mínima aumentada
      maxHeight: '300px', // Altura máxima, opcional
      overflowY: 'auto', // Añade scroll vertical si el contenido es mayor al maxHeight
    }}
    rows="4" // Inicialmente, ocupa 4 líneas
    onChange={handleChange}
    onInput={(e) => {
      e.target.style.height = 'auto'; // Resetea la altura antes de calcular la nueva altura
      e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura según el contenido
    }}
  ></textarea>
</div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-custom btn-block py-3" type="submit">
                Share a Spark
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p className="text-light">
          Log in to light up StallCourt® with your thoughts. Please{' '}
          <Link to="/login" className="text-primary">login</Link> or <Link to="/signup" className="text-primary">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
