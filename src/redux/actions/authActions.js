import axios from "axios";
import ApiRoutes from "../../constants/ApiRoutes";
import {changeAvatar, setToken, setUser} from "../slices/authSlice";

export const loadUser = async dispatch => {
  try {
    const res = await axios.get(ApiRoutes.LOAD_USER);
    if (res.data.success) {
      dispatch(setUser(res.data.loadedUser));
    }
  } catch (error) {
    dispatch(setToken(null));
    dispatch(setUser(null));
  }
};

export const loginUser = async (dispatch, form, next = () => {}, errorHandle = () => {}) => {
  try {
    const res = await axios.post(ApiRoutes.LOGIN, form);
    if (res.data.success) {
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.user));
      next();
    }
  } catch (error) {
    errorHandle(error);
  }
};

export const logoutUser = dispatch => {
  dispatch(setUser(null));
  dispatch(setToken(null));
};

export const changeUserPassword = async (userId, form, next = () => {}, errorHandle = () => {}) => {
  try {
    const res = await axios.put(`${ApiRoutes.CHANGE_PASSWORD}/${userId}`, form);
    if (res.data.success) {
      next(res.data.msg);
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const changeUserAvatar = async (
  dispatch,
  userId,
  form,
  next = () => {},
  errorHandle = () => {}
) => {
  try {
    const res = await axios.post(`${ApiRoutes.CHANGE_AVATAR}/${userId}`, form);
    if (res.data.success) {
      dispatch(changeAvatar(res.data.newAvatarURL));
      next();
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const registerNewUser = async (form, next = () => {}, errorHandle = () => {}) => {
  try {
    const res = await axios.post(ApiRoutes.REGISTER, form);
    if (res.data.success) {
      next(res.data.msg);
    }
  } catch (error) {
    errorHandle(error.response ? error.response.data.msg : error.message);
  }
};

export const sendVerifyAccountToken = async (email, next = () => {}, errorHandle = () => {}) => {
  try {
    const res = await axios.post(`${ApiRoutes.SEND_VERIFY_TOKEN}?email=${email}`);
    if (res.data.success) {
      next(res.data.msg);
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};

export const confirmAccountRegistration = async (
  token,
  next = () => {},
  errorHandle = () => {}
) => {
  try {
    const res = await axios.post(`${ApiRoutes.CONFIRM_REGISTRATION}?token=${token}`);
    if (res.data.success) {
      next(res.data.msg);
    }
  } catch (error) {
    errorHandle(error.response ? error.response.msg : error.message);
  }
};
