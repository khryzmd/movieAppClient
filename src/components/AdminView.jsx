import { useState, useEffect } from "react";
import { Button, Table, Container, Accordion } from "react-bootstrap";
import UpdateMovie from "./UpdateMovie";
import DeleteMovie from "./DeleteMovie";
import AddNewMovie from "./AddNewMovie";

export default function AdminView({ moviesData, fetchData }) {
  const [movies, setMovies] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    console.log(moviesData);

    const moviesArr = moviesData.map((movie) => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.director}</td>
        <td>{movie.year}</td>
        <td>{movie.description}</td>
        <td>{movie.genre}</td>
        <td className="text-center">
          <UpdateMovie movie={movie._id} fetchData={fetchData} />
          <DeleteMovie
            movie={movie._id}
            fetchData={fetchData}
          />
        </td>
      </tr>
    ));

    setMovies(moviesArr);
  }, [moviesData]);

  return (
    <>
      <h1 className="text-center mt-4">Admin Dashboard</h1>

      <Container className="text-center mb-4">
        <AddNewMovie fetchData={fetchData} />
      </Container>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Description</th>
            <th>Genre</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>{movies}</tbody>
      </Table>
    </>
  );
}
