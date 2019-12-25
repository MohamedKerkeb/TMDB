import React from "react";
import Capsule from "./Capsule";
import { Link } from "react-router-dom";

import "../App.css";

const IMG = `http://image.tmdb.org/t/p/w185/`;

const Tv = ({ series, load }) => {
  console.log(series);
  return (
    <>
      <div className="containerTV">
        <h1>Popular Series</h1>
        <div className="tv_container">
          {load
            ? series.results.map(s => (
                <Link
                  to={{ pathname: "/detail", state: { id: s.id, tv: true } }}
                  className="Capsule"
                >
                  <Capsule name={s.name} image={IMG + s.poster_path} />
                </Link>
              ))
            : "loading ..."}
        </div>
        <div>pagination </div>
      </div>
    </>
  );
};

export default Tv;
