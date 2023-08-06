import { UserAuth } from "apps/UserAccount/models/user.model";
import { fetchUser } from "apps/UserAccount/services/authfetchs.service";
import { getTokensFromLocalStorage } from "apps/UserAccount/services/localstorage.service";
import { _loadUser, _loadUserFail, _loginWithGoogleUser } from "../userSlice";
export const loadUser = async (dispatch: any) => {
  dispatch(
    //@ts-ignore
    _loginWithGoogleUser({
      isLoadingUser: true,
      stateMessage: "Cargando usuario ...",
    })
  );
  const data = await fetchUser();

  const { success, message, tokens } = getTokensFromLocalStorage();
  if (success) {
    const payload: UserAuth = {
      accessToken: tokens?.accessToken || "",
      refreshToken: tokens?.refreshToken || "",
      userAccount: data,
      isLoadingUser: false,
      isLoadingCreate: false,
      isAuthenticated: true,
      stateMessage: "Success:Authenticado con exito",
    };
    //@ts-ignore
    dispatch(_loadUser(payload));
  } else {
    dispatch(
      //@ts-ignore
      _loadUser({
        isLoadingUser: false,
        isAuthenticated: false,
        stateMessage: "Error:Tokens no encontrados",
      })
    );
  }
};
