import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button,
  Grid,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const EXPENSE_TYPES = ['Cab', 'Porter', 'Delivery', 'Other'];
const PAYMENT_MODES = ['Corporate Card', 'Personal Card', 'Cash', 'UPI'];

const ExpenseForm = ({ onAddExpense, editExpense, clearEdit }) => {
  const [formData, setFormData] = useState({
    empName: '',
    empId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    from: '',
    to: '',
    expenseType: 'Cab',
    amount: '',
    paymentMode: 'Corporate Card',
    remarks: ''
  });

  useEffect(() => {
    if (editExpense) {
      setFormData(editExpense);
    }
  }, [editExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editExpense) {
      onAddExpense({ ...formData });
      clearEdit();
    } else {
      onAddExpense({
        ...formData,
        id: uuidv4(),
        amount: parseFloat(formData.amount)
      });
    }
    
    // Reset form except defaults
    setFormData({
      empName: '',
      empId: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      from: '',
      to: '',
      expenseType: 'Cab',
      amount: '',
      paymentMode: 'Corporate Card',
      remarks: ''
    });
  };

  const handleCancel = () => {
    clearEdit();
    setFormData({
      empName: '',
      empId: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      from: '',
      to: '',
      expenseType: 'Cab',
      amount: '',
      paymentMode: 'Corporate Card',
      remarks: ''
    });
  };

  return (
    <Card className="glass-effect" sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 3 }}>
          {editExpense ? 'Edit Office Expense' : 'Add New Office Expense'}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Employee Name"
                name="empName"
                value={formData.empName}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Employee ID"
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Expense Type"
                name="expenseType"
                value={formData.expenseType || 'Cab'}
                onChange={handleChange}
                size="small"
              >
                {EXPENSE_TYPES.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label={formData.expenseType === 'Cab' ? "From Location" : "Vendor / Origin"}
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label={formData.expenseType === 'Cab' ? "To Location" : "Details / Destination"}
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
               <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                required
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Payment Mode"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                size="small"
              >
                {PAYMENT_MODES.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks / Reason"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
              {editExpense && (
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary">
                {editExpense ? 'Update Expense' : 'Save Expense'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
