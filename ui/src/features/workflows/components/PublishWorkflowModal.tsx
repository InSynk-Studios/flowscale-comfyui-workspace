import React, { useState } from "react";
import Modal from "../../../components/Elements/Modal/Modal";
import { Box, Button } from "@primer/react";
import SelectPanalDropdown from "./SelectPanalDropdown";
import { ArrowLeft, Link, Plus } from "phosphor-react";
import Tabs from "../../../components/Elements/Tabs/Tabs";
import type { ItemInput } from "@primer/react/lib-esm/deprecated/ActionList/List";
import Dropdown from "../../../components/Elements/Dropdown/Dropdown";

interface DeployWorkflowModalProps {
  isOpen: boolean;
  isClose: () => void;
  items: ItemInput[];
  activeTabName: string;
}

export const PublishWorkflowModal: React.FC<DeployWorkflowModalProps> = ({
  isOpen,
  isClose,
  items,
  activeTabName,
}) => {
  const [inputs, setInputs] = useState<number[][]>([[1]]);
  const [outputs, setOutputs] = useState<number[][]>([[1]]);
  const [selectedInputs, setSelectedInputs] = useState<
    (ItemInput | undefined)[][]
  >([[undefined]]);
  const [selectedOutputs, setSelectedOutputs] = useState<
    (ItemInput | undefined)[][]
  >([[undefined]]);

  const addInput = (workflowIndex: number) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[workflowIndex].push(newInputs[workflowIndex].length + 1);
      return newInputs;
    });
    setSelectedInputs((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[workflowIndex].push(undefined);
      return newSelected;
    });
  };

  const addOutput = (workflowIndex: number) => {
    setOutputs((prevOutputs) => {
      const newOutputs = [...prevOutputs];
      newOutputs[workflowIndex].push(newOutputs[workflowIndex].length + 1);
      return newOutputs;
    });
    setSelectedOutputs((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[workflowIndex].push(undefined);
      return newSelected;
    });
  };

  const handleInputChange = (
    workflowIndex: number,
    inputIndex: number,
    item: ItemInput | undefined
  ) => {
    setSelectedInputs((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[workflowIndex][inputIndex] = item;
      return newSelected;
    });
  };

  const handleOutputChange = (
    workflowIndex: number,
    outputIndex: number,
    item: ItemInput | undefined
  ) => {
    setSelectedOutputs((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[workflowIndex][outputIndex] = item;
      return newSelected;
    });
  };

  function CustomHeader() {
    return (
      <Box
        sx={{ borderBottom: "1px solid #343B45" }}
        className="px-2 flex items-center justify-between"
      >
        <Box className="flex items-center gap-2">
          <ArrowLeft size={24} onClick={isClose} className="cursor-pointer" />
          <h3 className="text-[18px] font-semibold">{activeTabName}</h3>
        </Box>
        <Dropdown buttonLabel="Publish">
          <Box className="flex flex-col p-3 gap-4">
            <Box className="flex items-center gap-2">
              <Link />
              {activeTabName}
            </Box>
            <Box>Updated 3d ago</Box>
            <Button
              sx={{
                borderRadius: "24px",
                fontSize: "16px",
                padding: "10px 16px",
                backgroundColor: "#fff",
                color: "#16191D",
                "&:hover": {
                  color: "#C4C4CA",
                  border: "1px solid #343B45",
                },
              }}
            >
              Update
            </Button>
            <Box sx={{ borderTop: "1px solid #343B45" }} className="mt-2 py-2">
              2 changes
            </Box>
          </Box>
        </Dropdown>
      </Box>
    );
  }

  const tabNames = ["Edit", "Preview", "API Docs"];

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={isClose}
      customHeader={CustomHeader}
      sx={{ width: "100%", height: "100vh" }}
      showButtons={false}
    >
      <Box className="overflow-y-auto">
        <Tabs tabNames={tabNames} onTabChange={() => {}}>
          <Box className="px-3">
            {[1].map((workflowIndex) => (
              <Box key={workflowIndex} className="flex flex-col gap-4">
                <Box className="flex justify-between gap-2">
                  <div className="text-sm text-[#D7D7DB] font-medium">
                    Set up the user interface for your workflow by selecting
                    input and output nodes along with their relevant parameters.
                    This will allow you to easily users to easily access your
                    workflow.
                  </div>
                  <Button
                    sx={{
                      borderRadius: "24px",
                      fontSize: "16px",
                      padding: "20px 16px",
                      backgroundColor: "#fff",
                      color: "#16191D",
                      "&:hover": {
                        color: "#C4C4CA",
                        border: "1px solid #343B45",
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
                <Box className="flex gap-4 justify-between">
                  <Box className="flex flex-col gap-2 w-full">
                    {inputs[workflowIndex - 1].map((inputIndex, index) => (
                      <SelectPanalDropdown
                        key={`input-${workflowIndex}-${inputIndex}`}
                        items={items}
                        title={`Select Input ${inputIndex}`}
                        label={index === 0 ? `Input` : undefined}
                        selected={selectedInputs[workflowIndex - 1][index]}
                        onSelectedChange={(item) =>
                          handleInputChange(workflowIndex - 1, index, item)
                        }
                      />
                    ))}
                    <Button
                      onClick={() => addInput(workflowIndex - 1)}
                      leadingVisual={Plus}
                      className="w-1/3 ml-auto"
                      sx={{ borderRadius: "24px" }}
                    >
                      Add New Input
                    </Button>
                  </Box>

                  <div style={{ borderRight: "1px solid #343B45" }} />

                  <Box className="flex flex-col gap-2 w-full">
                    {outputs[workflowIndex - 1].map((outputIndex, index) => (
                      <SelectPanalDropdown
                        key={`output-${workflowIndex}-${outputIndex}`}
                        items={items}
                        title={`Select Output ${outputIndex}`}
                        label={index === 0 ? `Output` : undefined}
                        selected={selectedOutputs[workflowIndex - 1][index]}
                        onSelectedChange={(item) =>
                          handleOutputChange(workflowIndex - 1, index, item)
                        }
                      />
                    ))}
                    <Button
                      onClick={() => addOutput(workflowIndex - 1)}
                      leadingVisual={Plus}
                      className="w-1/3 ml-auto"
                      sx={{ borderRadius: "24px" }}
                    >
                      Add New Output
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className="px-3">
            <Box className="flex items-center justify-between">
              <p className="text-sm text-[#D7D7DB] font-medium">
                Copy Link to share this preview page with others.
              </p>
              <Button
                leadingVisual={Link}
                sx={{
                  borderRadius: "24px",
                  fontSize: "16px",
                  padding: "7px 14px",
                  backgroundColor: "#fff",
                  color: "#16191D",
                  "&:hover": {
                    color: "#C4C4CA",
                    border: "1px solid #343B45",
                  },
                }}
              >
                Copy Link
              </Button>
            </Box>
          </Box>
          <Box className="px-3">
            <div>API Content</div>
          </Box>
        </Tabs>
      </Box>
    </Modal>
  );
};
