import { useState } from "react";

const useInput = (validationFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const inputIsValid = validationFn(enteredValue);
  const inputIsInvalid = !inputIsValid && inputIsTouched; 

  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const reset = () => {
    setEnteredValue('');
    setInputIsTouched(false);
  }

  return {
    enteredValue,
    inputIsValid,
    inputIsInvalid,
    inputBlurHandler,
    valueChangeHandler,
    reset
  };
}

export default useInput;