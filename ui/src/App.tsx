// import { useState } from "react";
// import { MainDrawer } from "./features/misc";
// import "./fonts.css";
// type Route = "root" | "customNodes" | "recentFlows";

// export default function App() {
//   const [route, setRoute] = useState<Route>("root");

//   return (
//     <>
//       <div
//         style={{
//           width: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//           zIndex: 1000000000,
//         }}
//       >
//         <MainDrawer />
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { Button, TextInput } from "@primer/react";
import { TriangleDownIcon, PlusIcon, FileIcon } from "@primer/octicons-react";
import { MainDrawer } from "@/features/misc";

type Route = "root" | "customNodes" | "recentFlows";

export default function App() {
  const [route, setRoute] = useState<Route>("root");

  return (
    <div
      style={{
        // width: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <div
        className="tw-class"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
        }}
      >
        <MainDrawer />
      </div>
    </div>
  );
}
