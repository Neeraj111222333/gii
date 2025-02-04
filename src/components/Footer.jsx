import React from "react";
import { Box, Typography, Button, Link, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Footer Container
const FooterContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#F9FAFB",
  padding: "50px 0",
  color: "#333",
  marginTop:'100px'
}));

// MetaMask Styled Button
const MetaMaskButton = styled(Button)({
  backgroundColor: "#f8f9fa",
  color: "#333",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  padding: "8px 16px",
  fontWeight: "bold",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "10px",
  "&:hover": {
    backgroundColor: "#eef1f6",
  },
});

// Styled Link List
const LinkList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

// Staking Badge
const StakingBadge = styled(Box)({
  backgroundColor: "#007BFF",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  borderRadius: "12px",
  padding: "4px 8px",
  marginLeft: "5px",
  display: "inline-block",
});

export default function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* Left Section */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap="10px">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc7KWzGlzD9JcqJwqAkAuhFUNVt_-cV_o6Yw&s"
                alt="BNB Icon"
                width="30"
              />
              <Typography fontWeight="bold" variant="h6">
                Powered by BNB Beacon Chain
              </Typography>
            </Box>
            <Typography variant="body2" mt={1} color="textSecondary">
              BscScan is a Block Explorer and Analytics Platform for BNB Smart Chain.
            </Typography>
            <MetaMaskButton>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM07pNJYWb9SBZExCx9_W4KQ4txe4qQeNsWg&s"
                alt="MetaMask"
                width="20"
              />
              Add BSC Network
            </MetaMaskButton>
          </Grid>

          {/* Company Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography fontWeight="bold" variant="h6">Company</Typography>
            <LinkList>
              <Link href="#" underline="none" color="inherit">
                Delegate to BscScan <StakingBadge>Staking</StakingBadge>
              </Link>
              <Link href="#" underline="none" color="inherit">Brand Assets</Link>
              <Link href="#" underline="none" color="inherit">Contact Us</Link>
              <Link href="#" underline="none" color="inherit">Terms & Privacy</Link>
              <Link href="#" underline="none" color="inherit" target="_blank">Bug Bounty 🔗</Link>
            </LinkList>
          </Grid>

          {/* Community Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography fontWeight="bold" variant="h6">Community</Typography>
            <LinkList>
              <Link href="#" underline="none" color="inherit">API Documentation</Link>
              <Link href="#" underline="none" color="inherit">Knowledge Base</Link>
              <Link href="#" underline="none" color="inherit">Network Status</Link>
              <Link href="#" underline="none" color="inherit" target="_blank">Learn BSC 🔗</Link>
            </LinkList>
          </Grid>

          {/* Products & Services Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography fontWeight="bold" variant="h6">Products & Services</Typography>
            <LinkList>
              <Link href="#" underline="none" color="inherit" target="_blank">Advertise 🔗</Link>
              <Link href="#" underline="none" color="inherit">Explorer as a Service (EaaS)</Link>
              <Link href="#" underline="none" color="inherit" target="_blank">API Plans 🔗</Link>
              <Link href="#" underline="none" color="inherit">Priority Support</Link>
              <Link href="#" underline="none" color="inherit" target="_blank">Blockscan 🔗</Link>
            </LinkList>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
}
