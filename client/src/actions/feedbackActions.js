import {
    FEEDBACK_CREATE_REQUEST,
    FEEDBACK_CREATE_SUCCESS,
    FEEDBACK_CREATE_FAIL,
    FEEDBACK_LIST_FAIL,
    FEEDBACK_LIST_REQUEST,
    FEEDBACK_LIST_SUCCESS,
    FEEDBACK_UPDATE_REQUEST,
    FEEDBACK_UPDATE_SUCCESS,
    FEEDBACK_UPDATE_FAIL,
    FEEDBACK_DELETE_REQUEST,
    FEEDBACK_DELETE_SUCCESS,
    FEEDBACK_DELETE_FAIL,
} from "../constants/feedbackConstants"

import axios from 'axios'

export const listFeedbacks = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FEEDBACK_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('http://localhost:5000/api/feedback/getfeedback', config)

        dispatch({
            type: FEEDBACK_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: FEEDBACK_LIST_FAIL,
            payload: message,
        });
    }
}


export const createFeedbackAction = (customerName, feedback) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: FEEDBACK_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('http://localhost:5000/api/feedback/addfeedback',
            { customerName, feedback }, config);


        dispatch({
            type: FEEDBACK_CREATE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: FEEDBACK_CREATE_FAIL,
            payload: message,
        });
    }
};


export const updateFeedbackAction = (id, customerName, feedback) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: FEEDBACK_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `http://localhost:5000/api/feedback/${id}`,
            { customerName, feedback },
            config
        );

        dispatch({
            type: FEEDBACK_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: FEEDBACK_UPDATE_FAIL,
            payload: message,
        });
    }

};


export const deleteFeedbackAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FEEDBACK_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`http://localhost:5000/api/feedback/${id}`, config);

        dispatch({
            type: FEEDBACK_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: FEEDBACK_DELETE_FAIL,
            payload: message,
        });
    }
};

