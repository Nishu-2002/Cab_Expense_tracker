import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  TextField,
  MenuItem,
  InputAdornment,
  Toolbar,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import generateCoffeePDF from '../utils/coffeePdfGenerator';

const ITEM_LABELS = {
  coffee: 'Coffee',
  tea: 'Tea',
  lemonTea: 'Lemon Tea',
  gingerTea: 'Ginger Tea',
  irishCoffee: 'Irish Coffee',
  milk: 'Milk',
  boost: 'Boost',
  snacks: 'Snacks'
};

const CoffeeSnacksTable = ({ expenses, onEdit, onDelete }) => {
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [searchEmp, setSearchEmp] = useState('');

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const filteredExpenses = expenses.filter(exp => {
    const matchesEmp = exp.empName?.toLowerCase().includes(searchEmp.toLowerCase());
    const matchesMonth = filterMonth ? exp.date.split('-')[1] === filterMonth : true;
    const matchesDate = filterDate ? exp.date === filterDate : true;
    return matchesEmp && matchesMonth && matchesDate;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDownloadPdf = () => {
    generateCoffeePDF(filteredExpenses, filterMonth, filterDate);
  };

  const getOrderedItems = (row) => {
    return Object.keys(ITEM_LABELS).map(key => {
      const qty = parseInt(row[key] || 0);
      if (qty > 0) return `${ITEM_LABELS[key]}: ${qty}`;
      return null;
    }).filter(Boolean).join(' | ');
  };

  return (
    <Card className="glass-effect">
      <CardContent sx={{ p: 0 }}>
        <Toolbar sx={{ pl: 2, pr: 2, pt: 2, pb: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" color="secondary" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Daily Order History
          </Typography>
          
          <TextField
            size="small"
            placeholder="Search Person..."
            value={searchEmp}
            onChange={(e) => setSearchEmp(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="date"
            size="small"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 140 }}
          />

          <TextField
            select
            size="small"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            sx={{ minWidth: 120 }}
            displayEmpty
          >
            <MenuItem value="">All Months</MenuItem>
            {months.map(m => (
              <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
            ))}
          </TextField>

          <Button 
            variant="outlined" 
            startIcon={<PictureAsPdfIcon />}
            onClick={handleDownloadPdf}
            disabled={filteredExpenses.length === 0}
            color="secondary"
          >
            Export PDF
          </Button>
        </Toolbar>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Point Person</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Order Mode</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Breakdown</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Typography variant="body2">{new Date(row.date).toLocaleDateString('en-GB')}</Typography>
                      {row.orderTime && <Typography variant="caption" color="text.secondary">{row.orderTime}</Typography>}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">{row.empName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={row.orderMode || 'Delivery (Malgudi Chai)'} size="small" variant="outlined" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="secondary.main" fontWeight="500">
                        {getOrderedItems(row) || 'No items listed'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" color="primary" onClick={() => onEdit(row)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => onDelete(row.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CoffeeSnacksTable;
