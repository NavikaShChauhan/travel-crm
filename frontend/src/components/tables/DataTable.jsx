import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';
import PageLoader from '@components/loaders/PageLoader';
import EmptyState from '@components/common/EmptyState';

/**
 * DataTable
 * Generic, column-config-driven table used by every module's list view
 * so pagination/loading/empty states aren't reimplemented per module.
 *
 * `columns`: [{ key, label, render?(row) }]
 * `rows`: array of records
 *
 * Usage:
 *   <DataTable
 *     columns={[
 *       { key: 'name', label: 'Customer' },
 *       { key: 'status', label: 'Status', render: (row) => <StatusChip status={row.status} /> },
 *     ]}
 *     rows={customers}
 *   />
 */
function DataTable({
  columns,
  rows,
  isLoading = false,
  page = 0,
  pageSize = 10,
  totalCount,
  onPageChange,
  onPageSizeChange,
  getRowKey = (row) => row.id,
  showEmptyState = true,
}) {
  if (isLoading) return <PageLoader label="Loading records…" />;
  if (!rows || rows.length === 0) {
    if (showEmptyState) {
      return <EmptyState title="No records found" description="Try adjusting your filters." />;
    }

    return (
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'background.default' } }}>
                {columns.map((col) => (
                  <TableCell key={col.key}>{col.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody />
          </Table>
        </TableContainer>
        {onPageChange && (
          <TablePagination
            component="div"
            count={totalCount ?? 0}
            page={page}
            onPageChange={(_e, newPage) => onPageChange(newPage)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          />
        )}
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: '#FFFFFF' } }}>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={getRowKey(row)}
                hover
                sx={{
                  bgcolor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                  '&:hover': { bgcolor: '#EEF2FF' },
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {onPageChange && (
        <TablePagination
          component="div"
          count={totalCount ?? rows.length}
          page={page}
          onPageChange={(_e, newPage) => onPageChange(newPage)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => onPageSizeChange?.(Number(e.target.value))}
        />
      )}
    </Paper>
  );
}

export default DataTable;
