import { SessionProvider } from "next-auth/react";
import ExpenseProvider from "../components/expenseProvider";
import { Provider } from "react-redux";
import store from "../components/store";

import "../styles/globals.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <ExpenseProvider>
            <Component {...pageProps} />
          </ExpenseProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
