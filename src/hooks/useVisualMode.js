import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => {
        return [...prev.slice(0, prev.length - 1), newMode];
      });
      return;
    }
    setHistory([...history, newMode]);
  }
  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        return [...prev.slice(0, prev.length - 1)];
      });
    }
  }
  const mode = history.slice(-1)[0];
  return { mode, transition, back };
}
