import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Container, Row, Col } from 'react-bootstrap';

export default function UserView({moviesData}) {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        console.log(moviesData);

        const moviesArr = moviesData.map(movie => {
            if(movie) {
                return (
                	<Col id='cardCol' xs={12} sm={6} md={4} lg={3} className="my-3" key={movie._id}>
                    <div className="d-flex flex-column h-100">
                        <MovieCard movieProp={movie} />
                    </div>
                    </Col>

                    )
            } else {
                return null;
            }
        })

        setMovies(moviesArr)

    }, [moviesData])

    return(
        <>
        <h3 className='mt-5'>Our Movies:</h3>
        <Container>
        	<Row>
        			{ movies }
        	</Row>
        </Container>
            
        </>
        )
}