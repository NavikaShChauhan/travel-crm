import { useState } from 'react';
import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { MdSearch, MdMoreVert } from 'react-icons/md';
import { tokens } from '@styles/theme';

export default function SalesTable({
  columns = [],
  rows = [],
  searchPlaceholder = 'Search records...',
  searchValue,
  onSearchChange,
  onRowClick,
  actionMenuItems = [],
  onActionClick,
  stickyHeader = true,
  maxHeight,
  isLoading = false,
  emptyMessage = 'No records found',
  pagination = false,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
}) {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const handleOpenMenu = (e, row) => {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
    setActiveRow(row);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setActiveRow(null);
  };

  const handleMenuItemClick = (item) => {
    if (onActionClick && activeRow) {
      onActionClick(item.id || item.action || item.label, activeRow);
    }
    handleCloseMenu();
  };

  return (
    <Card sx={{ borderRadius: 2.5, overflow: 'hidden' }}>
      {/* Optional Search Bar */}
      {onSearchChange !== undefined && (
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchValue || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={20} color={tokens.color.ink400} />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 360 }}
          />
        </Box>
      )}

      {/* Loading State */}
      {isLoading ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress size={32} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Loading records...
          </Typography>
        </Box>
      ) : rows.length === 0 ? (
        /* Empty State */
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
      ) : (
        /* Table Content */
        <TableContainer sx={{ maxHeight: maxHeight || 'none' }}>
          <Table size="small" stickyHeader={stickyHeader}>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.align || 'left'}
                    sx={{
                      fontWeight: 700,
                      bgcolor: 'background.paper',
                      minWidth: col.minWidth || 'auto',
                      py: 1.25,
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
                {actionMenuItems.length > 0 && (
                  <TableCell align="center" sx={{ fontWeight: 700, bgcolor: 'background.paper', py: 1.25 }}>
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={row.id || idx}
                  hover
                  onClick={() => onRowClick && onRowClick(row)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.id} align={col.align || 'left'} sx={{ py: 1 }}>
                      {col.renderCell ? col.renderCell(row) : row[col.id]}
                    </TableCell>
                  ))}
                  {actionMenuItems.length > 0 && (
                    <TableCell align="center" sx={{ py: 1 }}>
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, row)}>
                        <MdMoreVert size={18} />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Optional Pagination */}
      {pagination && (
        <TablePagination
          component="div"
          count={totalCount !== undefined ? totalCount : rows.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}

      {/* Row Context Menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
        {actionMenuItems.map((item) => (
          <MenuItem
            key={item.id || item.label}
            onClick={() => handleMenuItemClick(item)}
            sx={{ color: item.color || 'text.primary', fontWeight: 500 }}
          >
            {item.icon && <Box component="span" sx={{ mr: 1, display: 'inline-flex' }}>{item.icon}</Box>}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Card>
  );
}
