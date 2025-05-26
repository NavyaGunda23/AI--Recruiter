import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  InputAdornment
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/app/authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/app/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import aiAvatar from '@/assets/ai-avatar.png';
import Grid from '@mui/material/Grid';
import bg from '@/assets/bg.png';


const validationSchema = Yup.object({
  organization: Yup.string().required('Organization is required'),
  username: Yup.string().required('Username is required'),
});

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const formik = useFormik({
    initialValues: {
      organization: '',
      username: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(230deg, #52D8DB 0%, #24205D 100%)',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img src={bg} style={{position:"absolute",backgroundSize:"contain",width:"100%",height:"100%"}}/>
      <Grid container sx={{ height: '100vh', width: '100vw',justifyContent:"space-around" }}>
        {/* Left: Login Form */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'transparent' }}>
          <Box sx={{ width: '100%', maxWidth: 420, px: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={aiAvatar} sx={{ width: 160, height: 160, mb: 6, borderRadius:0, bgcolor: 'transparent' }} />
            <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
              <TextField
                fullWidth
                id="organization"
                name="organization"
                // label="ORGINAZATION"
                placeholder="ORGINAZATION"
                margin="normal"
                value={formik.values.organization}
                onChange={formik.handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'white', borderColor: 'white' },
                }}
                InputLabelProps={{ style: { color: 'white', fontWeight: 500, letterSpacing: 1 } }}
                sx={{
                  mb: 3,
                  background: 'transparent',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
              <TextField
                fullWidth
                id="username"
                name="username"
                // label="USERNAME"
                placeholder="USERNAME"
                margin="normal"
                value={formik.values.username}
                onChange={formik.handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'white', borderColor: 'white' },
                }}
                InputLabelProps={{ style: { color: 'white', fontWeight: 500, letterSpacing: 1 } }}
                sx={{
                  mb: 5,
                  background: 'transparent',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  mt: 2,
                  py: 2,
                  fontWeight: 700,
                  fontSize: 20,
                  borderRadius: 2,
                  background: 'white',
                  color: '#1976d2',
                  boxShadow: 2,
                  letterSpacing: 2,
                  '&:hover': {
                    background: '#e3e3e3',
                  },
                }}
              >
                LOGIN
              </Button>
            </form>
          </Box>
        </Grid>
        {/* Right: Welcome Section */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', pl: { md: 10, xs: 4 }, background: 'transparent', position: 'relative' }}>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, mb: 2, fontSize: { xs: 36, md: 72 }, lineHeight: 1.1 }}>
            Welcome.
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', opacity: 0.85, maxWidth: 500, fontWeight: 400, fontSize: { xs: 16, md: 22 }, letterSpacing: 1.5 }}>
            OUR RECUTMENT AI AGENT DON'T SLEEP, SLACK , NO SICK LEAVE AND WORKS 24HRS
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;