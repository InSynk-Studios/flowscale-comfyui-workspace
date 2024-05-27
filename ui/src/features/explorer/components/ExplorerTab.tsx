import { Box } from "@primer/react";
import PageHeaderWithActions from "./PageHeaderWithActions";
import {
  ArrowClockwise,
  FilePlus,
  FolderPlus,
  MinusCircle,
} from "phosphor-react";
import { useState } from "react";
import NewTreeView from "../../../features/misc/components/DragableTreeView";

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

  const findNodeById = (nodes, id) => {
    for (let node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const result = findNodeById(node.children, id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const removeNodeById = (nodes, id) => {
    return nodes.filter((node) => {
      if (node.id === id) {
        return false;
      }
      if (node.children) {
        node.children = removeNodeById(node.children, id);
      }
      return true;
    });
  };

  const insertNode = (nodes, targetId, nodeToInsert) => {
    return nodes.map((node) => {
      if (node.id === targetId) {
        if (node.type === "workflow") {
          return node; // Skip inserting children into files
        }
        return {
          ...node,
          children: node.children
            ? [...node.children, nodeToInsert]
            : [nodeToInsert],
        };
      }
      if (node.children) {
        node.children = insertNode(node.children, targetId, nodeToInsert);
      }
      return node;
    });
  };

  const handleMoveNode = (draggedId, targetId) => {
    const targetNode = findNodeById(treeData, targetId);
    if (targetNode?.type === "file") {
      console.warn("Cannot move a node into a file");
      return;
    }

    const nodeToRemove = findNodeById(treeData, draggedId);
    if (!nodeToRemove) return;

    let newTreeData = removeNodeById(treeData, draggedId);
    newTreeData = insertNode(newTreeData, targetId, nodeToRemove);

    setTreeData(newTreeData);
  };

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
        <NewTreeView
          data={treeData}
          onMoveNode={handleMoveNode}
          previewButton={previewButton}
          onWorkFlowClick={onWorkFlowClick}
        />
      </Box>
    </>
  );
};
