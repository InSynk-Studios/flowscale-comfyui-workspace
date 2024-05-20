import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, theme } from "@primer/react";

import "./index.css";

const topbar = document.createElement("div");

// Apply styles to ensure it stays above other content
topbar.style.position = "absolute";
topbar.style.width = "100%";
topbar.style.top = "0";
topbar.style.left = "0";
topbar.style.zIndex = "10000000"; // Ensure it's above other elements

document.body.appendChild(topbar);

const App = React.lazy(() =>
  import("./App.tsx").then(({ default: App }) => ({
    default: App,
  }))
);

ReactDOM.createRoot(topbar).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} colorMode="night">
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
