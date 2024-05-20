import { Box, Button, Token } from "@primer/react";
import { GitMerge } from "phosphor-react";

interface SettingsTabProps {
  repoName: { text: string; status: "connected" | "not-connected"; id: number };
  openConnectRepoModal: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  repoName,
  openConnectRepoModal,
}) => {
  return (
    <>
      <Box className="px-4 pt-4 flex flex-col gap-5">
        <div className="text-base">Settings</div>
        <Box className="flex flex-col gap-2">
          <div className="text-sm">
            Connect your repository with Flowscale Hub
          </div>
          <span className="text-[#C4C4CA] text-xs leading-4">
            Connect with FlowScale Hub in order to work and collaborate with
            different team members on the same repository.
          </span>
        </Box>
        <Box className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <GitMerge size={20} /> {repoName.text}
          </div>
          <Token
            sx={{ borderRadius: "6px", padding: "6px", color: "white" }}
            text={
              repoName.status === "connected" ? "Connected" : "Not connected"
            }
            leadingVisual={GitMerge}
          />
        </Box>
        <Button
          onClick={() =>
            repoName.status === "not-connected" && openConnectRepoModal()
          }
          sx={{ borderRadius: "24px", padding: "18px" }}
        >
          {repoName.status === "connected" ? "Disconnect" : "Connect"}
        </Button>
      </Box>
    </>
  );
};
