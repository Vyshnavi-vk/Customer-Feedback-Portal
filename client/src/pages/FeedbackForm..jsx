import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import MainPage from '../components/MainPage'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { createFeedbackAction } from '../actions/feedbackActions'
import { useNavigate } from 'react-router-dom'


const FeedbackForm = () => {
    const [customerName, setCustomerName] = useState("")
    const [content, setContent] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const feedbackCreate = useSelector((state) => state.feedbackCreate)
    const { loading, error } = feedbackCreate



    const resetHandler = () => {
        setCustomerName("")
        setContent("")
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!customerName || !content) return
        dispatch(createFeedbackAction(customerName, content))
        resetHandler()
        navigate('/myfeedbacks')
    }

    return (
        <MainPage title='Give feedback'>
            <Card>
                <Card.Header>Create a new feedback</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        <Form.Group controlId='name'>
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                type='name'
                                value={customerName}
                                placeholder='Please enter your name'
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                        {content && (
                            <Card>
                                <Card.Header>Feedback Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        {loading && <Loading size={50} />}
                        <Button type='submit' varaint='primary'>
                            Submit Feedback
                        </Button>

                        <Button className='mex-2' onClick={resetHandler} variant='danger'>
                            Reset fields
                        </Button>

                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainPage>
    )
}

export default FeedbackForm
