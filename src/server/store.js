import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import reducers from userReducers
import * as userReducers from './reducers/userReducers';

// Import the new reducers
import * as actionReducers from './reducers/reducers1';

const reducer = combineReducers({
    // User-related reducers
    userLogin: userReducers.userLoginReducer,
    userRegister: userReducers.userRegisterReducer,
    userDetails: userReducers.userDetailsReducer,
    userUpdateProfile: userReducers.userUpdateProfileReducer,
    accountDelete: userReducers.accountDeleteReducer,
    forgotPassword: userReducers.forgotPasswordReducer,
    resetPassword: userReducers.resetPasswordReducer,
    getOtp: userReducers.getOtpReducer,
    verifyOtp: userReducers.verifyOtpReducer,

    // New action-related reducers
    enrollCourse: actionReducers.enrollCourseReducer,
    enrollBasedOnTrendingIssue: actionReducers.enrollBasedOnTrendingIssueReducer,
    unenrollCourse: actionReducers.unenrollCourseReducer,
    courseDetail: actionReducers.courseDetailReducer,
    courseList: actionReducers.courseListReducer,
    commentOnFinance: actionReducers.commentOnFinanceReducer,
    replyToComment: actionReducers.replyToCommentReducer,
    deleteComment: actionReducers.deleteCommentReducer,
    updateComment: actionReducers.updateCommentReducer,
    financeDetail: actionReducers.financeDetailReducer,
    financeList: actionReducers.financeListReducer,
    trendingIssueList: actionReducers.trendingIssueListReducer,
    trendingIssueDetail: actionReducers.trendingIssueDetailReducer,
    predictionList: actionReducers.predictionListReducer,
    notificationList: actionReducers.notificationListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

// Check if Redux DevTools is available, otherwise use normal middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
