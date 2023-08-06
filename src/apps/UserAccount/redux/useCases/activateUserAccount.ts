import { showNoti } from "redux/notificationSlice";
import { fetchActivateUser } from "apps/UserAccount/services/authfetchs.service";
import { _activateUser, _activateUserFail } from "../userSlice";
import { Dispatch } from "redux";

const activateUserAccount = async (
  uid: string,
  token: string,
  dispatch: Dispatch<any>
) => {
  dispatch(
    //@ts-ignore
    _activateUser({
      isLoadingActivate: true,
    })
  );

  try {
    const isActivate = await fetchActivateUser(uid, token);

    if (isActivate) {
      dispatch(
        //@ts-ignore
        _activateUser({
          isLoadingActivate: false,

          stateMessage:
            "El Usuario se acaba de activar con exito.Continue iniciando session",
        })
      );

      dispatch(
        showNoti({
          type: "Sucesss",
          message:
            "El Usuario se acaba de activar con exito.Continue iniciando session",
        })
      );
    } else {
      dispatch(
        //@ts-ignore
        _activateUserFail({
          isLoadingActivate: false,

          stateMessage: "Usuario no se activo.Parametros incorectos",
        })
      );
      dispatch(
        showNoti({
          type: "Fail",
          message: "Usuario no se activo.Parametros incorectos",
        })
      );
    }
    return isActivate;
  } catch (error) {
      return false;
      
  }
};

export default activateUserAccount;
