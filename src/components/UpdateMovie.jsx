import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function UpdateMovie({ movie, fetchData }) {
  const [movieId, setMovieId] = useState("");

  //data
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const [showUpdate, setShowUpdate] = useState(false);

  const openUpdate = (movieId) => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/getMovie/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovieId(data._id);
        setTitle(data.title);
        setDirector(data.director);
        setYear(data.year);
        setDescription(data.description);
        setGenre(data.genre);
      });
    setShowUpdate(true);
  };

  const closeUpdate = () => {
    setShowUpdate(false);
    setTitle("");
    setDirector("");
    setYear(0);
    setDescription("");
    setGenre("");
  };

  const updateMovie = (e, movieId) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/movies/updateMovie/${movieId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        director,
        year,
        description,
        genre,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Movie updated successfully") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Movie successfully updated",
          });
          closeUpdate();
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          closeUpdate();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={() => openUpdate(movie)}
        className="mt-2"
      >
        Update
      </Button>
      <Modal show={showUpdate} onHide={closeUpdate}>
        <Form onSubmit={(e) => updateMovie(e, movieId)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="movieName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieDirector">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                required
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdate}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
