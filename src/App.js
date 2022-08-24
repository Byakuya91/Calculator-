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
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      // checking for edge cases with 0. Making sure if 0 is on screen, more zeros can't be added, unless the decimal is added.
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      // checking for edge cases with decimal points so no multiple decimal points are displayed.
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      //  showcasing the current state and the digits.
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    // actions: choosing an operation
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      // overwrite your operation
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      //  saves current operand to previous and shows smaller number appearing on the calculator on the top.
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      // default action when doing calculation with the calculator
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    //  action to clear the digits
    case ACTIONS.CLEAR:
      return {};
    // case for deleting digits
    case ACTIONS.DELETE_DIGIT:
      //  checking if the state is in overwrite
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      // checking if current operand is null
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    //  Using the equal button for calculations
    case ACTIONS.EVALUTE:
      // checking if we have all the values inside the calculator. If we do not, it just gives us the state
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      // if we have the proper pieces of state inside the calculator
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

// evaluation function for calculator computations
function evaluate({ currentOperand, previousOperand, operation }) {
  // convert the strings into numbers to do calculations
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // checking to see if prev and current operands do NOT exist.
  if (isNaN(prev) || isNaN(current)) return "";

  // by default computation will equal an empty string
  let computation = "";
  //  switch case to intiate the calculations
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  //  values for computation will be returned
  return computation.toString();
}

// integer formatter for calculation

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

// function to format the operand
function formatOperand(operand) {
  // checking if an operand exists
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  // UseReducer hook
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calc-grid">
      {/* Calculator display */}
      <div className="calc-output">
        <div className="calc-previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="calc-current-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
      {/* Calculator buttons */}
      <button
        className="calc-span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
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
      <button
        className="calc-span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUTE })}
      >
        {" "}
        ={" "}
      </button>
    </div>
  );
}

export default App;
