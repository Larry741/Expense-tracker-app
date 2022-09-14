import ExpenseItem from "./ExpenseItem";

import styles from "./expensesList.module.scss";

const ExpenseList = (props) => {
  const filteredArrayExpense =
    props.expenseList.length === 0 ? (
      <h2 className={styles["expenses-list__fallback"]}>No expense found</h2>
    ) : (
      props.expenseList.map((expense) => (
        <ExpenseItem
          key={expense.subId}
          date={expense.date}
          title={expense.title}
          amount={expense.amount}
        />
      ))
    );

  return <ul className={styles["expenses-list"]}>{filteredArrayExpense}</ul>;
};

export default ExpenseList;
