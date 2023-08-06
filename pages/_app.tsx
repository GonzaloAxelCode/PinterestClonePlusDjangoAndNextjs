import "../styles/globals.scss";
import "gestalt/dist/gestalt.css";
import "gestalt-datepicker/dist/gestalt-datepicker.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});
import Notification from "../src/ui/components/notification";
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout): ReactNode {
  
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);


  return (
    <SessionProvider session={session}>
      <Provider store={store}>
     
        {getLayout(<Component {...pageProps} />)}
        <Notification />
      </Provider>
    </SessionProvider>
  );
}
