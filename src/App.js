import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";

function App() {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log("Connected to server");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received from server:", data);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const takeScreenshot = () => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "takeScreenshot" }));
    }
  };

  return (
    <div>
      <h1>Playwright Remote Control</h1>
      <button onClick={takeScreenshot}>Take Screenshot</button>
    </div>
  );
}

export default App;
