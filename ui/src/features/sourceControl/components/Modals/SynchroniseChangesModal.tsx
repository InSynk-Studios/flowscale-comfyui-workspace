import React from "react";
import Modal from "../../../../components/Elements/Modal/Modal";
import { Box } from "@primer/react";
import { Warning } from "phosphor-react";

interface SynchroniseChangesModalProps {
  isOpen: boolean;
  isClose: () => void;
}

export const SynchroniseChangesModal: React.FC<
  SynchroniseChangesModalProps
> = ({ isOpen, isClose }) => {
  function CustomHeader() {
    return (
      <Box
        sx={{ borderBottom: "1px solid #636C76" }}
        className="px-4 flex items-center justify-between"
      >
        <Box className="flex items-center gap-2">
          <Warning size={24} color="#FBBF24" />
          <h3 className="text-[18px] font-semibold">Synchronise Changes</h3>
        </Box>
      </Box>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={isClose}
      customHeader={CustomHeader}
      sx={{}}
      showButtons={true}
      buttonText={"Synchronise"}
    >
      <p className="text-[#C4C4CA] italic text-base font-normal leading-6">
        Keep in mind that these changes will synchronize on FlowScale Hub and
        become visible to everyone on your team. It will both pull and push the
        updates on Flowscale Hub.
      </p>
    </Modal>
  );
};
