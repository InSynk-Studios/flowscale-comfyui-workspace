import React from "react";
import { ActionList, Box, FormControl, TextInput } from "@primer/react";
import { MagnifyingGlass } from "phosphor-react";

interface Commit {
  title: string;
  description: string;
  timestamp: string;
}

interface GitCommittedChangesProps {
  commits: Commit[];
  title: string;
}

const GitCommittedChanges: React.FC<GitCommittedChangesProps> = ({
  commits,
  title,
}) => {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <Box className="flex flex-col">
      <ActionList>
        <ActionList.Heading
          as="h4"
          sx={{ fontSize: "14px", marginLeft: "0px" }}
        >
          {title}
        </ActionList.Heading>
        <ActionList.Description sx={{ marginLeft: "0px" }}>
          These are the changes that are committed but not pushed to the main
          repository yet.
        </ActionList.Description>
        <Box as="form" className="my-3">
          <FormControl>
            <FormControl.Label visuallyHidden>Default label</FormControl.Label>
            <TextInput
              sx={{
                borderRadius: "6px",
                width: "96%",
                backgroundColor: "#16191D",
              }}
              block
              leadingVisual={MagnifyingGlass}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Changes"
            />
          </FormControl>
        </Box>
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

export default GitCommittedChanges;
