import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, MenuItem, TextField, Button, Grid } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import generatePDF from '../utils/pdfGenerator';
import BadgeIcon from '@mui/icons-material/Badge';

const EmployeeReportDownloader = ({ expenses }) => {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

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

  // Derive unique employees
  const uniqueEmployees = [...new Map(expenses.map(item => [item.empId, item])).values()];

  const handleDownload = () => {
    if (!selectedEmp || !selectedMonth) return;

    const filteredExpenses = expenses.filter(exp => {
      const matchesEmp = exp.empId === selectedEmp;
      const matchesMonth = exp.date.split('-')[1] === selectedMonth;
      return matchesEmp && matchesMonth;
    });

    const employeeData = uniqueEmployees.find(e => e.empId === selectedEmp);
    const searchEmpName = employeeData ? employeeData.empName : selectedEmp;

    if (filteredExpenses.length === 0) {
      alert("No expenses found for this employee in the selected month.");
      return;
    }

    generatePDF(filteredExpenses, selectedMonth, searchEmpName);
  };

  return (
    <Card className="glass-effect" sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <BadgeIcon color="primary" />
          <Typography variant="h6" color="primary">
            Employee Monthly Report
          </Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Select Employee"
              value={selectedEmp}
              onChange={(e) => setSelectedEmp(e.target.value)}
            >
              {uniqueEmployees.map(emp => (
                <MenuItem key={emp.empId} value={emp.empId}>
                  {emp.empName} ({emp.empId})
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Select Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map(m => (
                <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<PictureAsPdfIcon />}
              onClick={handleDownload}
              disabled={!selectedEmp || !selectedMonth}
            >
              Download Report
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeeReportDownloader;
