import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  expensesChanged: false,
  expensesUpdated: false,
  expenseUpdateStatus: {message: null, status: null}
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
    updateSendingExpenseAction(state, action) {
      state.expenseUpdateStatus = {
        message: action.payload.message,
        status: action.payload
      }
    }
  },
});

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