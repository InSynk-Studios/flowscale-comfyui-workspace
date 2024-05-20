import { IconButton, TreeView } from "@primer/react";
import { FileDirectoryFillIcon } from "@primer/octicons-react";
import WorkflowIcon from "../../workflows/assets/workflowIcon.svg";
import { Eye, File } from "phosphor-react";

type TreeItem = {
  id: string;
  name: string;
  type: "file" | "directory" | "card" | "workflow";
  status?: "added" | "modified" | "deleted" | "workflow";
  children?: TreeItem[];
  component?: JSX.Element;
};

interface ExplorerTreeViewProps {
  treeData: TreeItem[];
}

const GitChangesFolderList: React.FC<ExplorerTreeViewProps> = ({
  treeData,
}) => {
  const renderTreeItem = (item: TreeItem): JSX.Element => {
    return (
      <TreeView.Item key={item.id} id={item.id}>
        <TreeView.LeadingVisual>
          {item.type === "directory" ? (
            <FileDirectoryFillIcon fill="white" />
          ) : item.type === "workflow" ? (
            <img src={WorkflowIcon} alt={"workflow"} />
          ) : (
            <File size={14} />
          )}
        </TreeView.LeadingVisual>
        <p className="text-[#D7D7DB] text-sm">{item.name}</p>
        {item.status && (
          <TreeView.TrailingVisual>
            <IconButton
              aria-label={"Preview"}
              icon={item.status === "workflow" ? Eye : ""}
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
    <div>
      <TreeView aria-label="Files changed">
        {treeData.map((item) => renderTreeItem(item))}
      </TreeView>
    </div>
  );
};

export default GitChangesFolderList;
