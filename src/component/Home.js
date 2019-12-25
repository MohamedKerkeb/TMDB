import React from "react";
import Capsule from "./Capsule";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Import Css Files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../App.css";

const IMG = `http://image.tmdb.org/t/p/w185/`;

const Home = ({ series, movies, genres, upcoming, load, mLoad, uLoad }) => {
  //console.log(genres);
  let settings = {
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 5,
    slidesToScrool: 4,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScrool: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScrool: 2
        }
      }
    ]
  };
  return (
    <>
      <div className="container">
        <h3>Popular Tv Show</h3>
        <div className="capsule_Container">
          {load ? (
            <Slider {...settings}>
              {series.results.slice(0, 8).map(s => (
                <Link
                  to={{ pathname: "/detail", state: { id: s.id, tv: true } }}
                  className="Capsule"
                >
                  <Capsule
                    name={s.name}
                    image={IMG + s.poster_path}
                    genre_ids={s.genre_ids}
                    // genres={genres.genres}
                  />
                </Link>
              ))}
            </Slider>
          ) : (
            "Loading ..."
          )}
        </div>

        <h3>Popular Movies</h3>
        <div className="capsule_Container">
          {mLoad ? (
            <Slider {...settings}>
              {movies.results.slice(0, 8).map(s => (
                <Link
                  to={{ pathname: "/detail", state: { id: s.id, tv: false } }}
                >
                  <Capsule
                    name={s.title}
                    image={IMG + s.poster_path}
                    genre_ids={s.genre_ids}
                    // genres={genres.genres}
                  />
                </Link>
              ))}
            </Slider>
          ) : (
            "loading..."
          )}
        </div>
        <h3>UpComing Movies</h3>
        <div className="capsule_Container">
          {uLoad ? (
            <Slider {...settings}>
              {upcoming.results.slice(0, 8).map(s => (
                <Link
                  to={{ pathname: "/detail", state: { id: s.id, tv: false } }}
                >
                  <Capsule
                    name={s.title}
                    image={IMG + s.poster_path}
                    genre_ids={s.genre_ids}
                    // genres={genres.genres}
                  />
                </Link>
              ))}
            </Slider>
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
