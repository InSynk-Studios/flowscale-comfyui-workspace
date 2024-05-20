import React, { useState } from "react";
import { Box, UnderlineNav } from "@primer/react";
import { UnderlineNavItem } from "@primer/react/lib-esm/UnderlineNav/UnderlineNavItem";

interface TabsProps {
  children: React.ReactNode[];
  tabNames: string[];
  onTabChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ children, tabNames, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <Box className="flex flex-col gap-3">
      <UnderlineNav aria-label="Publish Workflow">
        {tabNames.map((tabName, index) => (
          <UnderlineNavItem
            as="div"
            sx={{
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
            key={index}
            aria-current={activeTab === index ? "page" : undefined}
            onClick={() => handleTabClick(index)}
          >
            {tabName}
          </UnderlineNavItem>
        ))}
      </UnderlineNav>
      <Box>{children[activeTab]}</Box>
    </Box>
  );
};

export default Tabs;
