import React from "react";
import DefaultModal from "../../../components/Elements/Modal/DefaultModal";
import { Box } from "@primer/react";

interface WorkflowPreviewModalProps {
  isOpen: boolean;
  isClose: () => void;
}

export const WorkflowPreviewModal: React.FC<WorkflowPreviewModalProps> = ({
  isOpen,
  isClose,
}) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onDismiss={isClose}
      dialogTitle="Workflow Preview"
      sx={{ width: "60%", height: "100vh" }}
      showButtons={false}
    >
      <Box className="flex justify-between font-medium text-[#F2F2F2] p-3">
        <Box className="w-full flex flex-col items-center justify-start">
          <p className="text-[18px]">Input</p>
        </Box>
        <div
          style={{ borderRight: "1px solid #636C76" }}
          className="w-px h-[500px] my-auto"
        />
        <Box className="w-full flex flex-col items-center justify-start">
          <p className="text-[18px]">Output</p>
        </Box>
      </Box>
    </DefaultModal>
  );
};
