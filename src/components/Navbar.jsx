import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Box, Typography, Menu, MenuItem } from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu';

// Styled components for the navbar
const NavItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
  cursor: 'pointer',
  fontWeight: 'bold',
  padding: '0 20px',
  '&:hover': {
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  },
}));

// Main component
export default function SearchAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = [
    { name: 'Home', url: 'https://bscscan.com' },
    { name: 'Blockchain', url: 'https://bscscan.com/blockchain' },
    { name: 'Tokens', url: 'https://bscscan.com/tokens' },
    { name: 'Validators', url: 'https://bscscan.com/validators' },
    { name: 'NFTs', url: 'https://bscscan.com/nfts' },
    { name: 'Resources', url: 'https://bscscan.com/resources' },
    { name: 'Developers', url: 'https://bscscan.com/developers' }
  ];

  // Custom theme for the navbar
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00B0FF', // Light blue accent
      },
      background: {
        default: '#FFFFFF',
        paper: '#F4F6F8', // Subtle paper background
      },
      text: {
        primary: '#333333', // Dark text for readability
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Improved font choice
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ backgroundColor: theme.palette.background.paper }}>
          <Toolbar sx={{ justifyContent: 'space-between', padding: '0 20px' }}>
            {/* Logo Section */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <img
                src="https://hieroglyphics.com/wp-content/uploads/2021/12/bscscan.png"
                alt="Logo"
                style={{
                  height: '40px', 
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ display: { xs: 'block', sm: 'none' } }}
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop Navigation Menu */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3 }}>
              {pages.map((page) => (
                <NavItem key={page.name}>
                  <a href={page.url} target="_blank" rel="noopener noreferrer">
                    <Typography sx={{ ml: 1 }}>{page.name}</Typography>
                  </a>
                </NavItem>
              ))}
            </Box>

            {/* Mobile Navigation Menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <a href={page.url} target="_blank" rel="noopener noreferrer">
                    <Typography textAlign="center">{page.name}</Typography>
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
