import React, { useState, useEffect } from 'react'
import './register.css'
import MainPage from '../../components/MainPage'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from '../../components/ErrorMessage'


const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userRegister = useSelector((state) => state.userRegister)
    const { error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    }



    return (
        <MainPage title="Register">
            <div className='registerContainer'>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>


                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button className='submit' variant='primary' type='submit'>Register</Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        Have an Account ? <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </div>
        </MainPage>
    )
}

export default Register
