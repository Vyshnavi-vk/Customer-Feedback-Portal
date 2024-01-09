import React, { useEffect } from 'react'
import MainPage from '../../components/MainPage'
import { Button, Card, Badge, Accordion } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { deleteFeedbackAction, listFeedbacks } from '../../actions/feedbackActions'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'



const MyFeedBacks = ({ search }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const feedbackList = useSelector((state) => state.feedbackList)
    const { loading, error, feedbacks } = feedbackList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const feedbackCreate = useSelector((state) => state.feedbackCreate)
    const { success: successCreate } = feedbackCreate

    const feedbackUpdate = useSelector((state) => state.feedbackUpdate)
    const { success: succesUpdate } = feedbackUpdate


    const feedbackDelete = useSelector((state) => state.feedbackDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = feedbackDelete

    useEffect(() => {
        dispatch(listFeedbacks())
        if (!userInfo) {
            navigate('/')
        }
    }, [dispatch, successCreate, succesUpdate, successDelete, navigate, userInfo])


    const deleteHandler = (id) => {
        if (window.confirm("Are you sure")) {
            dispatch(deleteFeedbackAction(id));
        }
    };

    return (
        <MainPage title={`Welcome Back ${userInfo.name}`}>
            <Link to='/createfeedback'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Feedback
                </Button>
            </Link>
            {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
            {loadingDelete && <Loading />}

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}


            {feedbacks?.reverse()
                .filter((filteredNote) =>
                    filteredNote.customerName.toLowerCase().includes(search.toLowerCase())
                )
                .map((note) => (
                    <Accordion defaultActiveKey={["0"]} key={note._id}>
                        <Accordion.Item eventkey="0">
                            <Card style={{ margin: 10 }}>
                                <Card.Header style={{ display: "flex" }}>
                                    <span
                                        style={{
                                            color: "black",
                                            textDecoration: "none",
                                            flex: 1,
                                            cursor: "pointer",
                                            alignSelf: "center",
                                            fontSize: 18,
                                        }}
                                    >
                                        <Accordion.Button as={Card.Text} variant="link">
                                            {note.feedback}
                                        </Accordion.Button>
                                    </span>
                                    <div>
                                        <Button href={`/feedback/${note._id}`}>Edit</Button>
                                        <Button
                                            variant="danger"
                                            className="mx-2"
                                            onClick={() => deleteHandler(note._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse>
                                    <Card.Body>
                                        <h4>
                                            <Badge bg="success" text="light">
                                                Created by - {note.customerName}{" "}
                                            </Badge>
                                        </h4>

                                        <blockquote className="blockquote mb-0">
                                            <p>{note.content}</p>
                                            <footer className="blockquote-footer">
                                                Created on{" "}
                                                <cite title="Source Title">
                                                    {note.date.substring(0, 10)}
                                                </cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion.Item>
                    </Accordion>
                ))}
        </MainPage>
    )
}

export default MyFeedBacks
