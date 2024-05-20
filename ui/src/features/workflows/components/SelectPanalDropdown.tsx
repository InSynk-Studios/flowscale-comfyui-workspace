import React, { useState } from "react";
import { Box, Button, SelectPanel } from "@primer/react";
import { ChevronDownIcon } from "@primer/octicons-react";
import type { ItemInput } from "@primer/react/lib-esm/deprecated/ActionList/List";

interface SelectPanalDropdownProps {
  items: ItemInput[];
  title: string;
  selected?: ItemInput;
  onSelectedChange?: (item: ItemInput | undefined) => void;
  label?: string;
}

const SelectPanalDropdown: React.FC<SelectPanalDropdownProps> = ({
  items,
  title,
  selected,
  onSelectedChange,
  label = "",
}) => {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = items.filter(
    (item) => item.text && item.text.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelectedChange = (item: ItemInput | undefined) => {
    if (onSelectedChange) {
      onSelectedChange(item);
    }
    setOpen(false);
  };

  return (
    <Box className="flex flex-col gap-2 w-full">
      {label && <div className="text-sm text-[#F2F2F2] font-medium">{label}</div>}
      <SelectPanel
        overlayProps={{ zIndex: 10 }}
        title={title}
        renderAnchor={({
          children,
          "aria-labelledby": ariaLabelledBy,
          ...anchorProps
        }) => (
          <Button
            block
            alignContent="start"
            trailingAction={ChevronDownIcon}
            aria-labelledby={ariaLabelledBy}
            {...anchorProps}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {selected ? selected.text : title}
          </Button>
        )}
        placeholderText="Filter Labels"
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={handleSelectedChange}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{ width: "xlarge", height: "medium" }}
      />
    </Box>
  );
};

export default SelectPanalDropdown;
