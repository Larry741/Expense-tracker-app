import Head from "next/head";
import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpenses/NewExpense";

import styles from "../styles/home.module.scss";
import Navbar from "../components/Navbar/Navbar";

function Index() {
  return (
    <div className={styles.app}>
      <Head>
        <title>Keep track of your expenses</title>
        <meta name="description" content="A portfolio web app built by kosi" />
        <link rel="icon" href="/logo-black.png" />
      </Head>
      <Navbar />
      <NewExpense />
      <Expenses />
    </div>
  );
}

export default Index;
