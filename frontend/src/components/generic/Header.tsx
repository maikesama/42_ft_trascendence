import React, { useState, useEffect } from 'react';
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
import Grid from '@mui/material/Grid';
import "../css/Header.css"
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const pages = ['Home', 'Leaderboard', 'Profile', 'Chat'];
const settings = ['Logout'];

export function Header(props: any) {
  const location = useLocation();
  
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
        
        setUser(json);
      } catch (error) {
        
      }
    };

    fetchData();
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [notify, setNotify] = React.useState<null | HTMLElement>(null);

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

  const handleOpenNavNotify = (event: React.MouseEvent<HTMLElement>) => {
    setNotify(event.currentTarget);
  };

  const handleOpenUserNotify = (event: React.MouseEvent<HTMLElement>) => {
    setNotify(event.currentTarget);
  };

  const handleCloseNavNotify = () => {
    setNotify(null);
  };


  const handleCloseUserNotify = () => {
    setNotify(null);
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
    <>
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
                  style={{fontFamily: 'MyWebFont', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', marginTop: '60px'}}
                >
                  TRANSCENDENCE
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Box className="headerButtonsBox" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'space-around', marginBottom: '5rem' } }}>
                  {pages.map((page) => (
                    // <Link key={page} component={RouterLink} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
                    <Link key={page} component={RouterLink} to={`/${page}`} style={{ textDecoration: 'none', height: 'auto', color: 'white' }}>
                      {location.pathname === `/${page}` ? (
                      <Button
                        sx={{ mt: -2, color: 'violet', fontWeight: 'bold', xs: 'none', display: 'block', fontSize: 18, padding: 4 }}
                        className="selected"
                        style={{ backgroundColor: 'transparent', paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, top: '32px' }}
                        key={page}
                        onClick={handleCloseNavMenu}
                      >
                        {page}
                      </Button>
                      ) : (
                      <Button
                      sx={{ mt: -2, color: 'white', xs: 'none', display: 'block', fontSize: 18, padding: 4}}
                        className="headerButtons"
                        style={{ backgroundColor: 'transparent', paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, top: '32px'}}
                        key={page}
                        onClick={handleCloseNavMenu}
                      >
                        {page}
                      </Button>
                      )}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
            {/*------WEB & MOBILE (Settings 42 button) ------*/}
            <Box sx={{ display: 'inline-flex' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.img} style={{ width: 50, height: 50 }} />
                </IconButton>
              </Tooltip>

              {/* <Tooltip title="Open notify">
                <IconButton onClick={handleOpenUserNotify} sx={{ ml: 2, width: 50, height: 50 }}><NotificationsIcon></NotificationsIcon></IconButton>
              </Tooltip> */}
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

              {/*NOTIFICHE WEB E MOBILE */}

              {/* <Menu
                sx={{ mt: '45px', ml: '100px' }}
                id="menu-appbar"
                anchorEl={notify}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(notify)}
                onClose={handleCloseUserNotify}
              > */}
                {/* {notify.map((notify) => (
                  <MenuItem key={notify} onClick={handleCloseUserMenu} >
                    <Link href={notify.toLowerCase()} style={{ textDecoration: 'none', color: 'white' }}>
                      <Typography textAlign="center">{notify}</Typography>
                    </Link>

                  </MenuItem>
                ))} */}
                {/* <MenuItem  > */}
                {/* <Link style={{ textDecoration: 'none', color: 'white' }}>
                  <Typography textAlign="center">mpaci ti ha invitato</Typography>
                </Link> */}
                {/* </MenuItem> */}
              {/* </Menu> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>

   </>
  );
};
