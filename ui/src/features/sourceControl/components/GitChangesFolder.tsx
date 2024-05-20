import React from "react";
import { ActionList, Box } from "@primer/react";

interface GitChangesFolderProps {
  title: string;
  children: React.ReactNode;
}

const GitChangesFolder: React.FC<GitChangesFolderProps> = ({
  title,
  children,
}) => {
  return (
    <Box className="mt-4">
      <ActionList>
        <ActionList.Heading
          as="h4"
          sx={{ fontSize: "14px", marginBottom: "-3px",marginLeft: "0px", }}
        >
          {title}
        </ActionList.Heading>
        <ActionList.Description sx={{marginLeft: "0px",}}>
          These are the changes that are not committed yet.
        </ActionList.Description>
        <div className="mt-2">{children}</div>
      </ActionList>
    </Box>
  );
};

export default GitChangesFolder;
