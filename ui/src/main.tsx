import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const topbar = document.createElement("div");
document.body.append(topbar);
const App = React.lazy(() =>
  import("./App.tsx").then(({ default: App }) => ({
    default: App,
  }))
);

ReactDOM.createRoot(topbar).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
