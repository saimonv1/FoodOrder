import jwt_decode from "jwt-decode";
import { refresh } from "../services/auth.service";
import { authActions } from "../store/auth-slice";

export const getUserData = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const refreshUserData = async (refreshToken, dispatch) => {
  const newAccessToken = await refresh(refreshToken);
  if (newAccessToken) {
    setUserData(newAccessToken, refreshToken, dispatch);
  } else {
    setUserData(null, null, dispatch);
  }
};

export const setUserData = (accessToken, refreshToken, dispatch) => {
  if (!accessToken && !refreshToken) {
    localStorage.removeItem("user");
    dispatch(
      authActions.changeUser({
        user: null,
      })
    );
    return;
  }
  const decodedUser = jwt_decode(accessToken);
  const user = {
    ...decodedUser,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  localStorage.setItem("user", JSON.stringify(user));
  dispatch(
    authActions.changeUser({
      user: user,
    })
  );
};

export const updateUserAccessToken = (accessToken) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = accessToken;
  localStorage.setItem("user", JSON.stringify(user));
}
