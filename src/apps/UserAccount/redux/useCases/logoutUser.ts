import { fetchAccessToken } from "apps/UserAccount/services/authfetchs.service";


export const logOutUser = async (accessToken: string,dispatch:any) => {
  dispatch(
    //@ts-ignore
    _verifyTokenUser({
      isLoadingUser: true,
      stateMessage:"Saliendo de session ..."
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
  }
}