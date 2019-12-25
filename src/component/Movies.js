import React from "react";
import Capsule from "./Capsule";
import { Link } from "react-router-dom";

import "../App.css";

const IMG = `http://image.tmdb.org/t/p/w185/`;

const Movies = ({ movies, mLoad }) => {
  return (
    <>
      <div className="containerTV">
        <h1>Popular Movies</h1>
        <div className="tv_container">
          {mLoad
            ? movies.results.map(m => (
                <Link
                  to={{ pathname: "/detail", state: { id: m.id, tv: false } }}
                  className="Capsule"
                >
                  <Capsule name={m.title} image={IMG + m.poster_path} />
                </Link>
              ))
            : "Loading..."}
        </div>
      </div>
    </>
  );
};

export default Movies;
