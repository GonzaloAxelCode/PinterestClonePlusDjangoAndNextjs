import {
  fetchAccessToken,
  fetchUser,
} from "apps/UserAccount/services/authfetchs.service";
import { _verifyTokenUser, _verifyTokenUserFail } from "../userSlice";

export const verifyToken = async (accessToken: string, dispatch: any) => {
  dispatch(
    //@ts-ignore
    _verifyTokenUser({
      isLoadingUser: true,
      stateMessage: "cargando ...",
    })
  );

  const isAuthenticated = await fetchAccessToken(accessToken);
  if (isAuthenticated) {
    dispatch(
      //@ts-ignore
      _verifyTokenUser({
        isLoadingUser: false,
        isVerify: true,
        isAuthenticated: true,
        stateMessage: "Success:Usuario verificado",
      })
    );
    return true;
  } else {
    dispatch(
      //@ts-ignore
      _verifyTokenUserFail({
        id_token_google: "",
        accessToken: "",
        refreshToken: "",
        userAccount: null,
        isLoadingUser: false,
        isVerify: false,
        isAuthenticated: false,
        stateMessage: "Error:Error al verificar token chale",
      })
    );

    return false;
  }
};
