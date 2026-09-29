import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

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

const CoffeeSummaryCards = ({ expenses }) => {
  const totals = {
    coffee: 0, tea: 0, lemonTea: 0, gingerTea: 0, 
    irishCoffee: 0, milk: 0, boost: 0, snacks: 0
  };

  expenses.forEach(exp => {
    Object.keys(totals).forEach(key => {
      totals[key] += parseInt(exp[key] || 0);
    });
  });

  const totalOrders = expenses.length;
  const totalItemsCount = Object.values(totals).reduce((a, b) => a + b, 0);

  return (
    <Card className="glass-effect" sx={{ mb: 4, bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocalCafeIcon fontSize="large" />
            <Typography variant="h5" fontWeight="bold">Consumption Report (All-Time)</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.3)' }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>Total Delivery/Walk-ins</Typography>
            <Typography variant="h3" fontWeight="bold">{totalOrders}</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" sx={{ opacity: 0.9 }} mb={1}>Item Tally</Typography>
            <Grid container spacing={1}>
              {Object.keys(totals).map(key => (
                totals[key] > 0 && (
                  <Grid item xs={6} md={3} key={key}>
                    <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', p: 1, borderRadius: 1 }}>
                      <Typography variant="caption" display="block">{ITEM_LABELS[key]}</Typography>
                      <Typography variant="h6" fontWeight="bold">{totals[key]}</Typography>
                    </Box>
                  </Grid>
                )
              ))}
              {totalItemsCount === 0 && (
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1, ml: 1 }}>
                  No items recorded for this period.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CoffeeSummaryCards;
