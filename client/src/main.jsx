import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

//StrictMode estava dando problema de ref
ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);