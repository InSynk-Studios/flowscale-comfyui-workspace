import React from "react";
import { Table, DataTable } from "@primer/react/drafts";
import { Box } from "@primer/react";

interface Column {
  header: string;
  field: string;
  rowHeader?: boolean;
  renderCell?: (row: unknown) => React.ReactNode;
}

interface MergeConflictTableProps {
  title: string;
  subtitle: string;
  data: unknown[];
  columns: Column[];
}

const MergeConflictTable: React.FC<MergeConflictTableProps> = ({
  title,
  subtitle,
  data,
  columns,
}) => (
  <Table.Container sx={{ width: "100%" }}>
    <Box className="flex justify-between w-full mb-4 gap-2">
      <Table.Title as="h2" id="table-title">
        {title}
      </Table.Title>
      <Table.Subtitle as="p" id="table-subtitle">
        {subtitle}
      </Table.Subtitle>
    </Box>
    <DataTable
      aria-labelledby="table-title"
      aria-describedby="table-subtitle"
      data={data}
      columns={columns.map((column) => ({
        header: column.header,
        field: column.field,
        rowHeader: column.rowHeader,
        renderCell: column.renderCell,
      }))}
    />
  </Table.Container>
);

export default MergeConflictTable;
