import React, { useReducer } from "react";
import DigitButton from "./Components/DigitButton/DigitButton";
import OperationButton from "./Components/OperationButton/OperationButton";
import "./styles.css";

// GLOBAL VARIABLES (DEFINE ACTIONS THAT CAN BE TAKEN WITH A CALCULATOR)
export const ACTIONS = {
  CHOOSE_OPERATION: "choose-operation",
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUTE: "evalute",
};

// Reducer function for calculator
// action will be broken down into type and payload
function reducer(state, { type, payload }) {
  // switch case to organize each of the actions depicted above
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // checking for edge cases
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: payload.digit,
      };
  }
}

function App() {
  // TODOS (DONE)
  //  Investigate UseReducer and incorporate it into calculator design.
  //  Investigate other projects and how they utilize it.
  // implement your own solution into it
  //   Calculator functions:
  //  previous operand and current operand must do some calculation
  // or operands are modified before calculation
  // reducer Actions can boil down to these elements.

  // UseReducer hook
  const [{ currentOperand, previousOperand, Operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calc-grid">
      {/* Calculator display */}
      <div className="calc-output">
        <div className="calc-previous-operand">
          {previousOperand} {Operation}
        </div>
        <div className="calc-current-operand">{currentOperand}</div>
      </div>
      {/* Calculator buttons */}
      <button className="calc-span-two">AC</button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="calc-span-two"> = </button>
    </div>
  );
}

export default App;
