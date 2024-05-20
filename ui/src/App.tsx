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
          width: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className="z-[10000000]"
      >
        <MainDrawer />
      </div>
    </>
  );
}
