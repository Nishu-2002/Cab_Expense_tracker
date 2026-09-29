import React, { useState } from 'react';
import { 
  Box, 
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
  Toolbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import generatePDF from '../utils/pdfGenerator';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  const [filterMonth, setFilterMonth] = useState('');
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
    const matchesEmp = exp.empName.toLowerCase().includes(searchEmp.toLowerCase()) || 
                       exp.empId.toLowerCase().includes(searchEmp.toLowerCase());
    const matchesMonth = filterMonth ? exp.date.split('-')[1] === filterMonth : true;
    return matchesEmp && matchesMonth;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDownloadPdf = () => {
    generatePDF(filteredExpenses, filterMonth, searchEmp);
  };

  return (
    <Card className="glass-effect">
      <CardContent sx={{ p: 0 }}>
        <Toolbar sx={{ pl: 2, pr: 2, pt: 2, pb: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Expense Records
          </Typography>
          
          <TextField
            size="small"
            placeholder="Search Employee..."
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
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Details</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Payment Info</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                    No expenses found matching the criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{new Date(row.date).toLocaleDateString('en-GB')}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">{row.empName}</Typography>
                      <Typography variant="caption" color="text.secondary">{row.empId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{row.from} {row.expenseType === 'Cab' || row.cabType ? '➔' : '-'} {row.to}</Typography>
                      <Typography variant="caption" color="text.secondary">{row.expenseType || row.cabType}</Typography>
                    </TableCell>
                    <TableCell>{row.paymentMode}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="primary.main">
                        ₹{parseFloat(row.amount).toLocaleString('en-IN')}
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

export default ExpenseTable;
