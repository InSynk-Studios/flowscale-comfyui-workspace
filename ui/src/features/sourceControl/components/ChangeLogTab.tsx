import React from "react";
import { ActionList, Box } from "@primer/react";

interface Commit {
  title: string;
  description: string;
  timestamp: string;
}

interface ChangeLogTabProps {
  commits: Commit[];
  title: string;
}

const ChangeLogTab: React.FC<ChangeLogTabProps> = ({ commits, title }) => {
  return (
    <Box className="flex flex-col px-2">
      <ActionList>
        <ActionList.Heading
          as="h4"
          sx={{ fontSize: "16px", fontWeight: "500", marginLeft: "8px" }}
        >
          {title}
        </ActionList.Heading>

        {commits.map((commit, index) => (
          <ActionList.Item
            key={index}
            sx={{
              fontSize: "14px",
              marginLeft: "0px",
              borderBottom: "1px solid #343B45",
            }}
          >
            {commit.title}
            <Box className="flex">
              <ActionList.Description
                sx={{ color: "#A5A5AD", marginLeft: "0px" }}
              >
                {commit.description}
              </ActionList.Description>
              <ActionList.TrailingVisual>
                {commit.timestamp}
              </ActionList.TrailingVisual>
            </Box>
          </ActionList.Item>
        ))}
      </ActionList>
    </Box>
  );
};

export default ChangeLogTab;
