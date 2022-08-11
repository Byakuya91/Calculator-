import React from "react";

function App() {
  return (
    <div className="calc-grid">
      {/* Calculator display */}
      <div className="calc-output">
        <div className="calc-previous-operand"></div>
        <div className="calc-current-operand"></div>
      </div>
      {/* Calculator buttons */}
      <button className="calc-span-two">AC</button>
      <button>DEL</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="calc-span-two"> = </button>
    </div>
  );
}

export default App;
