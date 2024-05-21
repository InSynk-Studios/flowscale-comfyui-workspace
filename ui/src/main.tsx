import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, theme } from "@primer/react";

import "./index.css";

const topbar = document.createElement("div.topbar");
document.body.append(topbar);
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
