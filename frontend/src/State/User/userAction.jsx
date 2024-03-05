import axios from "axios";
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  LOGOUT_USER_REQUEST,
} from "./userTypes";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const logoutUserRequest = () => {
  return {
    type: LOGOUT_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const fetchUser = (user) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());

    if (user) {
      dispatch(fetchUserSuccess(user));
    } else {
      dispatch(fetchUserFailure("Unauthorized User."));
    }
  };
};

export const updateUser = ({ img, name, token }) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        "/api/user/update",
        { img, name },
        config
      );
      if (data) {
        dispatch(fetchUserSuccess(data));
      }
    } catch (error) {
      dispatch(fetchUserFailure("Can not Update."));
    }
  };
};
