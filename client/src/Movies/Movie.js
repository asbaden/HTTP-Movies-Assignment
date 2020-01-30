import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        this.props.updateState({movie: res.data})
        this.setState({ movie: res.data })
      })
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    console.log("this is props in saved list", this.props)
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  updateMovie = () => {
    console.log("this is props in update movie", this.state)
    this.props.history.push(`/update-movie/${this.props.match.params.id}`)
  };

  handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log("this is response from delete", res)
        this.props.history.push("/");
      })
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="update-button" onClick={this.updateMovie}>
          Update
        </div>
        <div className="delete-button" onClick={this.handleDelete}>
          Delete
        </div>
      </div>
    );
  }
}
