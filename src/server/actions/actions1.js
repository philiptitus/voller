import axios from 'axios';
import { API_URL } from 'server/constants/API';
import {
  ENROLL_COURSE_REQUEST,
  ENROLL_COURSE_SUCCESS,
  ENROLL_COURSE_FAIL,
  ENROLL_COURSE_RESET,
  ENROLL_BASED_ON_TRENDING_ISSUE_REQUEST,
  ENROLL_BASED_ON_TRENDING_ISSUE_SUCCESS,
  ENROLL_BASED_ON_TRENDING_ISSUE_FAIL,
  ENROLL_BASED_ON_TRENDING_ISSUE_RESET,
  UNENROLL_COURSE_REQUEST,
  UNENROLL_COURSE_SUCCESS,
  UNENROLL_COURSE_FAIL,
  UNENROLL_COURSE_RESET,
  COURSE_DETAIL_REQUEST,
  COURSE_DETAIL_SUCCESS,
  COURSE_DETAIL_FAIL,
  COURSE_DETAIL_RESET,
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_LIST_RESET,
  COMMENT_ON_FINANCE_REQUEST,
  COMMENT_ON_FINANCE_SUCCESS,
  COMMENT_ON_FINANCE_FAIL,
  COMMENT_ON_FINANCE_RESET,
  REPLY_TO_COMMENT_REQUEST,
  REPLY_TO_COMMENT_SUCCESS,
  REPLY_TO_COMMENT_FAIL,
  REPLY_TO_COMMENT_RESET,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_RESET,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_RESET,
  FINANCE_DETAIL_REQUEST,
  FINANCE_DETAIL_SUCCESS,
  FINANCE_DETAIL_FAIL,
  FINANCE_DETAIL_RESET,
  FINANCE_LIST_REQUEST,
  FINANCE_LIST_SUCCESS,
  FINANCE_LIST_FAIL,
  FINANCE_LIST_RESET,
  TRENDING_ISSUE_LIST_REQUEST,
  TRENDING_ISSUE_LIST_SUCCESS,
  TRENDING_ISSUE_LIST_FAIL,
  TRENDING_ISSUE_LIST_RESET,
  TRENDING_ISSUE_DETAIL_REQUEST,
  TRENDING_ISSUE_DETAIL_SUCCESS,
  TRENDING_ISSUE_DETAIL_FAIL,
  TRENDING_ISSUE_DETAIL_RESET,
  PREDICTION_LIST_REQUEST,
  PREDICTION_LIST_SUCCESS,
  PREDICTION_LIST_FAIL,
  PREDICTION_LIST_RESET,
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_RESET,
 TRANSLATE_TEXT_REQUEST,
  TRANSLATE_TEXT_SUCCESS,
  TRANSLATE_TEXT_FAIL,
  TRANSLATE_TEXT_RESET
} from '../constants/constants1';


// actions.js


const url = "https://api.vambo.ai/v1/translate/text";
const token = "vai-CCSZiwt4EMgB6ohwyuvvzzAnit1ddtUx";

