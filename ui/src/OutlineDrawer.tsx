import { Box, Button, Overlay, Text, useOverlay, useTheme } from '@primer/react'
import React, { useEffect, useState } from "react";
import { Workflow, deleteFlow, listWorkflows, workspace } from "./WorkspaceDB";

type Props = {
  onclose: () => void;
};

export default function RecentFilesDrawer({ onclose }: Props) {
  const [recentFlows, setRecentFlow] = useState<Workflow[]>([]);

  useEffect(() => {
    const all = listWorkflows();
    setRecentFlow(all);
  }, []);

  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
      
        <Overlay returnFocusRef={React.createRef()} onClickOutside={() => {}} onEscape={() => {}}>
          <Button sx={{ position: 'absolute', right: 2 }}>
            Close
          </Button>
          {/* Rest of your drawer content */}
        </Overlay>

      <Button>
        Open Drawer
      </Button>
    </Box>
  );
}

function formatTimestamp(unixTimestamp: number) {
  // Create a new Date object from the UNIX timestamp
  const date = new Date(unixTimestamp);

  // Get the day, month, year, hours, and minutes from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date and time string
  return `${month}-${day}-${year} ${hours}:${minutes}`;
}
