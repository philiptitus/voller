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
} from '../constants/constants1';

// Enroll Course Reducer
//   /api/v2/courses/<int:course_id>/enroll/
export const enrollCourseReducer = (state = { course: null }, action) => {
  switch (action.type) {
    case ENROLL_COURSE_REQUEST:
      return { loading: true, ...state };
    case ENROLL_COURSE_SUCCESS:
      return { loading: false, course: action.payload, success: true };
    case ENROLL_COURSE_FAIL:
      return { loading: false, error: action.payload };
    case ENROLL_COURSE_RESET:
      return { course: null };
    default:
      return state;
  }
};

// Enroll Based on Trending Issue Reducer
//   /api/v2/courses/trending_issue/<int:trending_issue_id>/

export const enrollBasedOnTrendingIssueReducer = (state = { course: null }, action) => {
  switch (action.type) {
    case ENROLL_BASED_ON_TRENDING_ISSUE_REQUEST:
      return { loading: true, ...state };
    case ENROLL_BASED_ON_TRENDING_ISSUE_SUCCESS:
      return { loading: false, course: action.payload, success: true };
    case ENROLL_BASED_ON_TRENDING_ISSUE_FAIL:
      return { loading: false, error: action.payload };
    case ENROLL_BASED_ON_TRENDING_ISSUE_RESET:
      return { course: null };
    default:
      return state;
  }
};

// Unenroll Course Reducer
//   /api/v2/courses/unenroll/

export const unenrollCourseReducer = (state = { course: null }, action) => {
  switch (action.type) {
    case UNENROLL_COURSE_REQUEST:
      return { loading: true, ...state };
    case UNENROLL_COURSE_SUCCESS:
      return { loading: false, course: action.payload, success: true };
    case UNENROLL_COURSE_FAIL:
      return { loading: false, error: action.payload };
    case UNENROLL_COURSE_RESET:
      return { course: null };
    default:
      return state;
  }
};

// Course Detail Reducer
//   /api/v2/courses/<int:id>/

export const courseDetailReducer = (state = { course: null }, action) => {
  switch (action.type) {
    case COURSE_DETAIL_REQUEST:
      return { loading: true, ...state };
    case COURSE_DETAIL_SUCCESS:
      return { loading: false, course: action.payload, success: true };
    case COURSE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_DETAIL_RESET:
      return { course: null };
    default:
      return state;
  }
};

// Course List Reducer
//   /api/v2/courses/

export const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { loading: true, ...state };
    case COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload.results, success: true };
    case COURSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_LIST_RESET:
      return { courses: [] };
    default:
      return state;
  }
};

// Comment on Finance Reducer
//   /api/v2/finance/<int:finance_id>/comment/

export const commentOnFinanceReducer = (state = { comment: null }, action) => {
  switch (action.type) {
    case COMMENT_ON_FINANCE_REQUEST:
      return { loading: true, ...state };
    case COMMENT_ON_FINANCE_SUCCESS:
      return { loading: false, comment: action.payload, success: true };
    case COMMENT_ON_FINANCE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_ON_FINANCE_RESET:
      return { comment: null };
    default:
      return state;
  }
};

// Reply to Comment Reducer
//   /api/v2/comment/<int:comment_id>/reply/

export const replyToCommentReducer = (state = { reply: null }, action) => {
  switch (action.type) {
    case REPLY_TO_COMMENT_REQUEST:
      return { loading: true, ...state };
    case REPLY_TO_COMMENT_SUCCESS:
      return { loading: false, reply: action.payload, success: true };
    case REPLY_TO_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case REPLY_TO_COMMENT_RESET:
      return { reply: null };
    default:
      return state;
  }
};

// Delete Comment Reducer
//   /api/v2/comment/<int:comment_id>/delete/

export const deleteCommentReducer = (state = { comment: null }, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true, ...state };
    case DELETE_COMMENT_SUCCESS:
      return { loading: false, comment: action.payload, success: true };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_COMMENT_RESET:
      return { comment: null };
    default:
      return state;
  }
};

// Update Comment Reducer
//   /api/v2/comment/<int:comment_id>/update/

export const updateCommentReducer = (state = { comment: null }, action) => {
  switch (action.type) {
    case UPDATE_COMMENT_REQUEST:
      return { loading: true, ...state };
    case UPDATE_COMMENT_SUCCESS:
      return { loading: false, comment: action.payload, success: true };
    case UPDATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_COMMENT_RESET:
      return { comment: null };
    default:
      return state;
  }
};

// Finance Detail Reducer
//   /api/v2/finances/<int:finance_id>/

export const financeDetailReducer = (state = { finance: null }, action) => {
  switch (action.type) {
    case FINANCE_DETAIL_REQUEST:
      return { loading: true, ...state };
    case FINANCE_DETAIL_SUCCESS:
      return { loading: false, finance: action.payload, success: true };
    case FINANCE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case FINANCE_DETAIL_RESET:
      return { finance: null };
    default:
      return state;
  }
};

// Finance List Reducer
//   /api/v2/finances/

export const financeListReducer = (state = { finances: [] }, action) => {
  switch (action.type) {
    case FINANCE_LIST_REQUEST:
      return { loading: true, ...state };
    case FINANCE_LIST_SUCCESS:
      return { loading: false, finances: action.payload.results, success: true };
    case FINANCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case FINANCE_LIST_RESET:
      return { finances: [] };
    default:
      return state;
  }
};

// Trending Issue List Reducer
//   /api/v2/issues/

export const trendingIssueListReducer = (state = { issues: [] }, action) => {
  switch (action.type) {
    case TRENDING_ISSUE_LIST_REQUEST:
      return { loading: true, ...state };
    case TRENDING_ISSUE_LIST_SUCCESS:
      return { loading: false, issues: action.payload.results, success: true };
    case TRENDING_ISSUE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case TRENDING_ISSUE_LIST_RESET:
      return { issues: [] };
    default:
      return state;
  }
};

// Trending Issue Detail Reducer
//   /api/v2/trending-issue/<int:issue_id>/

export const trendingIssueDetailReducer = (state = { issue: null }, action) => {
  switch (action.type) {
    case TRENDING_ISSUE_DETAIL_REQUEST:
      return { loading: true, ...state };
    case TRENDING_ISSUE_DETAIL_SUCCESS:
      return { loading: false, issue: action.payload, success: true };
    case TRENDING_ISSUE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case TRENDING_ISSUE_DETAIL_RESET:
      return { issue: null };
    default:
      return state;
  }
};

// Prediction List Reducer
//   /api/v2/predictions/

export const predictionListReducer = (state = { predictions: [] }, action) => {
  switch (action.type) {
    case PREDICTION_LIST_REQUEST:
      return { loading: true, ...state };
    case PREDICTION_LIST_SUCCESS:
      return { loading: false, predictions: action.payload.results, success: true };
    case PREDICTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PREDICTION_LIST_RESET:
      return { predictions: [] };
    default:
      return state;
  }
};

// Notification List Reducer
//   /api/v2/notifications/

export const notificationListReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case NOTIFICATION_LIST_REQUEST:
      return { loading: true, ...state };
    case NOTIFICATION_LIST_SUCCESS:
      return { loading: false, notifications: action.payload, success: true };
    case NOTIFICATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case NOTIFICATION_LIST_RESET:
      return { notifications: [] };
    default:
      return state;
  }
};
