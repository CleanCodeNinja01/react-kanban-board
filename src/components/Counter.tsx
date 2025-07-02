import { useEffect, useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);
  const increment = () => {
    // prone to stale closure --> a feature of JS that a function gets value from its surroundings
    // uses the value of counter from its closure
    // setInterval(() => {
    //     setCounter(counter + 1)
    // }, 1000);
    // functional update in useState setter it always uses the latest state value when updating the state
    // this avoids stale closures and ensures that the state is updated correctly
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
      console.log("---- counter", counter);
    }, 1000);
    return timer
  };
  const decrement = () => {
    //     setInterval(()=>{
    //         setCounter((prevCounter) => prevCounter - 1);
    //     }, 1000)
  };
  const reset = () => setCounter(0);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      increment();
    } else if (e.key === "ArrowDown") {
      decrement();
    } else if (e.key === "Escape") {
      reset();
    }
  };

  useEffect(() => {
    // This effect runs once when the component mounts
    // You can use it to set up any initial state or side effects
    console.log("Counter component mounted");
    const timer = increment(); // Start the counter when the component mounts

    // Cleanup function to run when the component unmounts
    return () => {
      clearInterval(timer); // Clear the interval to prevent memory leaks
      console.log("Counter component unmounted");
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        marginTop: 50,
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1>Counter: {counter}</h1>
      <button onClick={increment} style={{ marginRight: 10 }}>
        Increment
      </button>
      <button onClick={decrement} style={{ marginRight: 10 }}>
        Decrement
      </button>
      <button onClick={reset} style={{ marginRight: 10 }}>
        Reset
      </button>
      <p>
        Use Arrow Up to increment, Arrow Down to decrement, and Escape to reset.
      </p>
    </div>
  );
}
