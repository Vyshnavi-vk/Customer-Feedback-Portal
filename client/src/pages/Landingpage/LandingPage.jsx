import React from 'react'
import { Container, Row, Button } from "react-bootstrap";
import './LandingPage.css'



const LandingPage = () => {

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className='title'>Welcome to Customer Feedback Portal </h1>
                        </div>


                        <div className="buttonContainer">
                            <a href="/login">
                                <Button size="lg" className="loginbutton">Login</Button>
                            </a>


                            <a href="/register">
                                <Button size="lg"
                                    className="loginbutton"
                                    variant="danger"
                                >Sign Up</Button>
                            </a>
                        </div>

                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage
