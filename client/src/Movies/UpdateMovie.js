import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";


const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: []
    
  };


const UpdateMovie = (props) => {
    console.log("this is the props in update movie component", props);
    const [movie, setMovie] = useState(initialItem);
    const { id } = useParams();

    useEffect(() => {
        const movieToUpdate = props.newMovieState.movie
        console.log("movie to Update", movieToUpdate);
    
        if (movieToUpdate) {
          setMovie(movieToUpdate);
        }
      }, [props.movieToUpdate, id]);
    
      const changeHandler = e => {
        if (e.target.name !== 'stars'){
            setMovie({
                ...movie,
                [e.target.name]: e.target.value,
            })
        } else {        
            setMovie({
                ...movie,
                stars: [...e.target.value.split(",")]
            })
        }
      };
    
    
    const handleSubmit = e => {
        e.preventDefault();
        axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        // res.data is the FULL array with the updated item
        // That's not always the case. Sometimes you need to build your
        // own updated array
        console.log("this is the response from handlesubmit", res.data)
        
        props.history.push(`/`);
      })
      .catch(err => console.log("this is the error", err));
    }
  
  return (
    <div>
      <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder= "title"
          value={movie.title}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          value={movie.director}
          placeholder="director"
        />
        <input
          type="number"
          name="metascore"
          placeholder="meta-score"
          onChange={changeHandler}
          value={movie.metascore}
          
        />
        <input
          type="text"
          name="stars"
          placeholder="stars"
          value={movie.stars}
          onChange={changeHandler}
        />
        
        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
