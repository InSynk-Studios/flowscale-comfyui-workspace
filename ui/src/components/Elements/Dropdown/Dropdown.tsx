import React from "react";
import { ActionMenu } from "@primer/react";

interface MenuItem {
  label: string;
  action: () => void;
  trailingVisual?: string;
  variant?: "default" | "danger";
}

interface DropdownProps {
  buttonLabel: string;
  //   items: MenuItem[];
  overlayWidth?: string | number;
  children?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonLabel,
  children,
  overlayWidth = "medium",
}) => (
  <ActionMenu>
    <ActionMenu.Button
      trailingAction={null}
      sx={{
        borderRadius: "24px",
        fontSize: "16px",
        padding: "18px 16px",
        backgroundColor: "#fff",
        color: "#16191D",
        "&:hover": {
          color: "#C4C4CA",
          border: "1px solid #343B45",
          backgroundColor: "#fff",
        },
      }}
    >
      {buttonLabel}
    </ActionMenu.Button>
    <ActionMenu.Overlay width={overlayWidth}>
      {children}
      {/* <ActionList>
        {items.map((item, index) => (
          <ActionList.Item
            key={index}
            onSelect={item.action}
            variant={item.variant || "default"}
          >
            {item.label}
            {item.trailingVisual && (
              <ActionList.TrailingVisual>
                {item.trailingVisual}
              </ActionList.TrailingVisual>
            )}
          </ActionList.Item>
        ))}
        {items.some((item) => item.variant === "danger") && (
          <ActionList.Divider />
        )}
      </ActionList> */}
    </ActionMenu.Overlay>
  </ActionMenu>
);

export default Dropdown;
