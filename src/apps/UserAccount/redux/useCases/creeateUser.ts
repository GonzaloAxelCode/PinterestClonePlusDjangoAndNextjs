import { hideNoti, showNoti } from "redux/notificationSlice";
import { CreateUser } from "apps/UserAccount/models/user.model";
import { fetchCreateUser } from "apps/UserAccount/services/authfetchs.service";
import { _createUser } from "../userSlice";

export default async function createUser(user: CreateUser, dispatch: any) {
  dispatch(
    //@ts-ignore
    _createUser({
      stateMessage: "Cargando ...",
      isLoadingCreate: true,
    })
  );
  try {
    const { isCreated, errors } = await fetchCreateUser(user);

    if (isCreated) {
      dispatch(
        //@ts-ignore
        _createUser({
          stateMessage: "Sucess:Usuario creado.Verifica en tu correo.",
          isLoadingCreate: false,
        })
      );
      dispatch(
        showNoti({
          message:
            "Usuario Creado.Te hemos mandado un correo de verificacion para activar tu cuenta.",
          type: "Success",
        })
      );

      return {
        errors: {},
      };
    } else {
      dispatch(
        //@ts-ignore
        _createUser({
          isLoadingCreate: false,
          stateMessage: "Fail:Hubo un error al crear el usuario.",
        })
      );
      dispatch(
        showNoti({
          message: "Hubo un error al crear el usuario.Mira la consola",
          type: "Fail",
        })
      );

      return {
        errors,
      };
    }
  } catch (error) {
    dispatch(
      //@ts-ignore
      _createUser({
        isLoadingCreate: false,
        stateMessage: "Fail:Error de red",
      })
    );
    dispatch(
      showNoti({
        message: "Hubo un error al crear el usuario.Mira la consola",
        type: "Fail",
      })
    );
    return {
      errors: {},
    };
  }
}
