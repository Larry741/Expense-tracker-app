import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  expensesChanged: false,
  expensesUpdated: false
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    replaceExpenses(state, action) {
      state.expenses = [...action.payload, ...state.expenses];
      state.expensesUpdated = true;
    },
    addExpense(state, action) {
      state.expenses = [action.payload, ...state.expenses];
      state.expensesChanged = true;
    },
    removeExpense(state, action) {
      
    },
    clearExpense(state, action) {
      
    },
  },
});

export const sendExpenseAction = (expenseData) => {
  return async (dispatch) => {
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

      console.log(res.message);
    };

    try {
      await sendExpenseData(expenseData);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getExpenseDataAction = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      const response = await fetch("/api/expense", {
        method: "GET",
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
      const data = await fetchCartData();

      dispatch(expenseSlice.actions.replaceExpenses(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const expenseSliceActions = expenseSlice.actions;

export default expenseSlice;