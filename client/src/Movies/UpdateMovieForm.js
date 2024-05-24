import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";


const UpdateMovieForm = (props) => {
  const { updateMovieList } = props
  const { id } = useParams();
  const { push } = useHistory();
  const [movieUpdate, setMovieUpdate] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovieUpdate(res.data)
        console.log(res.data)
      })

      .catch(err => console.log(err))
  }, [id])



  const changeHandler = (e) => {
    if (e.target.name === "stars") {
      const starsarray = e.target.value.split(",")
      setMovieUpdate({ ...movieUpdate, [e.target.name]: starsarray })
      return
    }

    setMovieUpdate({
      ...movieUpdate,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieUpdate)
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieUpdate)
      .then(res => {
        updateMovieList(res.data)
        push(`/movies/${id}`)
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="form-container">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <h5>Movie</h5>
        <input
          type="text"
          name="title"
          value={movieUpdate.title}
          onChange={changeHandler}
          placeholder="Movie Title"
        />
        <h5>Director</h5>
        <input
          type="text"
          name="director"
          value={movieUpdate.director}
          onChange={changeHandler}
          placeholder="Director"
        />
        <h5>Metascore</h5>
        <input
          type="number"
          name="metascore"
          value={movieUpdate.metascore}
          onChange={changeHandler}
          placeholder="Metascore"
        />
        <h5>Main Actors</h5>
        <input
          type="text"
          name="stars"
          value={movieUpdate.stars}
          onChange={changeHandler}
          placeholder="Actors"
        />
        <button className="submit-btn">Submit Changes</button>
      </form>

    </div>
  )
}

export default UpdateMovieForm;

