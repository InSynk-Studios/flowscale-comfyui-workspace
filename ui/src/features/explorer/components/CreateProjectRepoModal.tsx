import React from "react";
import Modal from "../../../components/Elements/Modal/Modal";
import { Box, FormControl, TextInput, Textarea } from "@primer/react";

interface CreateProjectRepoModalProps {
  isOpen: boolean;
  isClose: () => void;
}

export const CreateProjectRepoModal: React.FC<CreateProjectRepoModalProps> = ({
  isOpen,
  isClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onDismiss={isClose}
      dialogTitle="Create Project Repository"
    >
      <Box className="flex flex-col gap-4">
        <Box p={1} className="text-sm italic leading-[22px]">
          A new repository will be created on Flowscale Hub as well as on your
          local machine.
        </Box>
        <Box as="form" className="flex flex-col gap-4">
          <FormControl>
            <FormControl.Label>Repository Name*</FormControl.Label>
            <TextInput
              sx={{ borderRadius: "6px", width: "97%" }}
              block
              placeholder="Repository Name"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Repository Description</FormControl.Label>
            <Textarea
              sx={{ borderRadius: "6px", width: "97%" }}
              block
              placeholder="Repository Description"
              resize="none"
              rows={2}
            />
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
};
