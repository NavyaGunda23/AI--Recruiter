import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import GridViewIcon from '@mui/icons-material/GridView';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/authSlice';
import type { RootState } from '@/app/store';
import Innovasenslogo from "@/assets/innovasense.png"
import DashboardImg from "@/assets/dashboard.png"
import JobsImg from "@/assets/jobs.png"
import LogoutImg from '@/assets/logput.png'


const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <img src={DashboardImg} alt="Dashboard Icon" style={{ width: 24, height: 24 }} />, path: '/dashboard' },
  { text: 'Jobs', icon: <img src={JobsImg} alt="Jobs Icon" style={{ width: 24, height: 24 }} />, path: '/jobs/list' },
  // { text: 'Candidate Portal', icon: <PersonIcon sx={{ color: '#a084e8' }} />, path: '/candidates' },
];

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (!isSmUp) setMobileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ background: '#1F2039', height: '100%', color: 'white', fontFamily: `'Montserrat', sans-serif`,width:"90%" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 3, justifyContent: 'flex-start' }}>
        {/* Company Logo and Name */}
        <img src={Innovasenslogo} alt="Innovasense Logo" style={{  height: 20, marginRight: 10 }} />
       
      </Box>
     
      <List >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={item.text === 'Jobs' ? (location.pathname.startsWith('/jobs/') || location.pathname.startsWith('/candidates/')) : location.pathname.startsWith(item.path)}
            onClick={() => handleMenuClick(item.path)}
            sx={{
              '&.Mui-selected': {
                background: 'rgba(52,96,137,0.3)',
                color: 'white',
                borderRadius:"0 10px 50px 0px",
                borderLeft: '4px solid #3a6ea5',
               
              },
              '&:hover': {
                background: 'rgba(52,96,137,0.3)',
                color: 'white',
                borderRadius:"0 10px 50px 0px",
                borderLeft: '4px solid #3a6ea5',
              },
           
              m:0,
              borderLeft: '4px solid #1F2039',
              p: 1.5,
            }}
          >
            <ListItemIcon sx={{ color: location.pathname.startsWith(item.path) ? '#a084e8' : 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ fontWeight: location.pathname.startsWith(item.path) ? 700 : 400 }} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <Button
          variant="text"
          color="inherit"
          fullWidth
          startIcon={<img src={LogoutImg} alt="Logout Icon" style={{ width: 24, height: 24 }} />}
          onClick={handleLogout}
          sx={{
            justifyContent: 'flex-start',
            fontWeight: 700,
            fontSize: 16,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            borderRadius: 2,
            mx: 1,
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth },backgroundColor:"#261F53", flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant={isSmUp ? 'permanent' : 'temporary'}
          open={isSmUp ? true : mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: '#1F2039',
              color: 'white',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
         
          background: '#171717',
          minHeight: '100vh',
        }}
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default MainLayout;