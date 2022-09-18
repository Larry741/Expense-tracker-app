import { SessionProvider } from "next-auth/react";
import ExpenseProvider from "../components/expenseProvider";
import { Provider } from "react-redux";
import store from "../components/store";
import { WidthContextProvider } from "../context/width-context";

import "../styles/globals.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <WidthContextProvider>
          <ExpenseProvider>
            <Component {...pageProps} />
          </ExpenseProvider>
        </WidthContextProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
