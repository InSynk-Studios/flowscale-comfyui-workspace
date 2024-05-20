import React, { useState } from "react";
import { Box, FormControl, IconButton, TextInput } from "@primer/react";
import { PageHeader } from "@primer/react/experimental";
import { MagnifyingGlass } from "phosphor-react";

interface CustomPageHeaderProps {
  // title: string;
  actions?: {
    label: string;
    icon: React.ElementType;
    onClick: () => void;
  }[];
}

const PageHeaderWithActions: React.FC<CustomPageHeaderProps> = ({
  // title,
  actions = [],
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Box className="px-2">
      <PageHeader>
        <PageHeader.TitleArea sx={{ display: "flex", alignItems: "center" }}>
          <PageHeader.Title sx={{ fontSize: 14 }}>
            <Box as="form">
              <FormControl>
                <FormControl.Label visuallyHidden>
                  Default label
                </FormControl.Label>
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
                  placeholder="Search Files or Folders"
                />
              </FormControl>
            </Box>
          </PageHeader.Title>
          <PageHeader.Actions>
            {actions.map((action, index) => (
              <React.Fragment key={index}>
                {action.icon && (
                  <IconButton
                    size="small"
                    aria-label={action.label}
                    icon={action.icon}
                    onClick={action.onClick}
                    unsafeDisableTooltip={false}
                    variant="invisible"
                    sx={{
                      color: "#C4C4CA",
                      fontSize: "16px",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </PageHeader.Actions>
        </PageHeader.TitleArea>
      </PageHeader>
    </Box>
  );
};

export default PageHeaderWithActions;
