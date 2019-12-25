import React, { Component } from "react";
import Axios from "axios";
import Capsule from "./Capsule";
import { Link } from "react-router-dom";

import "../App.css";

const API_KEY = "bbd2542b8c37690c53dab4cb39912bb8";
const URL_TV = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr&page=1`;
const URL_MOVIE = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr&page=1`;
const URL_UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=fr&page=1`;
const URL_GENRE = `https://api.themoviedb.org/3/genre/tv/list?language=en-US&api_key=${API_KEY}`;
const IMG = `http://image.tmdb.org/t/p/w185/`;

export default class Show extends Component {
  state = {
    series: [],
    genres: [],
    movies: [],
    upcoming: [],
    sLoad: false,
    mLoad: false,
    uLoad: false
  };

  componentDidMount = () => {
    Axios.get(URL_TV)
      .then(response => this.setState({ series: response.data, sLoad: true }))
      .catch(err => console.log(err));
    Axios.get(URL_GENRE)
      .then(genres => this.setState({ genres: genres.data.genres }))
      .catch(err => console.log(err));
    Axios.get(URL_MOVIE)
      .then(movie => this.setState({ movies: movie.data, mLoad: true }))
      .catch(err => console.log(err));
    Axios.get(URL_UPCOMING)
      .then(coming => this.setState({ upcoming: coming.data, uLoad: true }))
      .catch(err => console.log(err));
  };

  render() {
    const {
      series,
      sLoad,
      genres,
      mLoad,
      movies,
      uLoad,
      upcoming
    } = this.state;
    console.log("movie", movies);
    console.log("serie", series);
    return (
      <div>
        <h1>Show</h1>
        <div className="showContainer">
          {sLoad
            ? series.results.map(s => (
                <Link
                  to={{ pathname: "/detail", state: { id: s.id, tv: true } }}
                >
                  <Capsule
                    name={s.name}
                    image={IMG + s.poster_path}
                    genre_ids={s.genre_ids}
                    genres={genres}
                  />
                </Link>
              ))
            : "Loading ..."}
        </div>
        <div className="showContainer">
          {mLoad
            ? movies.results.map(s => (
                <Link
                  to={{ pathname: "/detail", state: { id: s.id, tv: false } }}
                >
                  <Capsule
                    name={s.title}
                    image={IMG + s.poster_path}
                    genre_ids={s.genre_ids}
                    genres={genres}
                  />
                </Link>
              ))
            : "Loading ..."}
        </div>
        <div className="showContainer">
          {uLoad
            ? upcoming.results.map(s => (
                <Link
                  to={{ pathname: "/detail", state: { id: s.id, tv: false } }}
                >
                  <Capsule
                    name={s.title}
                    image={IMG + s.poster_path}
                    genre_ids={s.genre_ids}
                    genres={genres}
                  />
                </Link>
              ))
            : "Loading ..."}
        </div>
      </div>
    );
  }
}
