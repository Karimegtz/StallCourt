import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_LIKES } from "../../utils/mutations";

const ThoughtList = ({
  thoughts,
  title,
  likes,
  showTitle = true,
  showUsername = true,
}) => {
  // State to track likes by the current user
  const [likedThoughts, setLikedThoughts] = useState([]);

  const [addLike] = useMutation(ADD_LIKES);

  useEffect(() => {
    // Get liked thoughts from local storage or initialize it
    const liked = JSON.parse(localStorage.getItem("likedThoughts")) || [];
    setLikedThoughts(liked);
  }, []);

  const handleLike = async (thoughtId) => {
    if (!likedThoughts.includes(thoughtId)) {
      try {
        await addLike({
          variables: { thoughtId },
        });

        // Update local state and localStorage
        const updatedLikedThoughts = [...likedThoughts, thoughtId];
        setLikedThoughts(updatedLikedThoughts);
        localStorage.setItem(
          "likedThoughts",
          JSON.stringify(updatedLikedThoughts)
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!thoughts.length) {
    return <h3>Be the first to ignite a thought!</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}>
                  {thought.thoughtAuthor} <span>{thought.likes} likes</span>{" "}
                  <br />
                  <span style={{ fontSize: "1rem" }}>
                    Had this spark on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You sparked this idea on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <button
              className="btn btn-primary btn-block btn-squared"
              onClick={() => handleLike(thought._id)}
              disabled={likedThoughts.includes(thought._id)}
            >
              {likedThoughts.includes(thought._id) ? 'Liked' : 'Like'} this thought
            </button>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}>
              Jump into the conversation on this spark.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
