import { useState } from "react";
import { Box, Button, IconButton} from "@primer/react";
import { ExplorerTab } from "../../explorer";
import GitContextSwitchDropdown from "../../sourceControl/components/GitContextSwitchDropdown";
import { SourceControlTab } from "../../sourceControl";
import { ArrowsClockwise, CaretDoubleLeft, GitBranch } from "phosphor-react";
import { ProfileTab } from "../../profile/components/ProfileTab";
import { SettingsTab } from "../../settings/components/SettingsTab";
import type { ItemInput } from "@primer/react/lib-esm/deprecated/ActionList/List";
import { ConnectRepoModal } from "../../settings/components/ConnectRepoModal";
import { CreateProjectRepoModal } from "../../explorer/components/CreateProjectRepoModal";
import { PublishWorkflowModal } from "../../workflows/components/PublishWorkflowModal";
import WorkflowTabs from "../../workflows/components/WorkflowTabs";
import WorkflowIcon from "../../workflows/assets/workflowIcon.svg";
import { WorkflowPreviewModal } from "../../workflows/components/WorkflowPreviewModal";
import Sidebar from "./Sidebar";
import { CommitChangesModal } from "../../sourceControl/components/Modals/CommitChangesModal";
import { SynchroniseChangesModal } from "../../sourceControl/components/Modals/SynchroniseChangesModal";

const selectRepo = [
  { text: "project-repo", status: "connected", id: 1 },
  { text: "background-change-repo", status: "connected", id: 2 },
  { text: "background-remover-repo", status: "connected", id: 3 },
  { text: "project-demo-repo", status: "not-connected", id: 4 },
  { text: "alias-ts-paths", status: "not-connected", id: 5 },
  { text: "backend", status: "connected", id: 6 },
  { text: "frontend", status: "not-connected", id: 7 },
];

const selectBranch = [
  { text: "dev-test", id: 1 },
  { text: "8801", id: 2 },
  { text: "after-hook-no-name", id: 3 },
  { text: "alias-blur", id: 4 },
  { text: "alias-ts-paths", id: 5 },
  { text: "async-problem-7011", id: 6 },
  { text: "audio-maybe", id: 7 },
];

