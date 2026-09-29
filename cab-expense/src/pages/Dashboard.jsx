import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import SummaryCards from '../components/SummaryCards';
import EmployeeReportDownloader from '../components/EmployeeReportDownloader';
import ExpenseTable from '../components/ExpenseTable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Dashboard = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('officeExpenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem('officeExpenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    // Cleanup script: Automatically remove the injected dummy data from the user's browser
    if (localStorage.getItem('hasImportedNishanth') === 'true') {
      setExpenses(prev => prev.filter(e => e.remarks !== 'Bulk import'));
      localStorage.removeItem('hasImportedNishanth');
    }
  }, []);


  const handleAddOrUpdateExpense = (expense) => {
    if (editExpense) {
      setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e));
    } else {
      setExpenses(prev => [expense, ...prev]);
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const handleEditExpense = (expense) => {
    setEditExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearEdit = () => {
    setEditExpense(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 4, background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)' }}>
      <Container maxWidth="xl">
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: 2, 
              bgcolor: 'primary.main', 
              color: 'white',
              boxShadow: '0 4px 14px 0 rgba(37,99,235,0.39)'
            }}
          >
            <ReceiptLongIcon fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h4" color="text.primary">
              Office Expense Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Gundal Business Pvt. Ltd.
            </Typography>
          </Box>
        </Box>

        <SummaryCards expenses={expenses} />

        <Box sx={{ mt: 3 }}>
          <EmployeeReportDownloader expenses={expenses} />
        </Box>
        
        <ExpenseForm 
          onAddExpense={handleAddOrUpdateExpense} 
          editExpense={editExpense}
          clearEdit={clearEdit}
        />
        
        <ExpenseTable 
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
