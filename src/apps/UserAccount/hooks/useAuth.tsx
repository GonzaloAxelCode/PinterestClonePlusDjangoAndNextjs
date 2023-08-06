import { useEffect, useState } from "react";
import { clearTokens } from "apps/UserAccount/services/localstorage.service";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { _loginWithGoogleUser } from "apps/UserAccount/redux/userSlice";

import loginWithGoogleUser from "apps/UserAccount/redux/useCases/loginWithGoogleUser";

import { signIn, signOut } from "next-auth/react";
import { fetchUserLogout } from "apps/UserAccount/services/authfetchs.service";
import { useNotification } from "ui/hooks/useNotification";
import { CreateUser } from "apps/UserAccount/models/user.model";
import createUser from "apps/UserAccount/redux/useCases/creeateUser";
import { RootState } from "redux/store";
export const useAuth = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession({ required: false });

  const [errorsAuth, setErrorsAuth] = useState({
    email: "",
    password: [],
    non_field_errors: [],
    username: "",
  });
  const { showNotification } = useNotification();

  const authGoogle = async () => {
    if (session) {
      //@ts-ignore
      if (session.token.token.account) {
        //@ts-ignore
        await loginWithGoogleUser(
          //@ts-ignore
          { id_token: session.token.token.account.id_token },
          dispatch
        );
      }
    }
  };

  const signOutAll = async () => {
    clearTokens();
    signOut();
    fetchUserLogout();
    showNotification("Success", "Saliste de session con exito");
  };

  const createAccount = async (user: CreateUser) => {
    const { errors } = await createUser(user, dispatch);
    setErrorsAuth(errors);
  };

  useEffect(() => {
    authGoogle();
  }, [session]);

  const isLoadingCreated = useSelector(
    (state: RootState) => state.Auth.isLoadingCreate
  );
  return {
    signInGoogle: signIn,
    signOutAll,
    createAccount,
    errorsAuth,
    isLoadingCreated,
    setErrorsAuth,
  };
};
