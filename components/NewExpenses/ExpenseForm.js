import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { expenseSliceActions, sendExpenseAction } from '../store/expenseSlice';
import styles from './ExpenseForm.module.scss';

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const dispatch = useDispatch();

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredTitle.length === 0 || enteredAmount.length === 0 || enteredDate.length === 0 ) {
      return alert('Invalid inputs!!!');
    }

    const expenseFormData = {
      subId: `${enteredTitle.slice(0, 4)}${new Date(enteredDate).getTime()}`,
      date: enteredDate,
      title: enteredTitle,
      amount: enteredAmount,
    };

    dispatch(expenseSliceActions.addExpense(expenseFormData));
    // props.onSubmitForm(expenseFormData);

    setEnteredTitle('');
    setEnteredAmount(''); 
    setEnteredDate('');
  }

  return (
    <form onSubmit={submitHandler}>
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
          Add expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;