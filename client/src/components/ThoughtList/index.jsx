import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";


const ThoughtList = ({
  thoughts,
  title,
 
  showTitle = true,
  showUsername = true,
}) => {
  

  return (
    <div>
      {showTitle && <h3 className="text-light">{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3 bg-dark text-light">
            <h4 className="card-header bg-secondary text-warning p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-warning"
                  to={`/profiles/${thought.thoughtAuthor}`}>
                  {thought.thoughtAuthor} <span>{thought.likes} likes</span>{" "}
                  <br />
                  <span style={{ fontSize: "1rem", color: "#E0E0E0" }}>
                    Had this spark on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem", color: "#E0E0E0" }}>
                    You sparked this idea on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-dark text-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
          
            <Link
              className="btn btn-warning text-dark btn-block btn-squared"
              to={`/thoughts/${thought._id}`}>
              Jump into the conversation on this spark.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
