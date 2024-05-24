import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import axios from 'axios';

const App = () => {

  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const updateMovieList = (movie) => {
    const newMovies = movieList.map((m) => {
      if (m.id === movie.id) {
        return movie
      } else {
        return m
      }
    })
    setMovieList(newMovies)
  }

  const deleteMovie = (movieId) => {
    const newMoviesList = movieList.filter((m) => {
      return m.id !== movieId
    })
    setMovieList(newMoviesList)
    const foundIndex = savedList.map(movie => movie.id).indexOf(movieId)
    if (foundIndex > -1) {
      const newSavedList = savedList.filter((movie) => {
        return movie.id !== movieId
      })
      setSavedList(newSavedList)
    }
  }



  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/" render={(routeProps) => <MovieList {...routeProps} movies={movieList} />} />



      <Route exact path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie} />
      </Route>

      <Route path="/movies/movie-form/:id">
        <UpdateMovieForm UpdateMovieForm={UpdateMovieForm} updateMovieList={updateMovieList} />
      </Route>
    </>
  );
};

export default App;
