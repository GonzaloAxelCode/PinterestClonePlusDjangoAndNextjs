import { fetchGoogleLogin } from "../../services/authfetchs.service";
import { useDispatch } from "react-redux";
import {
  _loadUser,
  _loadUserFail,
  _loginWithGoogleUser,
  _loginWithGoogleUserFail,
  _verifyTokenUserFail,
} from "../userSlice";
import { UserAuth } from "../../models/user.model";
import axios from "axios";
import { saveTokensToLocalStorage } from "../../services/localstorage.service";
import { showNoti } from "redux/notificationSlice";

type LoginGoogleData = {
  id_token: string;
  save_info_in_google?: boolean;
};

// Cancel token source
const { CancelToken } = axios;
const source = CancelToken.source();

export default async function loginWithGoogleUser(
  user_google: LoginGoogleData,
  dispatch: any
) {
  dispatch(
    //@ts-ignore
    _loginWithGoogleUser({
      isLoadingUser: true,
      stateMessage: "Cargando ...",
    })
  );
  try {
    const response = await fetchGoogleLogin(user_google.id_token, source.token);

    const { refresh, access, user } = response.data;

    const payload: UserAuth = {
      accessToken: access,
      refreshToken: refresh,
      userAccount: user,
      isLoadingUser: false,
      isLoadingCreate:false,
      isAuthenticated: true,
      stateMessage: "Success:Authenticado con exito",
    };
    saveTokensToLocalStorage({
      accessToken: access,
      refreshToken: refresh,
    });
    //@ts-ignore
    dispatch(_loginWithGoogleUser(payload));
    dispatch(
      showNoti({
        type: "Success",
        message: "Authenticacion por google exitoso",
      })
    );
  } catch (error: any) {
    dispatch(
      //@ts-ignore
      _loginWithGoogleUserFail({
        isLoadingUser: false,
        isAuthenticated: false,
        stateMessage: "Error:Error fetch con google" + error.message,
      })
    );
  }
}
