import React, { useState } from "react";
import { Button, SelectPanel, Truncate } from "@primer/react";
import { ChevronDownIcon } from "@primer/octicons-react";
import type { ItemInput } from "@primer/react/lib-esm/deprecated/ActionList/List";
import { GitMerge } from "phosphor-react";

interface GitContextSwitchDropdownProps {
  items: ItemInput[];
  showDownArrow?: boolean;
  showMergeIcon?: boolean;
  selected?: ItemInput | undefined;
  onSelectedChange?: (item: ItemInput | undefined) => void;
}
const GitContextSwitchDropdown: React.FC<GitContextSwitchDropdownProps> = ({
  items,
  showDownArrow = true,
  showMergeIcon = true,
  selected,
  onSelectedChange,
}) => {
  // const [selected, setSelected] = React.useState<ItemInput | undefined>(
  //   items[0]
  // );
  const [filter, setFilter] = React.useState("");
  const filteredItems = items.filter(
    (item) =>
      item.text && item.text.toLowerCase().startsWith(filter.toLowerCase())
  );

  const [open, setOpen] = useState(false);

  const handleSelectedChange = (item: ItemInput | undefined) => {
    if (onSelectedChange) {
      onSelectedChange(item);
    }
    setOpen(false);
  };

  return (
    <>
      <SelectPanel
        title={""}
        renderAnchor={({
          children,
          "aria-labelledby": ariaLabelledBy,
          ...anchorProps
        }) => (
          <Button
            leadingVisual={showMergeIcon ? GitMerge : undefined}
            trailingAction={showDownArrow ? ChevronDownIcon : undefined}
            aria-labelledby={` ${ariaLabelledBy}`}
            {...anchorProps}
            variant="invisible"
            sx={{ color: "#fff" }}
          >
            <Truncate title={children ?? "Select Labels"}>
              {children ?? "Select Labels"}
            </Truncate>
          </Button>
        )}
        placeholderText="Filter Repositories"
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={handleSelectedChange}
        onFilterChange={setFilter}
        showItemDividers={true}
        // overlayProps={{ width: "small", height: "medium" }}
        footer={
          <Button size="small" block variant="invisible">
            Add Repository
          </Button>
        }
      />
    </>
  );
};

export default GitContextSwitchDropdown;
