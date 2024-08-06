import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function DeleteMovie({ movie, fetchData }) {
  const deleteMovie = (movieId) => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/deleteMovie/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Movie deleted successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Movie deleted successfully",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please Try again",
          });
          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={() => deleteMovie(movie)}
        className="mt-2"
      >
        Delete
      </Button>
    </>
  );
}
