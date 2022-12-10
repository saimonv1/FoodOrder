import jwt_decode from "jwt-decode";
import { refresh } from "../services/auth.service";
import { authActions } from "../store/auth-slice";

export const getUserData = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    // if(jwt_decode(userData.accessToken).exp >= Date.now() / 1000) {
    //     refreshUserData(userData.refreshToken)
    //     .then(() => {
    //         return getUserData();
    //     });
    // }
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
  //   setTimeout(() => {
  //     refreshUserData(refreshToken, dispatch);
  //   }, (decodedUser.exp - decodedUser.iat) * 1000);
};

export const updateUserAccessToken = (accessToken) => {
  let user = localStorage.getItem("user");
  user.accessToken = accessToken;
  localStorage.setItem("user", user);
}
