import { TreeView, Octicon } from "@primer/react";
import {
  DiffAddedIcon,
  DiffModifiedIcon,
  FileIcon,
} from "@primer/octicons-react";

type Props = {
  onclose: () => void;
  onClickNewFlow: () => void;
};
export default function RecentFilesDrawer({ onclose }: Props) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
      <nav aria-label="Files changed">
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
      </nav>
    </div>
  );
}
