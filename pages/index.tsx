import useUser from "apps/UserAccount/hooks/useUser";
import { motion, useMotionValue, useTransform } from "framer-motion";

import React, { ReactElement } from "react";
import { LayoutHome } from "ui/components/layouts";
import IndexScreen from "ui/screens/home/index-screen";
import SgnupLoginScreen from "ui/screens/home/sgnup-login-screen";

const Home = () => {
  

  return (
    <div>
      <IndexScreen />
      <SgnupLoginScreen />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  

  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
