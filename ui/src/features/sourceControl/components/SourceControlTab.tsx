import React from "react";
import { Box, Button, FormControl, TextInput } from "@primer/react";
import GitChangesFolderList from "./GitChangesFolderList";
import GitChangesFolder from "./GitChangesFolder";
import GitCommittedChanges from "./GitCommittedChanges";
import Tabs from "../../../components/Elements/Tabs/Tabs";
import { MagnifyingGlass } from "phosphor-react";
import ChangeLogTab from "./ChangeLogTab";

export const SourceControlTab = ({ openMergeModal, openSyncModal }) => {
  const treeData = [
    {
      id: "fashion-agent-workflows",
      name: "fashion-agent-workflows",
      type: "directory",
      expanded: true,
      children: [
        {
          id: "fashion-agent-workflows/apparel-shoots",
          name: "apparel-shoots",
          type: "directory",
          children: [
            {
              id: "fashion-agent-workflows/apparel-shoots/segmentation-workflow.json",
              type: "workflow",
              name: "segmentation-workflow.json",
              status: "workflow",
            },
          ],
        },
      ],
    },
    {
      id: "3d-workflows",
      name: "3d-workflows",
      type: "directory",
      children: [
        {
          id: "3d-workflows/background-remover",
          name: "background-remover",
          type: "directory",
          children: [
            {
              id: "3d-workflows/background-remover/background-remover-workflow.json",
              type: "workflow",
              name: "background-remover-workflow.json",
              status: "workflow",
            },
          ],
        },
      ],
    },
  ];

  const dummyCommits: Commit[] = [
    {
      title: "Refactored background change workflow for improved efficiency",
      description: "commit 87f4b2c",
      timestamp: "14m",
    },
    {
      title: "Implemented new segmentation workflow for better accuracy",
      description: "commit 8faf23c",
      timestamp: "17m",
    },
    {
      title: "Fixed bug in background workflow",
      description: "commit 2r24bbc",
      timestamp: "23m",
    },
  ];

  const [searchValue, setSearchValue] = React.useState<string>("");

  const tabNames = ["Recent Changes", "Change Log"];

  return (
    <>
      <Box className="flex flex-col gap-4">
        <Tabs tabNames={tabNames} onTabChange={() => {}}>
          <Box className="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
            <Box className="flex flex-col gap-4 px-3">
              <GitChangesFolder title="Uncommitted Changes">
                <Box as="form">
                  <FormControl>
                    <FormControl.Label visuallyHidden>
                      Default label
                    </FormControl.Label>
                    <TextInput
                      sx={{
                        borderRadius: "6px",
                        width: "96%",
                        backgroundColor: "#16191D",
                      }}
                      block
                      leadingVisual={MagnifyingGlass}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search Changes"
                    />
                  </FormControl>
                </Box>
                <GitChangesFolderList treeData={treeData} />
              </GitChangesFolder>
              <Button
                block
                sx={{
                  borderRadius: "24px",
                  padding: "18px 0px",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  color: "#16191D",
                  "&:hover": {
                    color: "#fff",
                  },
                }}
                onClick={openMergeModal}
              >
                Commit Changes
              </Button>
            </Box>

            <Box className="flex flex-col gap-4 mt-5 px-3">
              <GitCommittedChanges
                title="Committed Changes"
                commits={dummyCommits}
              />
              <Button
                block
                onClick={openSyncModal}
                sx={{
                  borderRadius: "24px",
                  padding: "18px 0px",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  color: "#16191D",
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                Synchronise Changes
              </Button>
            </Box>
          </Box>
          <Box>
            <ChangeLogTab title="Commit History" commits={dummyCommits} />
          </Box>
        </Tabs>
      </Box>
    </>
  );
};
