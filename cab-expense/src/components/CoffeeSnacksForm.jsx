import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button,
  Grid,
  MenuItem,
  Box
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const ORDER_MODES = ['Delivery (Malgudi Chai)', 'Dine-in / Walk-in'];
const TIME_OF_DAY = ['Morning', 'Afternoon', 'Evening'];
const ITEM_LIST = ['coffee', 'tea', 'lemonTea', 'gingerTea', 'irishCoffee', 'milk', 'boost', 'snacks'];
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

const defaultState = {
  empName: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  orderTime: 'Morning',
  orderMode: 'Delivery (Malgudi Chai)',
  coffee: 0,
  tea: 0,
  lemonTea: 0,
  gingerTea: 0,
  irishCoffee: 0,
  milk: 0,
  boost: 0,
  snacks: 0
};

const CoffeeSnacksForm = ({ onAddExpense, editExpense, clearEdit }) => {
  const [formData, setFormData] = useState(defaultState);

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
        id: uuidv4()
      });
    }
    
    setFormData(defaultState);
  };

  const handleCancel = () => {
    clearEdit();
    setFormData(defaultState);
  };

  return (
    <Card className="glass-effect" sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" color="secondary" gutterBottom sx={{ mb: 3 }}>
          {editExpense ? 'Edit Order' : 'Log New Daily Order'}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Point Person (Ordered By)"
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
                label="Time of Day"
                name="orderTime"
                value={formData.orderTime || 'Morning'}
                onChange={handleChange}
                size="small"
              >
                {TIME_OF_DAY.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Order Mode"
                name="orderMode"
                value={formData.orderMode || 'Delivery (Malgudi Chai)'}
                onChange={handleChange}
                size="small"
              >
                {ORDER_MODES.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Box mt={4} mb={2}>
            <Typography variant="subtitle1" fontWeight="600" color="text.secondary">Item Quantities</Typography>
          </Box>
          <Grid container spacing={2}>
            {ITEM_LIST.map(key => (
              <Grid item xs={6} sm={4} md={3} key={key}>
                <TextField
                  fullWidth
                  label={ITEM_LABELS[key]}
                  name={key}
                  type="number"
                  value={formData[key]}
                  onChange={handleChange}
                  size="small"
                  inputProps={{ min: 0 }}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            {editExpense && (
              <Button variant="outlined" color="primary" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" variant="contained" color="secondary">
              {editExpense ? 'Update Order' : 'Save Order'}
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CoffeeSnacksForm;
