import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from "next-auth/react";
import { expenseSliceActions } from '../store/expenseSlice';
import styles from './ExpenseForm.module.scss';
import Notification from '../notification/notification';
import { Loader } from '../UI/Loader';

let notificationTimeout;

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [showNotification, setShowNotification] = useState({
    message: null,
    successState: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!session) {
      setShowNotification({
        message: "You must be logged in to perform operation",
        successState: "error",
      });

      clearTimeout(notificationTimeout);
      notificationTimeout = setTimeout(() => {
        setShowNotification({
          message: null,
          successState: null,
        });
      }, 6000);
      return;
    }

    if (enteredTitle.length === 0 || enteredAmount.length === 0 || enteredDate.length === 0 ) {
      setShowNotification({
        message: "Invalid inputs",
        successState: "error",
      });

      clearTimeout(notificationTimeout);
      notificationTimeout = setTimeout(() => {
        setShowNotification({
          message: null,
          successState: null,
        });
      }, 6000);
      return;
    }
    setIsLoading(true);

    const expenseFormData = {
      subId: `${enteredTitle.slice(0, 4)}${new Date(enteredDate).getTime()}`,
      date: enteredDate,
      title: enteredTitle,
      amount: enteredAmount,
    };

    const sendExpenseData = async (data) => {
      const response = await fetch("/api/expense", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.error);
      }

      return res;
    };

    try {
      await sendExpenseData(expenseFormData);
      dispatch(expenseSliceActions.addExpense(expenseFormData));

      setShowNotification({
        message: "Expense added",
        successState: "success",
      });

      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
    } catch (error) {
      setShowNotification({
        message: "Your expense could not be added. Please try again",
        successState: "error",
      });
    }

    setIsLoading(false);
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      setShowNotification({
        message: null,
        successState: null,
      });
    }, 6000);
  }

  const closeNotification = () => {
    clearTimeout(notificationTimeout);
    setShowNotification({
      message: null,
      successState: null,
    });
  };


  return (
    <form onSubmit={submitHandler}>
      {showNotification.message && (
        <Notification
          closeNotification={closeNotification}
          successState={showNotification.successState}
        >
          <span>{showNotification.message}</span>
        </Notification>
      )}
      <div className={`${styles["new-expense__controls"]} mediumTertiaryText`}>
        <div className={styles["new-expense__control"]}>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={styles["new-expense__control"]}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className={styles["new-expense__control"]}>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className={styles["new-expense__actions"]}>
        <button className="small-text" type="submit">
          {isLoading ? <Loader /> : null}
          Add expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;