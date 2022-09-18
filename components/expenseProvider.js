import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseDataAction, sendExpenseAction } from "../components/store/expenseSlice";

let onFirstLoad = true;

const ExpenseProvider = ({children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenseDataAction());
  }, [dispatch]);


  return <>{children}</>
};

export default ExpenseProvider;