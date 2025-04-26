const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL


export const endpoints = {
  REGISTER_API_USER: "/user/register-user",
  REGISTER_API_WORKER: "/worker/register-worker",
  LOGIN_API_USER: "/user/login-user",
  LOGIN_API_WORKER: "/worker/login-worker",
}

export const addressUpdate = {
  UPDATE_ADDRESS_API_USER: "/user/update-address",
}
export const jobsCreate = {
  JOB_API_CREATE: "/worker/jobs",
}

export const getCategoryAll = "/user/get-categories"

export const ratingAndReview = {
  POST_RATING_API: "/rating/post-rating",
  GET_AVERAGE_RATING_API: "/rating/getAverageRating",
  POST_REVIEW_API: "/rating/post-review",
  GET_ALL_REVIEW_API: "/rating/getAllReview",
}

export const adminapis = {
  ADMIN_LOGIN_API: "/admin/login-admin",
  GET_ADMIN_PROFILE_API: "/admin/get-admin",
  CREATE_CATEGORY_API: "/admin/create-category",
  DELETE_CATEGORY_API: "/admin/delete-category/:id",
  GET_CATEGORY_API: "/admin/get-category/:page/:limit",
}
