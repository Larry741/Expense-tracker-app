import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpenses/NewExpense";

import styles from "../styles/home.module.scss";
import Navbar from "../components/Navbar/Navbar";

function Index() {
  return (
    <div className={styles.app}>
      <Navbar />
      <NewExpense />
      <Expenses />
    </div>
  );
}

export default Index;
