import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ColorModeScript } from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const topbar = document.createElement("div");
document.body.append(topbar);
const App = React.lazy(() =>
  import("./App.tsx").then(({ default: App }) => ({
    default: App,
  })),
);

const config: ThemeConfig = {
  // initialColorMode: "light",
  // useSystemColorMode: false,
};
const theme = extendTheme({ config });

export default theme;
ReactDOM.createRoot(topbar).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
