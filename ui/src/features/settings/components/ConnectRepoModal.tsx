import React, { useState } from "react";
import { BookBookmark, MagnifyingGlass } from "phosphor-react";
import Modal from "../../../components/Elements/Modal/Modal";
import { Box, Button, FormControl, TextInput, Token } from "@primer/react";

interface ConnectRepoModalProps {
  repoList: [];
  isOpen: boolean;
  isClose: () => void;
}

export const ConnectRepoModal: React.FC<ConnectRepoModalProps> = ({
  repoList,
  isOpen,
  isClose,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [connectedRepos, setConnectedRepos] = useState<Record<string, boolean>>(
    {}
  );

  const filteredRepoList = repoList.filter((repo) =>
    repo.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleConnect = (repoId: string) => {
    setConnectedRepos((prevState) => ({
      ...Object.fromEntries(
        Object.entries(prevState).map(([id, _]) => [id, false])
      ),
      [repoId]: true,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={isClose}
      dialogTitle="Connect FlowScale Hub"
      
    >
      <Box className="flex flex-col gap-4">
        <Box p={1} className="text-sm italic leading-[22px]">
          These are the repositories currently existing on your FlowScale Hub
          account
        </Box>
        <Box as="form">
          <FormControl>
            <FormControl.Label visuallyHidden>Default label</FormControl.Label>
            <TextInput
              sx={{ borderRadius: "6px", width: "97%" }}
              block
              leadingVisual={MagnifyingGlass}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search repositories..."
            />
          </FormControl>
        </Box>
        <Box
          className="flex flex-col gap-2 overflow-y-auto"
          sx={{ maxHeight: "300px" }}
        >
          {filteredRepoList.map((repo) => (
            <div
              key={repo.id}
              className="flex justify-between items-center p-3"
              style={{ borderBottom: "1px solid #343B45" }}
            >
              <div className="flex gap-2">
                <BookBookmark size={20} />
                {repo.text}
              </div>
              {connectedRepos[repo.id] ? (
                <Token
                  sx={{ borderRadius: "6px", padding: "6px", color: "white" }}
                  text={"Connected"}
                  leadingVisual={MagnifyingGlass}
                />
              ) : (
                <Button
                  onClick={() => toggleConnect(repo.id)}
                  sx={{ borderRadius: "24px", padding: "12px 16px" }}
                >
                  Connect
                </Button>
              )}
            </div>
          ))}
        </Box>
        <Box className="text-sm leading-[20px]">
          Can’t find the repository you are looking for or want to create a new
          repository?
        </Box>
      </Box>
    </Modal>
  );
};
