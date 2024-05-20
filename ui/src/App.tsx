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
import { MainDrawer } from "@/features/misc"

type Route = "root" | "customNodes" | "recentFlows";

export default function App() {
  const [route, setRoute] = useState<Route>("root");

  return (
    <div
      style={{
        width: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <div
        className="tw-class"
        style={{
          padding: 2,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <div>
          <Button
            size="small"
            onClick={() => setRoute("recentFlows")}
            style={{ borderColor: 'white', color: 'black' }}
          >
            <div>
              <FileIcon size={16} />
              <TriangleDownIcon size={16} />
            </div>
          </Button>
          <Button
            size="small"
            style={{ borderColor: 'white', color: 'black' }}
          >
            <div style={{ paddingLeft: 2 }}>
              <PlusIcon size={16}  />
              <div  style={{ fontSize: 1 }}>
                New
              </div>
            </div>
          </Button>
          <TextInput
            variant="small"
            placeholder="Workflow name"
          />
        </div>
      </div>

      {route === "recentFlows" && (
        // <RecentFilesDrawer
        //   onclose={() => setRoute("root")}
        //   onClickNewFlow={() => {
        //     setRoute("root");
        //   }}
        // />
        <MainDrawer />
      )}
    </div>
  );
}