import ExpenseList from "./expensesList";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import { useState, useEffect } from "react";
import Chart from "../Chart/Chart";
import { useSession } from "next-auth/react";

import styles from "./Expenses.module.scss";
import { useSelector } from "react-redux";
import { LoaderLarge } from "../UI/Loader";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState(
    `${new Date().getFullYear()}`
  );
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true)
  const expensesUpdated = useSelector((state) => state.expense.expensesUpdated);
  const expense = useSelector((state) => state.expense.expenses);

  useEffect(() => {
    setIsLoading(false);
  }, [expensesUpdated]);

  if (!session) {
    return (
      <Card className={styles["expenses"]}>
        <h2 className={`${styles["expenses-list__fallback"]} primaryText-bold`}>
          Log in to view your expenses
        </h2>
      </Card>
    );
  }

  if (!expensesUpdated) {
    return (
      <Card className={styles["expenses"]}>
        <LoaderLarge />
      </Card>
    );
  }

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredArray = expense.filter(
    (el) => new Date(el.date).getFullYear().toString() === filteredYear
  );

  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  // const onSubmitUpdate = (enteredDate) => {
  //   setFilteredYear(enteredDate);
  // }
  for (const expense of filteredArray) {
    const expenseMonth = new Date(expense.date).getMonth();
    chartDataPoints[expenseMonth].value += expense.amount;
  }

  return (
    <Card className={styles["expenses"]}>
      <ExpenseFilter
        selectedYear={filteredYear}
        onYearChange={filterChangeHandler}
      />
      <Chart expenseList={chartDataPoints} />
      <ExpenseList expenseList={filteredArray} />
    </Card>
  );
};

export default Expenses;
