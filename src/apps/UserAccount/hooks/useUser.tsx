import { useEffect } from "react";
import { getTokensFromLocalStorage } from "apps/UserAccount/services/localstorage.service";
import { verifyToken } from "apps/UserAccount/redux/useCases/verifyToken";
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "apps/UserAccount/redux/useCases/loadUser";

const useUser = () => {
  const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.Auth);
    
  useEffect(() => {
    const verifyUser = async () => {
      const { success, tokens } = getTokensFromLocalStorage();
      if (success) {
        const isVerify = await verifyToken(tokens?.accessToken || "", dispatch);
        if (isVerify) {
          loadUser(dispatch);
        }
      }
    };
    verifyUser();
  }, []);
    
    
    return {
      isAuthenticated: authState.isAuthenticated,
      user: authState.userAccount,
      isVerify:authState.isVerify
    };
};
export default useUser