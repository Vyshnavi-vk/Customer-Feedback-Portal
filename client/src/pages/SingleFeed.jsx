import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MainPage from '../components/MainPage'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { updateFeedbackAction, deleteFeedbackAction } from '../actions/feedbackActions'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from "react-markdown";
import { useParams } from 'react-router-dom';



const SingleFeed = () => {
    const { id } = useParams();

    const [customerName, setCustomerName] = useState()
    const [content, setContent] = useState()
    const [date, setDate] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const feedbackUpdate = useSelector((state) => state.feedbackUpdate)
    const { loading, error } = feedbackUpdate

    const feedbackDelete = useSelector((state) => state.feedbackDelete)
    const { loading: loadingDelete, error: errorDelete } = feedbackDelete

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteFeedbackAction(id))
        }
        navigate('/myfeedbacks')
    }

    useEffect(() => {
        const fetching = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`http://localhost:5000/api/feedback/getfeedback/${id}`, config)
            setCustomerName(data.customerName)
            setContent(data.feedback)
            setDate(data.date)
        }
        fetching()
    }, [id, date])


    const resetHandler = () => {
        setCustomerName("")
        setContent("")
        setDate("")
    }


    const updateHandler = (e) => {
        e.preventDefault()
        dispatch(updateFeedbackAction(id, customerName, content, date))
        if (!customerName || !content) return
        resetHandler()
        navigate('/myfeedbacks')
    }


    return (
        <MainPage title='Edit Feedback'>
            <Card>
                <Card.Header>Edit your feedback</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {error && <ErrorMessage varaint='danger'>{error}</ErrorMessage>}
                        {errorDelete && (
                            <ErrorMessage varaint='danger'>{errorDelete}</ErrorMessage>
                        )}

                        <Form.Group controlId="name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter your name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter the content/feedback"
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit">
                            Update Fedback
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(id)}
                        >
                            Delete Feedback
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainPage>
    )
}

export default SingleFeed
