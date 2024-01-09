import {
    FEEDBACK_UPDATE_REQUEST,
    FEEDBACK_UPDATE_SUCCESS,
    FEEDBACK_UPDATE_FAIL,
    FEEDBACK_CREATE_FAIL,
    FEEDBACK_CREATE_REQUEST,
    FEEDBACK_CREATE_SUCCESS,
    FEEDBACK_DELETE_FAIL,
    FEEDBACK_DELETE_REQUEST,
    FEEDBACK_DELETE_SUCCESS,
    FEEDBACK_LIST_FAIL,
    FEEDBACK_LIST_REQUEST,
    FEEDBACK_LIST_SUCCESS,
} from "../constants/feedbackConstants";


export const feedbackListReducer = (state = { feedbacks: [] }, action) => {
    switch (action.type) {
        case FEEDBACK_LIST_REQUEST:
            return { loading: true }
        case FEEDBACK_LIST_SUCCESS:
            return { loading: false, feedbacks: action.payload }
        case FEEDBACK_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const feedbackCreateReducer = (state = { feedback: [] }, action) => {
    switch (action.type) {
        case FEEDBACK_CREATE_REQUEST:
            return { loading: true };
        case FEEDBACK_CREATE_SUCCESS:
            return { loading: false, success: true };
        case FEEDBACK_CREATE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};


export const feedbackUpdateReducer = (state = { feedback: [] }, action) => {
    switch (action.type) {
        case FEEDBACK_UPDATE_REQUEST:
            return { loading: true };
        case FEEDBACK_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case FEEDBACK_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };

        default:
            return state;
    }
};


export const feedbackDeleteReducer = (state = { feedback: [] }, action) => {
    switch (action.type) {
        case FEEDBACK_DELETE_REQUEST:
            return { loading: true };
        case FEEDBACK_DELETE_SUCCESS:
            return { loading: false, success: true };
        case FEEDBACK_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };

        default:
            return state;
    }
};
