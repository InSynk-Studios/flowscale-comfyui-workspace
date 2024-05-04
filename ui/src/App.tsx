import { useState } from "react";
// @ts-ignore
import { app } from "/scripts/app.js";
// @ts-ignore
import {
  HStack,
  Input,
  Box,
  Drawer,
  DrawerBody,
  Button,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Checkbox,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  IconFolder,
  IconPlus,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import RecentFilesDrawer from "./RecentFilesDrawer";
type Route = "root" | "customNodes" | "recentFlows";

export default function App() {
  const [route, setRoute] = useState<Route>("root");

  return (
    <Box
      style={{
        width: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <HStack
        style={{
          padding: 8,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
        justifyContent={"space-between"}
        gap={4}
      >
        <HStack>
          <Button
            size={"sm"}
            aria-label="workspace folder"
          >
            <HStack gap={1}>
              <IconFolder size={20} />
              <IconTriangleInvertedFilled size={8} />
            </HStack>
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            colorScheme="teal"
            aria-label="workspace folder"
          >
            <HStack gap={1} px={3}>
              <IconPlus size={16} color={"white"} />
              <Text color={"white"} fontSize={"sm"}>
                New
              </Text>
            </HStack>
          </Button>
          <Input
            variant="unstyled"
            placeholder="Workflow name"
            color={"white"}
          />
        </HStack>
      </HStack>

      {route === "recentFlows" && (
        <RecentFilesDrawer
          onclose={() => setRoute("root")}
          onClickNewFlow={() => {
            setRoute("root");
          }}
        />
      )}

      <CustomNodesDrawer
        isOpen={true}
        onclose={() => {
          setRoute("root");
        }}
      />
    </Box>
  );
}

type CustomNodesDrawerProps = {
  onclose: () => void;
  isOpen: boolean;
};
function CustomNodesDrawer({
  onclose,
}: CustomNodesDrawerProps) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
      <Drawer
        isOpen={true}
        placement="right"
        onClose={() => onclose()}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Custom Nodes</DrawerHeader>
          <DrawerBody>
            <HStack mb={3}>
              <Checkbox
                mr={6}
                isChecked={false}
              >
                Select All
              </Checkbox>
              <Button
              >
                Install Missing Nodes
              </Button>
            </HStack>
            <Text mb={3} color={"GrayText"} fontSize={"small"}>
              Unselectable nodes are not found in Github, they may be private
              repos
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
