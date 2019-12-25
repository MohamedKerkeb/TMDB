import React from "react";
import "../App.css";

const IMG_92 = "http://image.tmdb.org/t/p/w92";

const Cast = ({ getCast }) => {
  console.log("cast", getCast);
  return (
    <>
      <h3>Casting</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {getCast.slice(0, 10).map(c => (
          <div
            style={{
              width: "95px",
              margin: "5px"
            }}
          >
            {/* <span>{c.character}</span> */}
            <img
              src={IMG_92 + c.profile_path}
              alt={c.name}
              style={{
                borderRadius: "10px"
              }}
            />
            <span>{c.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cast;
