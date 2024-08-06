import { useState, useEffect, useContext } from "react";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import UserContext from "../context/UserContext";

export default function Movies() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/movies/getMovies`;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Error finding movies") {
          setMovie([]);
        } else {
          setMovies(data.movies);
        }
      });
  };

  useEffect(() => {
    fetchData();
    console.log(movies);
  }, [user]);

  return user.isAdmin === true ? (
    <AdminView moviesData={movies} fetchData={fetchData} />
  ) : (
    <UserView moviesData={movies} />
  );
}
