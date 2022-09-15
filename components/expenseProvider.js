import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseDataAction, sendExpenseAction } from "../components/store/expenseSlice";

let onFirstLoad = true;

const ExpenseProvider = ({children}) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const expensesChanged = useSelector((state) => state.expense.expensesChanged);

  useEffect(() => {
    dispatch(getExpenseDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (onFirstLoad) {
      onFirstLoad = false;
      return;
    }

    if (expensesChanged) {
      dispatch(sendExpenseAction(expenses));
    }
  }, [expensesChanged, expenses, dispatch]);

  return <>{children}</>
};

export default ExpenseProvider;