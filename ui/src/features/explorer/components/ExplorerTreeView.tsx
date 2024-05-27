import { IconButton, TreeView } from "@primer/react";
import { FileDirectoryFillIcon } from "@primer/octicons-react";
import WorkflowIcon from "../../workflows/assets/workflowIcon.svg";
import { Eye, File } from "phosphor-react";

type TreeItem = {
  id: string;
  name: string;
  type: "file" | "directory" | "workflow";
  status?: "added" | "modified" | "deleted" | "workflow";
  expanded?: boolean;
  children?: TreeItem[];
  component?: JSX.Element;
};

interface ExplorerTreeViewProps {
  treeData: TreeItem[];
  // setTreeData: React.Dispatch<React.SetStateAction<TreeItem[]>>;
  // isTreeExpanded: boolean;
  onWorkFlowClick: () => void;

}

const ExplorerTreeView: React.FC<ExplorerTreeViewProps> = ({
  treeData,
  // setTreeData,
  // isTreeExpanded,
  onWorkFlowClick = () => {},
  previewButton = () => {},
}) => {
  function setExpanded(
    treeData: TreeItem[],
    path: string[],
    expanded: boolean
  ): TreeItem[] {
    return treeData.map((item) => {
      if (item.name === path[0] && path.length === 1) {
        return {
          ...item,
          data: {
            ...item,
            expanded,
          },
        };
      } else if (item.name === path[0]) {
        return {
          ...item,
          children: setExpanded(item.children, path.slice(1), expanded),
        };
      } else {
        return item;
      }
    });
  }

  const renderTreeItem = (item: TreeItem): JSX.Element => {
    return (
      <TreeView.Item
        key={item.id}
        id={item.id}

        // expanded={isTreeExpanded}
        // defaultExpanded={isTreeExpanded}
        // current={item.expanded}
        // onExpandedChange={(path: string[], isTreeExpanded: boolean) =>
        //   // handleExpandedChange(item.id, isTreeExpanded)
        //   setTreeData((treeData) => setExpanded(treeData, path, isTreeExpanded))
        // }
      >
        <TreeView.LeadingVisual>
          {item.type === "directory" ? (
            <FileDirectoryFillIcon fill="white" />
          ) : item.type === "workflow" ? (
            <img src={WorkflowIcon} alt={"workflow"} />
          ) : (
            <File size={14} />
          )}
        </TreeView.LeadingVisual>
        <p
          className="text-[#D7D7DB] text-sm"
          onClick={() => {
            item.type === "workflow" && onWorkFlowClick(item.name);
          }}
        >
          {item.name}
        </p>
        {item.status && (
          <TreeView.TrailingVisual>
            <IconButton
              aria-label={"Preview"}
              icon={item.status === "workflow" ? Eye : ""}
              onClick={() => previewButton(true)}
              unsafeDisableTooltip={false}
              variant="invisible"
              sx={{
                fontSize: "14px",
              }}
            />
          </TreeView.TrailingVisual>
        )}
        {item.component && item.component}
        {item.children && (
          <TreeView.SubTree>
            {item.children.map((child) => renderTreeItem(child))}
          </TreeView.SubTree>
        )}
      </TreeView.Item>
    );
  };

  return (
    <TreeView aria-label="Files">
      {treeData.map((item) => renderTreeItem(item))}
    </TreeView>
  );
};

export default ExplorerTreeView;
