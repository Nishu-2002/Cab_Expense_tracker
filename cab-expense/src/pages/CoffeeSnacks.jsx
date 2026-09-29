import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CoffeeSnacksForm from '../components/CoffeeSnacksForm';
import CoffeeSummaryCards from '../components/CoffeeSummaryCards';
import CoffeeSnacksTable from '../components/CoffeeSnacksTable';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

const CoffeeSnacks = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('coffeeExpenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem('coffeeExpenses', JSON.stringify(expenses));
  }, [expenses]);

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
    <Box sx={{ minHeight: '100vh', py: 4, background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)' }}>
      <Container maxWidth="xl">
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: 2, 
              bgcolor: 'secondary.main', 
              color: 'white',
              boxShadow: '0 4px 14px 0 rgba(16, 185, 129,0.39)'
            }}
          >
            <LocalCafeIcon fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h4" color="text.primary">
              Coffee & Snacks Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Gundal Business Pvt. Ltd.
            </Typography>
          </Box>
        </Box>

        <CoffeeSummaryCards expenses={expenses} />
        
        <CoffeeSnacksForm 
          onAddExpense={handleAddOrUpdateExpense} 
          editExpense={editExpense}
          clearEdit={clearEdit}
        />
        
        <CoffeeSnacksTable 
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </Container>
    </Box>
  );
};

export default CoffeeSnacks;
