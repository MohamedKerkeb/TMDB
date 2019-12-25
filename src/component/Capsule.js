import React from "react";
import "../App.css";

const getGenre = (genres, genre_ids) => {
  const genre = [];
  for (let g in genres) {
    for (let l in genre_ids) {
      if (genre_ids[l] === genres[g].id) {
        genre.push(genres[g].name);
      }
    }
  }
  return genre.map(e => <li>{e}</li>);
};

const Capsule = ({ name, image, genres, genre_ids }) => {
  return (
    <>
      <div className="in_Capsule">
        <div
          className="bg_capsule"
          style={{
            background: `url(${image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        {/* <img src={image} alt={name} className="img_Capsule" /> */}
        <h4 className="name">{name}</h4>
        {/* {getGenre(genres, genre_ids)} */}
      </div>
    </>
  );
};

export default Capsule;
