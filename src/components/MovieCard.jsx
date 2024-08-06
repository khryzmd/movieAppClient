import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MovieCard({ movieProp }) {
  // console.log(movieProp);
  const { _id, title, director, year, description, genre, comments } =
    movieProp;

  return (
    <Card id="movieCard">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{title}</Card.Title>
        <Card.Text className="m-0">Director: {director}</Card.Text>
        <Card.Text className="m-0">Year: {year}</Card.Text>
        <Card.Text className="m-0">Description: {description}</Card.Text>
        <Card.Text className="mb-3">Genre: {genre}</Card.Text>
        <div className="mt-auto">
          <Link className="btn btn-primary" to={`/movies/${_id}`}>
            Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movieProp: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }),
};
