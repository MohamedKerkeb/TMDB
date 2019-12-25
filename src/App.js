import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./App.css";
import Detail from "./component/Detail";

import { Switch, Route, Link } from "react-router-dom";
import Home from "./component/Home";
import Tv from "./component/Tv";
import Movies from "./component/Movies";

require("dotenv").config();

// const API_KEY = process.env.API_KEY;
const API_KEY = "bbd2542b8c37690c53dab4cb39912bb8";

console.log(API_KEY);

const URL_TV = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr&page=1`;
const URL_MOVIE = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr&page=1`;
const URL_UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=fr&page=1`;
const URL_GENRE = `https://api.themoviedb.org/3/genre/tv/list?language=en-US&api_key=${API_KEY}`;

function App() {
  const [series, setSeries] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [upcoming, setUpComing] = useState([]);
  const [load, setLoad] = useState(false);

  const [mLoad, setmLoad] = useState(false);
  const [uLoad, setuLoad] = useState(false);

  useEffect(() => {
    const getSeries = async () => {
      const serie = await Axios.get(URL_TV);
      setSeries(serie.data);
      setLoad(true);
    };
    const getMovie = async () => {
      const movie = await Axios.get(URL_MOVIE);
      setMovies(movie.data);
      setmLoad(true);
    };
    const getGenre = async () => {
      const genre = await Axios.get(URL_GENRE);
      setGenres(genre.data);
      setLoad(true);
    };
    const getUpComing = async () => {
      const coming = await Axios.get(URL_UPCOMING);
      setUpComing(coming.data);
      setuLoad(true);
    };
    getSeries();
    getMovie();
    getGenre();
    getUpComing();
  }, []);

  //  console.log("app", genres);
  return (
    <div className="App">
      <header className="App-header">
        <div className="container menu">
          <Link to="/" className="logo">
            My FlexMovie react
          </Link>
          <div className="nav">
            <Link to="/tv">
              <i class="fas fa-tv"></i>
            </Link>
            <Link to="/movie">
              <i class="fas fa-film"></i>
            </Link>
          </div>
        </div>
      </header>
      <div className="Contenue">
        <Switch>
          <Route exact path="/" component={Home}>
            <Home
              series={series}
              movies={movies}
              genres={genres}
              upcoming={upcoming}
              load={load}
              mLoad={mLoad}
              uLoad={uLoad}
            />
          </Route>
          <Route path="/tv" component={Tv}>
            <Tv series={series} load={load} />
          </Route>
          <Route path="/movie" component={Movies}>
            <Movies movies={movies} mLoad={mLoad} />
          </Route>
          <Route path="/detail" component={Detail}>
            <Detail />
          </Route>
        </Switch>
      </div>
      <footer className="Footer">
        <p>Api TMDB</p>
      </footer>
    </div>
  );
}

export default App;
