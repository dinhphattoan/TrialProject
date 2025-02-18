import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import PasswordIcon from '@mui/icons-material/Password';
const pages = ['Products', 'Pricing', 'Blog'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [isLoadingLogIn, setIsLoadingLogIn] = React.useState<boolean>(false);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const checkIsLoggedIn = async () => {
        try {
            const token = localStorage.getItem('jwt');

            if (!token) {

                return false;
            }

            const response = await fetch('/api/Accounts/authenticated', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('jwt');
                    return false;
                }
                if (response.status === 400) {
                    console.log("Bad Request:", response.status, response.statusText);
                    return false;
                }
                console.error("Server error:", response.status, response.statusText);
                return false;
            }

            const data = await response.json();

            if (data.isLoggedIn) {
                setUsername(data.username);
                return true;
            }
            return false;

        } catch (error) {
            return false;
        }
    };
    const checkLoginStatus = async () => {
        setIsLoggedIn(false);
        setIsLoadingLogIn(true);
        const loggedIn: boolean = await checkIsLoggedIn();
        setIsLoadingLogIn(false);
        setIsLoggedIn(loggedIn);

    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleLogin = async () => {
        const response = await fetch('/api/Accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("jwt", data.token);
            console.log('Login successful:', data);
        } else {
            // Handle login failure
            console.error('Login failed');
        }
        checkLoginStatus();
    };
    React.useEffect(() => {
        checkLoginStatus();
    }, [])
    const isLoggedInContent = isLoadingLogIn ? (<div>Loading...</div>) :
        isLoggedIn ? (<Box sx={{ flexGrow: 0, display: 'flex', flexDirections: 'column', alignItems: 'center' }}>
        <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                sx={{
                    fontSize: '20px',
                } }
        >
                <AccountCircle />
                {" "}
                {username}
        </IconButton>
    </Box>
    ) :
        (<Box sx={{ flexGrow: 0, display: 'flex', flexDirections: 'column', alignItems: 'center' }}>
            <FormControl sx={{ mr: 0.1 }}>
                <Input
                    id="input-username"
                    sx={{
                        verticalAlign: 'center',
                        fontSize: '0.8rem',
                        padding: '2px',
                        height: '25px',
                        width: '170px'
                    }}
                    aria-describedby="username-helper-text"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    placeholder='Username'
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                />
            </FormControl>
            <FormControl sx={{ mr: 0.1 }}>
                <Input
                    type='password'
                    id="input-password"
                    aria-describedby="username-helper-text"
                    sx={{
                        verticalAlign: 'center',
                        fontSize: '0.8rem',
                        padding: '2px',
                        height: '25px',
                        width: '170px'
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <PasswordIcon />
                        </InputAdornment>
                    }
                    placeholder='Password'
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </FormControl>
            <FormControl>
                <Button
                    variant="contained"
                    sx={{
                        margin: '5px',
                        width: '50px',
                        height: '30px'
                    }}
                    onClick={handleLogin}
                >Login</Button>
            </FormControl>

        </Box>)

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Weather
                    </Typography>

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
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    {isLoggedInContent}

                </Toolbar>
            </Container>
        </AppBar>
    );
}

function Header() {
    return (
        <header >
            <ResponsiveAppBar />
        </header>
    );
}

export default Header;
