import React, { useState, useEffect } from 'react'
import './login.css'
import MainPage from '../../components/MainPage'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'



const Login = ({ history }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate('/myfeedbacks')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <MainPage title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />

                    </Form.Group>


                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                        />

                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className='submit'
                    >Submit</Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New User ? <Link to="/register">Register here</Link> </Col>
                </Row>

            </div>
        </MainPage>
    )
}

export default Login
