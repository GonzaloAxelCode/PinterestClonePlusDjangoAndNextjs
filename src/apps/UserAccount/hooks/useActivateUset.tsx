import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import activateUserAccount from "apps/UserAccount/redux/useCases/activateUserAccount";
const useActivateUserAccount = () => {
  const dispatch = useDispatch();
  const [isActivateEmailAccount, setIsActivateEmailAccount] = useState(false);
  const [tokenActivate, setTokenActivate] = useState<any>(false);
  const [uidActivate, setUidActivate] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    const { uid, token } = router.query;
    if (uid && token) {
      setTokenActivate(token);
      setUidActivate(uid);
    }
  }, [activateEmailAccount]);

    async function activateEmailAccount() {
        
    if (uidActivate && tokenActivate) {
      let isActivateSuccess = await activateUserAccount(
        uidActivate.toString(),
        tokenActivate.toString(),
        dispatch
      );
      setIsActivateEmailAccount(isActivateSuccess);
    }
  }

  return {
    isActivateEmailAccount,
    activateEmailAccount,
  };
};

export default useActivateUserAccount;
