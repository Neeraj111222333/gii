import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';

// Styled components
const TransactionBox = styled(Box)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  
  marginBottom: '16px', // Space between each transaction box
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.02)',
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: status === 'Success' ? green[500] : red[500],
  color: '#fff',
  fontWeight: 'bold',
  padding: '6px 14px',
  marginTop: '12px',
}));

const TransactionHash = styled(Typography)(({ theme }) => ({
  wordBreak: 'break-all', // Ensures long transaction hash will wrap instead of overflowing
  color: '#00B0FF',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginBottom: '8px',
}));

const Address = styled(Typography)(({ theme }) => ({
  wordBreak: 'break-all', // Prevents long addresses from overflowing
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '14px',
  color: theme.palette.text.secondary,
  marginBottom: '8px',
}));

// Main component
const LatestTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fake transaction data to simulate API response
  const fakeTransactions = [
    {
      hash: '0x5e9a3eebd4c64f5b87bbf29a57637e87a0df8d7c7e3da8d660cb03360c5cdb22',
      from: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
      to: '0x1234567890abcdefabcdefabcdefabcdefabcdef',
      blockNumber: 135792,
      isError: "0",
      timestamp: '2025-01-29 14:23:45',
    },
    {
      hash: '0x4a7b8c1d3d3927b34b42f2a8d7a75d7f8f647e77f57cb5d039d4be5fdc4b4c56',
      from: '0x1234567890abcdefabcdefabcdefabcdefabcdef',
      to: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
      blockNumber: 135793,
      isError: "0",
      timestamp: '2025-01-29 13:45:10',
    },
    {
      hash: '0x123abc7a6b7cd21e8d9d4c8fe8a1b742a3d9e4d0a9e1f60b784dc789ca6f123',
      from: '0x7890abcdefabcdefabcdefabcdefabcdefabcdef',
      to: '0x4567890abcdefabcdefabcdefabcdefabcdefabcdef',
      blockNumber: 135794,
      isError: "1",
      timestamp: '2025-01-29 12:10:20',
    },
    {
      hash: '0xa38d7b77c2b6e0bfc774e5bc5fa0032e19bc7ac6e0b61e1c7e8ec73b3d70fe92',
      from: '0x56bb33cd278d3d7cdbd7ccf845309b8f5e6bc95c',
      to: '0x39d9f0a3832833cd3f85a9452ad7920ae64bc7ec',
      blockNumber: 135795,
      isError: "0",
      timestamp: '2025-01-29 11:05:55',
    },
    {
      hash: '0x98cd62b13f529b62f8ff6e0f21833ddbc57ccf85b734defa2682cf9b3d8703c9',
      from: '0x9b8881b45cfa4b5c14f70b75cb8cfbc3c4ad75cb',
      to: '0x34db43b3a2ab8e8b26dfc8f4f6cbde960ac56958',
      blockNumber: 135796,
      isError: "1",
      timestamp: '2025-01-29 10:30:00',
    },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Simulating an API call delay
        setTimeout(() => {
          setTransactions(fakeTransactions);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]); // In case of an error, ensure we set an empty array
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <CircularProgress />
        <Typography>Loading Transactions...</Typography>
      </Box>
    );
  }

  if (transactions.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Typography>No transactions found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, maxWidth: '1200px', margin: '0 auto', marginTop: '20px' }}> {/* Added marginTop */}
      <Typography variant="h5" gutterBottom>
        Latest Transactions
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={3}>
          {transactions.map((tx) => (
            <Grid item xs={12} sm={6} md={4} key={tx.hash}>
              <TransactionBox>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <Typography variant="body2" color="text.secondary">
                    Timestamp: {tx.timestamp}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Block: {tx.blockNumber}
                  </Typography>
                </Box>
                <TransactionHash variant="body2">
                  Hash: <a href={`https://bscscan.com/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                    {tx.hash.slice(0, 8)}...{tx.hash.slice(-8)}
                  </a>
                </TransactionHash>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    From: <strong>
                      <Address variant="body2">{tx.from}</Address>
                    </strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    To: <strong>
                      <Address variant="body2">{tx.to}</Address>
                    </strong>
                  </Typography>
                </Box>
                <StatusChip label={tx.isError === "0" ? 'Success' : 'Failed'} status={tx.isError === "0" ? 'Success' : 'Failed'} />
              </TransactionBox>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default LatestTransactions;
