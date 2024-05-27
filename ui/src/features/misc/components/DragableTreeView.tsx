import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IconButton, TreeView } from "@primer/react";
import { FileDirectoryFillIcon } from "@primer/octicons-react";
import { Eye, File } from "phosphor-react";
import WorkflowIcon from "../../workflows/assets/workflowIcon.svg";

interface Node {
  id: string;
  name: string;
  type: "file" | "directory" | "workflow";
  status?: "added" | "modified" | "deleted" | "workflow";
  expanded?: boolean;
  children?: Node[];
  component?: JSX.Element;
}

interface DraggableNodeProps {
  node: Node;
  onMoveNode: (draggedId: string, targetId: string) => void;
}

const ItemType = {
  NODE: "node",
};

const DraggableNode: React.FC<DraggableNodeProps> = ({
  node,
  onMoveNode,
  onWorkFlowClick,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType.NODE,
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType.NODE,
    drop: (draggedItem: { id: string }) => {
      if (draggedItem.id !== node.id && node.type !== "workflow") {
        onMoveNode(draggedItem.id, node.id);
      }
    },
  });

  return (
    <div
      ref={(ref) => dragRef(dropRef(ref))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => {
        node.type === "workflow" && onWorkFlowClick(node.name);
      }}
    >
      {node.name}
    </div>
  );
};

interface NewTreeViewProps {
  data: Node[];
  previewButton?: (preview: boolean) => void;
  onMoveNode: (draggedId: string, targetId: string) => void;
}

const NewTreeView: React.FC<NewTreeViewProps> = ({
  data,
  onMoveNode,
  previewButton = () => {},
  onWorkFlowClick = () => {},
}) => {
  const renderTree = (nodes: Node[]) =>
    nodes.map((node) => (
      <TreeView.Item key={node.id} id={node.id}>
        <TreeView.LeadingVisual>
          {node.type === "directory" ? (
            <FileDirectoryFillIcon fill="white" />
          ) : node.type === "workflow" ? (
            <img src={WorkflowIcon} alt={"workflow"} />
          ) : (
            <File size={14} />
          )}
        </TreeView.LeadingVisual>
        <DraggableNode
          node={node}
          onWorkFlowClick={onWorkFlowClick}
          onMoveNode={onMoveNode}
        />
        {node.children && node.type !== "workflow" && (
          <TreeView.SubTree>{renderTree(node.children)}</TreeView.SubTree>
        )}
        {node.status && (
          <TreeView.TrailingVisual>
            <IconButton
              aria-label={"Preview"}
              icon={node.status === "workflow" ? Eye : ""}
              onClick={() => previewButton(true)}
              unsafeDisableTooltip={false}
              variant="invisible"
              sx={{
                fontSize: "14px",
              }}
            />
          </TreeView.TrailingVisual>
        )}
      </TreeView.Item>
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      <TreeView>{renderTree(data)}</TreeView>
    </DndProvider>
  );
};

export default NewTreeView;
