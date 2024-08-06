import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';

export default function Login() {

    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Disable and enable submit button
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            if(data.access !== undefined){

                console.log(data.access);

                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                setEmail('');
                setPassword('');

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "You are now logged in."
                })
            
            } else if (data.message == "Email and password do not matchd") {

                Swal.fire({
                    title: "Login Failed",
                    icon: "error",
                    text: "Email and password do not match"
                })

            } else {

                Swal.fire({
                    title: "User Not Found",
                    icon: "error",
                    text: `${email} does not exist.`
                })    

            }

        })

    }

    function retrieveUserDetails(token){

        fetch(`${import.meta.env.VITE_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.user);

            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });
        })
    }

    useEffect(() => {


        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (    
            (user.id !== null && user.id !== undefined) ?
            <Navigate to="/movies" />
            :
            <Form onSubmit={(e) => authenticate(e)}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter your email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter your password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                { isActive ? 
                    <Button variant="primary" type="submit" id="loginBtn">
                        Login
                    </Button>
                    : 
                    <Button variant="danger" type="submit" id="loginBtn" disabled>
                        Login
                    </Button>
                }
            </Form>       
    )
}