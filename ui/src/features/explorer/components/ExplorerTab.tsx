import { Box } from "@primer/react";
import ExplorerTreeView from "./ExplorerTreeView";
import PageHeaderWithActions from "./PageHeaderWithActions";
import {
  ArrowClockwise,
  FilePlus,
  FolderPlus,
  MinusCircle,
} from "phosphor-react";
import { useState } from "react";

export const ExplorerTab = ({
  onWorkFlowClick = () => {},
  previewButton = () => {},
}) => {
  const initialTreeData = [
    {
      id: "workflow-1",
      name: "workflow-1",
      type: "directory",
      expanded: true,
      children: [
        {
          id: "v1/apparel-shoots",
          name: "apparel-shoots",
          type: "directory",
          children: [
            {
              id: "v1/apparel-shoots/segmentation-workflow.json",
              type: "workflow",
              name: "segmentation-workflow.json",
              status: "workflow",
              // component: (
              //   <WorkflowCard
              //     header={"Segmentation Workflow"}
              //     description={"/segment-image"}
              //     imageSrc={DemoImg}
              //   />
              // ),
            },
          ],
        },
      ],
    },
    {
      id: "workflow-2",
      name: "workflow-2",
      type: "directory",
      children: [
        {
          id: "workflow-2/background-remover-workflow.json",
          name: "background-remover-workflow.json",
          type: "workflow",
          status: "workflow",
        },
      ],
    },
    {
      id: "workflow-3",
      name: "workflow-3",
      type: "directory",
      children: [
        {
          id: "workflow-3/background-remover-workflow.json",
          name: "background-remover-workflow.json",
          type: "workflow",
          status: "workflow",
        },
      ],
    },
  ];
  const [treeData, setTreeData] = useState(initialTreeData);
  const [isTreeExpanded, setIsTreeExpanded] = useState<boolean>(false);

  return (
    <>
      <Box className="py-2">
        <PageHeaderWithActions
          actions={[
            {
              label: "New File",
              icon: FilePlus,
              onClick: () => console.log("Add item clicked"),
            },
            {
              label: "New Folder",
              icon: FolderPlus,
              onClick: () => console.log("Add item clicked"),
            },
            {
              label: "Refresh",
              icon: ArrowClockwise,
              onClick: () => console.log("Add item clicked"),
            },
            {
              label: "Collapse",
              icon: MinusCircle,
              onClick: () => setIsTreeExpanded(!isTreeExpanded),
            },
          ]}
        />
      </Box>

      <Box className="flex flex-col px-2 mt-2 overflow-y-auto max-h-[550px]">
        <ExplorerTreeView
          treeData={treeData}
          setTreeData={setTreeData}
          isTreeExpanded={isTreeExpanded}
          setIsTreeExpanded={setIsTreeExpanded}
          onWorkFlowClick={onWorkFlowClick}
          previewButton={previewButton}
        />
      </Box>
    </>
  );
};
