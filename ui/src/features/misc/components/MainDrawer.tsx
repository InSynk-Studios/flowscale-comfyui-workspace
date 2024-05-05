import { useState } from "react";
import { Box, Button, ThemeProvider, theme } from "@primer/react";
import {
  FileIcon,
  SearchIcon,
  SquareIcon,
  PlugIcon,
  GearIcon,
} from "@primer/octicons-react";
import { ExplorerTab } from "@/features/explorer";

type SidebarItemProps = {
  icon: JSX.Element;
  onClick: () => void;
};

const SidebarItem = ({ icon, onClick }: SidebarItemProps) => (
  <Button
    onClick={onClick}
    size="small"
    sx={{ width: "100%", justifyContent: "center" }}
  >
    {icon}
  </Button>
);

export const MainDrawer = () => {
  const [activeTab, setActiveTab] = useState<string>("explorer");

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="z-10"
        sx={{
          display: "flex",
          height: "100vh",
          width: "30vw",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            width: "50px",
          }}
        >
          <SidebarItem
            icon={<FileIcon size={24} />}
            onClick={() => setActiveTab("explorer")}
          />
          <SidebarItem
            icon={<SearchIcon size={24} />}
            onClick={() => setActiveTab("search")}
          />
          <SidebarItem
            icon={<SquareIcon size={24} />}
            onClick={() => setActiveTab("sourceControl")}
          />
          <SidebarItem
            icon={<PlugIcon size={24} />}
            onClick={() => setActiveTab("extensions")}
          />
          <SidebarItem
            icon={<GearIcon size={24} />}
            onClick={() => setActiveTab("settings")}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {activeTab === "explorer" && <ExplorerTab />}
          {activeTab === "search" && <div>Search Content</div>}
          {activeTab === "sourceControl" && <div>Source Control Content</div>}
          {activeTab === "extensions" && <div>Extensions Content</div>}
          {activeTab === "settings" && <div>Settings Content</div>}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