export const MainDrawer = () => {
  const [activeTab, setActiveTab] = useState<string>("explorer");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<ItemInput | undefined>(
    selectRepo[0]
  );
  const [selectedBranch, setSelectedBranch] = useState<ItemInput | undefined>(
    selectBranch[0]
  );
  const [tabs, setTabs] = useState([]);
  const [activeTabName, setActiveTabName] = useState<string>("");

  const [isConnectRepoModalOpen, setIsConnectRepoModalOpen] =
    useState<boolean>(false);
  const [isCreateProjectRepoModalOpen, setIsCreateProjectRepoModalOpen] =
    useState<boolean>(false);
  const [isPublishWorkflowModalOpen, setIsPublishWorkflowModalOpen] =
    useState<boolean>(false);
  const [isWorkflowPreviewModalOpen, setIsWorkflowPreviewModalOpen] =
    useState<boolean>(false);
  const [isMergeConflictModalOpen, setIsMergeConflictModalOpen] =
    useState<boolean>(false);
  const [isSyncChangesModalOpen, setIsSyncChangesModalOpen] =
    useState<boolean>(false);

  function uniqId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // New workflow tab function
  function createNewTab(name: string) {
    const id = uniqId();
    return {
      id: `workflow-tab-${id}`,
      title: name,
      favicon: WorkflowIcon,
      active: true,
    };
  }

  // Add new tab
  const addWorkflowTab = (name: string) => {
    const existingTab = tabs.find((tab) => tab.title === name);
    if (existingTab) {
      setTabs(
        tabs.map((tab) => ({
          ...tab,
          active: tab.id === existingTab.id,
        }))
      );
      setActiveTabName(removeExtension(name));
    } else {
      const newTab = createNewTab(name);
      setTabs(tabs.map((tab) => ({ ...tab, active: false })).concat(newTab));
      setActiveTabName(removeExtension(name));
    }
  };

  const removeExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return fileName; // No extension found
    }
    return fileName.slice(0, lastDotIndex);
  };

  return (
    <>
      <Box
        className="flex"
        // sx={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   width: "100%",
        // }}
      >
        {/* Left main sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />

        {!isCollapsed && (
          <Box
            className="flex bg-[#16191D]"
            sx={{
              height: "100vh",
              // width: isCollapsed ? "0" : "25vw",
              width: isCollapsed ? "0" : "25%",
              transition: "width 0.3s ease",
              borderRight: "1px solid #343B45",
            }}
          >
            <Box
              className="h-full relative"
              sx={{
                flex: 1,
                overflowY: "auto",
              }}
            >
              {activeTab === "explorer" && (
                <Box
                  className="py-3 pl-2 pr-3 flex items-center justify-between gap-3"
                  sx={{ borderBottom: "1px solid #343B45" }}
                >
                  <GitContextSwitchDropdown
                    title="Select Repo"
                    items={selectRepo}
                    selected={selectedRepo}
                    onSelectedChange={setSelectedRepo}
                  />
                </Box>
              )}
              {/* Collapse Button */}
              {!isCollapsed && (
                <IconButton
                  className="absolute right-4 top-3"
                  aria-label={"Collapse"}
                  icon={CaretDoubleLeft}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  unsafeDisableTooltip={false}
                  variant="invisible"
                  sx={{
                    fontSize: "20px",
                  }}
                />
              )}

              {activeTab === "explorer" && (
                <ExplorerTab
                  onWorkFlowClick={addWorkflowTab}
                  previewButton={setIsWorkflowPreviewModalOpen}
                />
              )}
              {activeTab === "sourceControl" && (
                <SourceControlTab
                  openMergeModal={() => setIsMergeConflictModalOpen(true)}
                  openSyncModal={() => setIsSyncChangesModalOpen(true)}
                />
              )}
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "settings" && (
                <SettingsTab
                  repoName={selectedRepo}
                  openConnectRepoModal={() => setIsConnectRepoModalOpen(true)}
                />
              )}

              {/* Footer with branch and sync */}
              <Box
                className="absolute bottom-0 flex flex-col gap-4 w-full"
                sx={{ borderTop: "1px solid #343B45" }}
              >
                <Box className="p-1 flex items-center gap-4">
                  <Box className="flex pl-4 gap-1 items-center">
                    <GitBranch />
                    <p className="text-sm font-normal text-[#bcbcbe]">
                      Branch:
                    </p>
                    <GitContextSwitchDropdown
                      title="Switch Branch"
                      items={selectBranch}
                      selected={selectedBranch}
                      onSelectedChange={setSelectedBranch}
                      showDownArrow={false}
                      showMergeIcon={false}
                    />
                  </Box>
                  <div
                    className="h-8 w-1"
                    style={{ borderRight: "1px solid #343B45" }}
                  ></div>
                  <IconButton
                    aria-label={"Synchronise Changes"}
                    icon={ArrowsClockwise}
                    onClick={() => console.log("Add item clicked")}
                    unsafeDisableTooltip={false}
                    variant="invisible"
                    sx={{
                      fontSize: "16px",
                    }}
                  />
                  {/* <div className="flex rounded-3xl ml-auto bg-gradient-to-r from-[#1659da] to-purple-500 p-1">
                    <button
                      onClick={() => setIsDeployWorkflowModalOpen(true)}
                      className="flex gap-3 items-center bg-[#22262C] text-white justify-center font-semibold text-sm px-3 py-1 rounded-3xl"
                    >
                      Deploy <RocketLaunch size={16} weight="fill" />
                    </button>
                  </div> */}
                  {/* 
                  <div className="ml-auto">
                    <IconButton
                      aria-label={"Add New Repository"}
                      icon={Plus}
                      onClick={() => setIsCreateProjectRepoModalOpen(true)}
                      unsafeDisableTooltip={false}
                      // variant="outline"
                      sx={{
                        fontSize: "16px",
                      }}
                    />
                  </div> */}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {tabs.length > 0 && (
          <Box
            className="flex flex-col bg-[#16191D]"
            sx={{
              height: "100px",
              width: `${isCollapsed ? "100%" : "75%"}`,
              borderBottom: "1px solid #343B45",
            }}
          >
            <WorkflowTabs tabs={tabs} setTabs={setTabs} />
            <Box
              sx={{ borderTop: "1px solid #343B45" }}
              className="flex justify-end gap-2 p-3"
            >
              <Button
                onClick={() => setIsPublishWorkflowModalOpen(true)}
                sx={{
                  borderRadius: "24px",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  color: "#16191D",
                  "&:hover": {
                    color: "#C4C4CA",
                    border: "1px solid #343B45",
                  },
                }}
              >
                Publish
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <ConnectRepoModal
        isOpen={isConnectRepoModalOpen}
        isClosed={() => setIsConnectRepoModalOpen(false)}
        repoList={selectRepo}
      />

      <CreateProjectRepoModal
        isOpen={isCreateProjectRepoModalOpen}
        isClose={() => setIsCreateProjectRepoModalOpen(false)}
      />

      <PublishWorkflowModal
        isOpen={isPublishWorkflowModalOpen}
        isClose={() => setIsPublishWorkflowModalOpen(false)}
        items={selectBranch}
        activeTabName={activeTabName}
      />

      <WorkflowPreviewModal
        isOpen={isWorkflowPreviewModalOpen}
        isClose={() => setIsWorkflowPreviewModalOpen(false)}
      />

      <CommitChangesModal
        isOpen={isMergeConflictModalOpen}
        isClose={() => setIsMergeConflictModalOpen(false)}
        mergeConflict={false}
      />

      <SynchroniseChangesModal
        isOpen={isSyncChangesModalOpen}
        isClose={() => setIsSyncChangesModalOpen(false)}
      />
    </>
  );
};
