import React from "react";
import ReactDOM from "react-dom/client";
import "./styling/index.scss";
import App from "./components/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
