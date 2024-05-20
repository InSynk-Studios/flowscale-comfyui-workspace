import React from "react";
import { Box, IconButton } from "@primer/react";
import Logo from "../../../components/Elements/Logo/Logo";
import { CaretDoubleRight, Folder, GitBranch } from "phosphor-react";
import { GearIcon } from "@primer/octicons-react";
import { UserCircleIcon } from "@heroicons/react/outline";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsCollapsed: (collapsed: boolean) => void;
  isCollapsed: boolean;
}

type SidebarItemProps = {
  icon: JSX.Element;
  onClick: () => void;
  isActive: boolean;
};

const SidebarItem = ({ icon, onClick, isActive }: SidebarItemProps) => (
  <div
    style={isActive ? { borderLeft: "2.5px solid white" } : {}}
    className="flex justify-center h-8 items-center"
  >
    <div onClick={onClick} className="flex justify-center cursor-pointer">
      {icon}
    </div>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  setIsCollapsed,
  isCollapsed,
}) => {
  return (
    <Box
      className="flex flex-col gap-4 bg-[#16191D]"
      sx={{ borderRight: "1px solid #343B45", height: "100vh" }}
    >
      <div className="flex justify-center mt-3">
        <Logo />
      </div>
      {/* Collapse Button */}
      {isCollapsed && (
        <IconButton
          className="mx-auto"
          aria-label={"Collapse"}
          icon={CaretDoubleRight}
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="invisible"
          sx={{
            fontSize: "20px",
          }}
        />
      )}
      <Box className="flex flex-col justify-between h-full pb-3 pt-1">
        <Box className="flex flex-col gap-5" sx={{ width: "50px" }}>
          <SidebarItem
            icon={
              activeTab === "explorer" ? (
                <Folder weight="fill" size={24} />
              ) : (
                <Folder size={24} />
              )
            }
            onClick={() => setActiveTab("explorer")}
            isActive={activeTab === "explorer"}
          />
          <SidebarItem
            icon={
              activeTab === "sourceControl" ? (
                <GitBranch size={26} weight="fill" />
              ) : (
                <GitBranch size={24} />
              )
            }
            onClick={() => setActiveTab("sourceControl")}
            isActive={activeTab === "sourceControl"}
          />
        </Box>
        <Box className="flex flex-col gap-5" sx={{ width: "50px" }}>
          <SidebarItem
            icon={<GearIcon size={24} />}
            onClick={() => setActiveTab("settings")}
            isActive={activeTab === "settings"}
          />
          <SidebarItem
            icon={<UserCircleIcon className="size-6" />}
            onClick={() => setActiveTab("profile")}
            isActive={activeTab === "profile"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
