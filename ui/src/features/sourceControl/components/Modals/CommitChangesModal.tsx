import React from "react";
import Modal from "../../../../components/Elements/Modal/Modal";
import {
  Box,
  FormControl,
  Label,
  LabelGroup,
  RelativeTime,
  TextInput,
} from "@primer/react";
import { Warning } from "phosphor-react";
import MergeConflictTable from "../MergeConflictTable";

interface CommitChangesModalProps {
  isOpen: boolean;
  isClose: () => void;
  mergeConflict: boolean;
}

interface Repo {
  id: number;
  name: string;
  type: "public" | "internal";
  updatedAt: number;
  securityFeatures: {
    dependabot: Array<string>;
    codeScanning: Array<string>;
  };
}

const now = Date.now();
const Second = 1000;
const Minute = 60 * Second;
const Hour = 60 * Minute;
const Day = 24 * Hour;
const Week = 7 * Day;

const data: Array<Repo> = [
  {
    id: 1,
    name: "codeql-dca-worker",
    type: "internal",
    updatedAt: now,
    securityFeatures: {
      dependabot: ["alerts", "security updates"],
      codeScanning: ["report secrets"],
    },
  },
  {
    id: 2,
    name: "aegir",
    type: "public",
    updatedAt: now - 5 * Minute,
    securityFeatures: {
      dependabot: ["alerts"],
      codeScanning: ["report secrets"],
    },
  },
  {
    id: 3,
    name: "strapi",
    type: "public",
    updatedAt: now - 1 * Hour,
    securityFeatures: {
      dependabot: [],
      codeScanning: [],
    },
  },
  {
    id: 4,
    name: "codeql-ci-nightlies",
    type: "public",
    updatedAt: now - 6 * Hour,
    securityFeatures: {
      dependabot: ["alerts"],
      codeScanning: [],
    },
  },
  {
    id: 5,
    name: "dependabot-updates",
    type: "public",
    updatedAt: now - 1 * Day,
    securityFeatures: {
      dependabot: [],
      codeScanning: [],
    },
  },
  {
    id: 6,
    name: "tsx-create-react-app",
    type: "public",
    updatedAt: now - 1 * Week,
    securityFeatures: {
      dependabot: [],
      codeScanning: [],
    },
  },
];

const columns = [
  {
    header: "Parameter",
    field: "name",
    rowHeader: true,
  },
  {
    header: "Your Current Changes",
    field: "type",
    renderCell: (row) => <Label>{row.type.toUpperCase()}</Label>,
  },
  {
    header: "Accepted Changes",
    field: "updatedAt",
    renderCell: (row) => <RelativeTime date={new Date(row.updatedAt)} />,
  },
  {
    header: "Conflicting Older Changes",
    field: "securityFeatures.dependabot",
    renderCell: (row) =>
      row.securityFeatures.dependabot.length > 0 ? (
        <LabelGroup>
          {row.securityFeatures.dependabot.map((feature) => (
            <Label key={feature}>{feature.toUpperCase()}</Label>
          ))}
        </LabelGroup>
      ) : null,
  },
];

export const CommitChangesModal: React.FC<CommitChangesModalProps> = ({
  isOpen,
  isClose,
  mergeConflict = false,
}) => {
  function CustomHeader() {
    return (
      <Box
        sx={{ borderBottom: "1px solid #636C76" }}
        className="px-4 flex items-center justify-between"
      >
        <Box className="flex items-center gap-2">
          <Warning size={24} color="#FBBF24" />
          <h3 className="text-[18px] font-semibold">
            {mergeConflict ? "Merge Conflict" : "Commit Changes"}
          </h3>
        </Box>
      </Box>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={isClose}
      customHeader={CustomHeader}
      sx={mergeConflict ? { width: "70%", height: "100vh" } : {}}
      showButtons={true}
      buttonText={mergeConflict ? "Apply and Merge" : "Commit"}
    >
      <Box className="overflow-y-auto max-h-[500px]">
        {mergeConflict ? (
          <>
            <p className="text-[#C4C4CA] text-base font-normal leading-6">
              A merge conflict has occurred because both you and another user
              have made changes to the same node or parameter. Please review the
              conflicting changes below, decide which ones to keep, and click
              "Apply and Merge" to create a new commit with the resolved changes
              that will be automatically pushed to Flowscale Hub.
            </p>

            <MergeConflictTable
              title="KSampler Node"
              subtitle="2 conflicts"
              data={data}
              columns={columns}
            />
          </>
        ) : (
          <>
            <p className="text-[#C4C4CA] text-base font-normal leading-6">
              Please provide a brief description of the changes you've made.
              Remember that these changes will be saved locally. To make them
              visible on Flowscale Hub, you'll need to synchronise your updates.
            </p>
            <Box as="form" className="my-3">
              <FormControl>
                <FormControl.Label>Description*</FormControl.Label>
                <TextInput
                  sx={{
                    borderRadius: "6px",
                    width: "96%",
                    backgroundColor: "#16191D",
                  }}
                  block
                  placeholder="Add brief description here..."
                />
              </FormControl>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
