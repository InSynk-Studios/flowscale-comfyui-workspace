import { useState } from "react";
import { MainDrawer } from "./features/misc";
import "./fonts.css";
type Route = "root" | "customNodes" | "recentFlows";

export default function App() {
  const [route, setRoute] = useState<Route>("root");

  return (
    <>
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1000000000,
        }}
      >
        <MainDrawer />
      </div>
    </>
  );
}
