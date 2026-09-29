import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';

const SummaryCards = ({ expenses }) => {
  const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const totalTrips = expenses.length;
  
  // Calculate current month total
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthTotal = expenses.reduce((sum, exp) => {
    const expDate = new Date(exp.date);
    if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
      return sum + parseFloat(exp.amount || 0);
    }
    return sum;
  }, 0);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card className="glass-effect" sx={{ height: '100%', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Total Expenses</Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </Typography>
              </Box>
              <AccountBalanceWalletIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={4}>
        <Card className="glass-effect" sx={{ height: '100%', bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Total Entries</Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {totalTrips}
                </Typography>
              </Box>
              <ReceiptIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={4}>
        <Card className="glass-effect" sx={{ height: '100%', border: '1px solid #e2e8f0' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Current Month</Typography>
                <Typography variant="h4" color="primary.main" sx={{ mt: 1, fontWeight: 'bold' }}>
                  ₹{currentMonthTotal.toLocaleString('en-IN')}
                </Typography>
              </Box>
              <AssessmentIcon color="primary" sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryCards;
