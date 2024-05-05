import { TreeView, Octicon } from "@primer/react";
import {
  DiffAddedIcon,
  DiffModifiedIcon,
  FileIcon,
} from "@primer/octicons-react";

const ExplorerTreeView = () => {
  return (
    <div>
      <TreeView aria-label="Files changed">
        <TreeView.Item id="src" defaultExpanded>
          <TreeView.LeadingVisual>
            <TreeView.DirectoryIcon />
          </TreeView.LeadingVisual>
          src
          <TreeView.SubTree>
            <TreeView.Item id="src/Avatar.tsx">
              <TreeView.LeadingVisual>
                <FileIcon />
              </TreeView.LeadingVisual>
              Avatar.tsx
              <TreeView.TrailingVisual>
                <Octicon
                  icon={DiffAddedIcon}
                  color="success.fg"
                  aria-label="Added"
                />
              </TreeView.TrailingVisual>
            </TreeView.Item>
            <TreeView.Item id="src/Button.tsx" current>
              <TreeView.LeadingVisual>
                <FileIcon />
              </TreeView.LeadingVisual>
              Button.tsx
              <TreeView.TrailingVisual>
                <Octicon
                  icon={DiffModifiedIcon}
                  color="attention.fg"
                  aria-label="Modified"
                />
              </TreeView.TrailingVisual>
            </TreeView.Item>
          </TreeView.SubTree>
        </TreeView.Item>
        <TreeView.Item id="package.json">
          <TreeView.LeadingVisual>
            <FileIcon />
          </TreeView.LeadingVisual>
          package.json
          <TreeView.TrailingVisual>
            <Octicon
              icon={DiffModifiedIcon}
              color="attention.fg"
              aria-label="Modified"
            />
          </TreeView.TrailingVisual>
        </TreeView.Item>
      </TreeView>
    </div>
  );
};

export default ExplorerTreeView;
