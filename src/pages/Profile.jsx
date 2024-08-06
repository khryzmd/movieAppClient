import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import UserContext from "../context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Set the user states values with the user details upon successful login.
        if (typeof data !== undefined) {
          setDetails(data.user);
        } else if (data.error === "User not found") {
          Swal.fire({
            title: "User Not Found",
            icon: "error",
            text: "User not found, please check if you're logged in or contact the administrator.",
          });
        } else {
          Swal.fire({
            title: "Profile Error",
            icon: "error",
            text: "Something went wrong, kindly contact us for assistance.",
          });
        }
      });
  }, []);

  return user.id === null && user.id === undefined ? (
    <Navigate to="/movies" />
  ) : (
    <>
      <Row>
        <Col className="mt-5 p-5 bg-dark text-white">
          <h1 className="mb-5 ">Profile</h1>
          <hr />
          <h4>Contacts</h4>
          <ul>
            <li>Email: {details.email}</li>
            <li>isAdmin: {details.isAdmin ? "Yes" : "No"}</li>
          </ul>
        </Col>
      </Row>
    </>
  );
}