export const translateText = (text) => async (dispatch) => {
  try {
    dispatch({ type: TRANSLATE_TEXT_REQUEST });

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const data = {
      text: text,
      source_lang: "eng",
      target_lang: "swh"
    };

    const response = await axios.post(url, data, config);

    dispatch({ type: TRANSLATE_TEXT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: TRANSLATE_TEXT_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetTranslateText = () => (dispatch) => {
  dispatch({ type: TRANSLATE_TEXT_RESET });
};

// Enroll Course Action
export const enrollCourse = (courseId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENROLL_COURSE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API_URL}/api/v2/courses/${courseId}/enroll/`, {}, config);

    dispatch({ type: ENROLL_COURSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ENROLL_COURSE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetEnrollCourse = () => (dispatch) => {
  dispatch({ type: ENROLL_COURSE_RESET });
};

// Enroll Based on Trending Issue Action
export const enrollBasedOnTrendingIssue = (trendingIssueId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENROLL_BASED_ON_TRENDING_ISSUE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API_URL}/api/v2/courses/trending_issue/${trendingIssueId}/`, {}, config);

    dispatch({ type: ENROLL_BASED_ON_TRENDING_ISSUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ENROLL_BASED_ON_TRENDING_ISSUE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetEnrollBasedOnTrendingIssue = () => (dispatch) => {
  dispatch({ type: ENROLL_BASED_ON_TRENDING_ISSUE_RESET });
};

// Unenroll Course Action
export const unenrollCourse = () => async (dispatch, getState) => {
  try {
    dispatch({ type: UNENROLL_COURSE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API_URL}/api/v2/courses/unenroll/`, {}, config);

    dispatch({ type: UNENROLL_COURSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNENROLL_COURSE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetUnenrollCourse = () => (dispatch) => {
  dispatch({ type: UNENROLL_COURSE_RESET });
};

// Course Detail Action
export const getCourseDetail = (courseId) => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_DETAIL_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/api/v2/courses/${courseId}/`, config);

    dispatch({ type: COURSE_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_DETAIL_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetCourseDetail = () => (dispatch) => {
  dispatch({ type: COURSE_DETAIL_RESET });
};

// Course List Action
export const getCourseList = (name = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/api/v2/courses/?name=${name}`, config);

    dispatch({ type: COURSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetCourseList = () => (dispatch) => {
  dispatch({ type: COURSE_LIST_RESET });
};

// Comment on Finance Action
export const commentOnFinance = (financeId, commentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_ON_FINANCE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API_URL}/api/v2/finance/${financeId}/comment/`, commentData, config);

    dispatch({ type: COMMENT_ON_FINANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMENT_ON_FINANCE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetCommentOnFinance = () => (dispatch) => {
  dispatch({ type: COMMENT_ON_FINANCE_RESET });
};

// Reply to Comment Action
export const replyToComment = (commentId, replyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: REPLY_TO_COMMENT_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`${API_URL}/api/v2/comment/${commentId}/reply/`, replyData, config);

    dispatch({ type: REPLY_TO_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REPLY_TO_COMMENT_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetReplyToComment = () => (dispatch) => {
  dispatch({ type: REPLY_TO_COMMENT_RESET });
};

// Delete Comment Action
export const deleteComment = (commentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.delete(`${API_URL}/api/v2/comment/${commentId}/delete/`, config);

    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetDeleteComment = () => (dispatch) => {
  dispatch({ type: DELETE_COMMENT_RESET });
};

// Update Comment Action
export const updateComment = (commentId, commentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_COMMENT_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${API_URL}/api/v2/comment/${commentId}/update/`, commentData, config);

    dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_COMMENT_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetUpdateComment = () => (dispatch) => {
  dispatch({ type: UPDATE_COMMENT_RESET });
};

// Finance Detail Action
export const getFinanceDetail = (financeId) => async (dispatch, getState) => {
  try {
    dispatch({ type: FINANCE_DETAIL_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/api/v2/finances/${financeId}/`, config);

    dispatch({ type: FINANCE_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FINANCE_DETAIL_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetFinanceDetail = () => (dispatch) => {
  dispatch({ type: FINANCE_DETAIL_RESET });
};

// Finance List Action
export const getFinanceList = (title = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: FINANCE_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/api/v2/finances/?title=${title}`, config);

    dispatch({ type: FINANCE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FINANCE_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetFinanceList = () => (dispatch) => {
  dispatch({ type: FINANCE_LIST_RESET });
};

// Trending Issue List Action
export const getTrendingIssueList = (issue = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: TRENDING_ISSUE_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/api/v2/issues/?issue=${issue}`, config);

    dispatch({ type: TRENDING_ISSUE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRENDING_ISSUE_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetTrendingIssueList = () => (dispatch) => {
  dispatch({ type: TRENDING_ISSUE_LIST_RESET });
};

// Trending Issue Detail Action
export const getTrendingIssueDetail = (issueId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRENDING_ISSUE_DETAIL_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/api/v2/trending-issue/${issueId}/`, config);

    dispatch({ type: TRENDING_ISSUE_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRENDING_ISSUE_DETAIL_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetTrendingIssueDetail = () => (dispatch) => {
  dispatch({ type: TRENDING_ISSUE_DETAIL_RESET });
};

// Prediction List Action
export const getPredictionList = (predictionType = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: PREDICTION_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/api/v2/predictions/`, config);

    dispatch({ type: PREDICTION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PREDICTION_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetPredictionList = () => (dispatch) => {
  dispatch({ type: PREDICTION_LIST_RESET });
};

// Notification List Action
export const getNotificationList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTIFICATION_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/api/v2/notifications/`, config);

    dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

export const resetNotificationList = () => (dispatch) => {
  dispatch({ type: NOTIFICATION_LIST_RESET });
};
