import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer'
import { feedbackCreateReducer, feedbackDeleteReducer, feedbackListReducer, feedbackUpdateReducer } from './reducers/feedbackReducer'


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    feedbackList: feedbackListReducer,
    feedbackCreate: feedbackCreateReducer,
    feedbackUpdate: feedbackUpdateReducer,
    feedbackDelete: feedbackDeleteReducer,
})


const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store