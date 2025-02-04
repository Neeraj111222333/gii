import React from "react";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
import { CurrencyBitcoin, Language, Storage, Timer } from "@mui/icons-material";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// Chart Data
const data = {
  labels: ["Jan 14", "Jan 21", "Jan 28"],
  datasets: [
    {
      data: [4000000, 5500000, 4800000],
      borderColor: "#007BFF",
      borderWidth: 2,
      pointRadius: 3,
      tension: 0.3, // Smooth curve
      fill: true,
      backgroundColor: "rgba(0, 123, 255, 0.1)",
    },
  ],
};

// Chart Options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#666", font: { size: 12 } } },
    y: { grid: { display: false }, ticks: { display: false } },
  },
};

const BscDashboard = () => {
  return (
    <Paper
      elevation={6}
      sx={{
        width: { xs: "85%", md: "95%" }, // Reduced width on mobile
        maxWidth: "1200px",
        margin: "0 auto",
        padding: { xs: 2, md: 4 },
        borderRadius: 4,
        backgroundColor: "#fff",
        boxShadow: "0px 6px 16px rgba(0,0,0,0.15)",
        marginTop: { xs: "-10px", md: "-30px" }, // Overlaps the component above it
        position: "relative",
        zIndex: 10,
      }}
    >
      <Grid container spacing={3}>
        {/* LEFT SIDE (ALL DATA) */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* BNB PRICE */}
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" alignItems="center">
                <CurrencyBitcoin sx={{ color: "#ffcc00", fontSize: 30, marginRight: 1 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">BNB PRICE</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    $675.91 <span style={{ color: "red" }}>(-0.81%)</span>
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* BNB MARKET CAP */}
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" alignItems="center">
                <Language sx={{ color: "#007BFF", fontSize: 30, marginRight: 1 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">MARKET CAP</Typography>
                  <Typography variant="body1" fontWeight="bold">$101.61B</Typography>
                </Box>
              </Box>
            </Grid>

            {/* TRANSACTIONS */}
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" alignItems="center">
                <Storage sx={{ color: "#28a745", fontSize: 30, marginRight: 1 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">TRANSACTIONS</Typography>
                  <Typography variant="body1" fontWeight="bold">6,713.72M (40.5 TPS)</Typography>
                </Box>
              </Box>
            </Grid>

            {/* LATEST BLOCK */}
            <Grid item xs={12} sm={6} md={3}>
              <Box display="flex" alignItems="center">
                <Timer sx={{ color: "#dc3545", fontSize: 30, marginRight: 1 }} />
                <Box>
                  <Typography variant="caption" color="textSecondary">LATEST BLOCK</Typography>
                  <Typography variant="body1" fontWeight="bold">46182700 (3.0s)</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ marginY: 2 }} />

          <Grid container spacing={2}>
            {/* MED GAS PRICE */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">MED GAS PRICE</Typography>
              <Typography variant="body1" fontWeight="bold">1 Gwei ($0.01)</Typography>
            </Grid>

            {/* VOTING POWER */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="textSecondary">VOTING POWER</Typography>
              <Typography variant="body1" fontWeight="bold">31.30M BNB</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* RIGHT SIDE (GRAPH) */}
        <Grid item xs={12} md={4}>
          <Typography variant="caption" color="textSecondary">
            BNB SMART CHAIN TRANSACTION HISTORY (14 DAYS)
          </Typography>
          <Box sx={{ width: "100%", height: { xs: 120, md: 140 }, mt: 1 }}>
            <Line data={data} options={options} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BscDashboard;
