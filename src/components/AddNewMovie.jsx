import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AddNewMovie({ fetchData }) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const [showAddNewMovie, setShowAddNewMovie] = useState(false);

  const closeAddNewMovie = () => {
    setShowAddNewMovie(false);
    setTitle("");
    setDirector("");
    setYear(0);
    setDescription("");
    setGenre("");
  };

  const addNewMovie = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/movies/addMovie`, {
      method: "POST",
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
        if (data.error === "Failed to save the movie") {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });
          closeAddNewMovie();
          fetchData();
        } else {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Movie successfully updated",
          });
          closeAddNewMovie();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        className="mx-1"
        variant="primary"
        size="sm"
        onClick={() => setShowAddNewMovie(true)}
      >
        Add New Movie
      </Button>
      <Modal show={showAddNewMovie} onHide={closeAddNewMovie}>
        <Form onSubmit={(e) => addNewMovie(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="movieName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie title"
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
                placeholder="Enter movie director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter movie description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter movie genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAddNewMovie}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Movie
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
