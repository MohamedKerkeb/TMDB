import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Cast from "./Cast";

const API_KEY = "bbd2542b8c37690c53dab4cb39912bb8";
const IMG = `http://image.tmdb.org/t/p/original/`;
const IMG_185 = "http://image.tmdb.org/t/p/w185";

const Detail = () => {
  const TV = window.history.state.state.tv;
  const ID = window.history.state.state.id;

  let link = "";
  if (TV === true) {
    link = "tv";
  } else {
    link = "movie";
  }
  // console.log(link);

  const [detail, setDetail] = useState([]);
  const [credit, setCredit] = useState([]);

  useEffect(() => {
    const urlDetail = `https://api.themoviedb.org/3/${link}/${ID}?api_key=${API_KEY}&language=fr`;
    const urlCredit = `https://api.themoviedb.org/3/${link}/${ID}/credits?api_key=${API_KEY}`;
    const getDetail = async () => {
      const result = await Axios.get(urlDetail);
      setDetail(result.data);
    };
    const getCredit = async () => {
      const result = await Axios.get(urlCredit);
      setCredit(result.data);
    };
    getDetail();
    getCredit();
  }, []);
  //console.log(credit.cast);
  // console.log(detail.genres);
  // Genres
  const genres = detail.genres;
  let genre = [];
  for (let g in genres) {
    // console.log(genres[g].name);
    genre.push(genres[g].name);
  }

  // Date of Next Episode
  const next = detail.next_episode_to_air;
  let nextDate = "";
  for (let n in next) {
    // console.log(next.air_date);
    nextDate = next.air_date;
  }

  // In Production
  let inProduction = "";
  if (detail.in_production === false) {
    inProduction = "Series Ended";
  } else {
    inProduction = nextDate;
  }

  // Create By
  let createBy = [];
  for (let c in detail.created_by) {
    // console.log(detail.created_by[c].name);
    createBy.push(detail.created_by[c].name);
  }
  // console.log(detail.created_by);

  // Credit
  /**
   * character
   * name
   * profil_path
   * order
   */
  const Casting = credit.cast;
  const getCast = [];
  for (let ch in Casting) {
    getCast.push(Casting[ch]);
  }
  return (
    <>
      <div
        className="detail_container"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,1)),
            url(${IMG + detail.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <div className="container ">
          <Link to="/" className="Home">
            <span>Home</span>
          </Link>
          <div className="grid_Detail">
            <div>
              <div className="Image_detail">
                <img src={IMG_185 + detail.poster_path} alt={detail.name} />
              </div>
              <span>Creator : {createBy}</span>
            </div>

            <div className="Detail">
              <h1>{link === "tv" ? detail.name : detail.title}</h1>
              <div className="one">
                <span className="average">
                  <i class="fas fa-star"></i> {detail.vote_average} /10
                </span>
                <span>
                  {genre.map(g => (
                    <span className="genre">{g}</span>
                  ))}
                </span>
              </div>
              <div className="two">
                {/* <a href={detail.homepage}>Home Page</a> */}
                <button className="homePage">
                  <a href={detail.homepage}>Home Page</a>
                </button>
                <span className="Season">
                  {link === "tv" ? detail.number_of_seasons + " Seasons" : ""}
                </span>
                <span className="Episode">
                  {link === "tv" ? detail.number_of_episodes + " Episodes" : ""}
                </span>
                <span>
                  {link === "tv" ? "next Episode: " + inProduction : ""}
                </span>
                {/* <span>next Episode: {inProduction}</span> */}
              </div>
              <div className="tree">
                <p>{detail.overview}</p>
              </div>
              <div>
                <Cast getCast={getCast} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
