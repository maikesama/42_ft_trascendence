import React, { Fragment, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Grid from '@mui/material/Grid';
import "../css/Header.css"

import 'bootstrap/dist/css/bootstrap.min.css';

const pages = ['Home', 'Leaderboard', 'Profile', 'Chat'];
const settings = ['Logout'];

export function Header(props: any) {

  const [user, setUser] = useState({} as any);

  async function logout()
  {
    handleCloseUserMenu();
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/auth/logout`;
    window.location.replace(url);
  }

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/me`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json = await response.json();
        console.log(json);
        setUser(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/*-----------------MOBILE-----------------*/}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
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
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h4"
              fontSize="25px"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'MyWebFont',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TRANSCENDENCE
            </Typography>
            {/*-----------------WEB-----------------*/}
            <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid item md={12}>
                <Typography
                  className="animateChar"
                  variant="h4"
                  fontSize="35px"
                  noWrap
                  sx={{
                    mt: 10,
                    display: { xs: 'none', md: 'block' },
                    flexGrow: 1,
                    fontFamily: 'MyWebFont',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  TRANSCENDENCE
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Box className="headerButtonsBox" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'space-around' } }}>
                  {pages.map((page) => (
                    // <Link key={page} component={RouterLink} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
                    <Link key={page} component={RouterLink} to={`/${page}`}>
                      <Button
                        className="headerButtons"
                        style={{ backgroundColor: 'transparent' }}
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ mt: -2, color: 'white', xs: 'none', display: 'block', fontSize: 18, padding: 4 }}
                      >
                        {page}
                      </Button>
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
            {/*------WEB & MOBILE (Settings 42 button) ------*/}
            <Box sx={{ display: 'inline-flex' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.img} sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu} >
                    <Link href={setting.toLowerCase()} style={{ textDecoration: 'none', color: 'white' }}>
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>
                  </MenuItem>
                ))}

              </Menu>
              <Tooltip title="Open notify">
                <IconButton onClick={handleOpenUserMenu} sx={{ ml: 2, width: 50, height: 50 }}><NotificationsIcon></NotificationsIcon></IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu} >
                    <Link href={setting.toLowerCase()} style={{ textDecoration: 'none', color: 'white' }}>
                      <Typography textAlign="center">{setting}</Typography>
                    </Link>

                  </MenuItem>
                ))} */}
                <MenuItem onClick={logout} >
                <Link style={{ textDecoration: 'none', color: 'white' }}>
                  <Typography textAlign="center">Logout</Typography>
                </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
