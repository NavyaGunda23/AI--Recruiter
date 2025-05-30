import { Box, Button, Chip, Skeleton, Typography } from '@mui/material';

const JobListSkeleton = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 6,
        p: 2,
        minWidth: 320,
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, #36638E 0%, #4C247E 100%)'
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <Skeleton variant="text" width="60%" height={28} sx={{ bgcolor: 'grey.700' }} />
        <Skeleton variant="text" width="50%" height={20} sx={{ bgcolor: 'grey.700' }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ bgcolor: 'grey.700' }} />
        <Skeleton variant="rectangular" width={80} height={30} sx={{ bgcolor: 'grey.600', borderRadius: 1, mb: 2 }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Skeleton variant="rectangular" width={110} height={36} sx={{ borderRadius: 2, bgcolor: 'grey.600' }} />
        <Skeleton variant="rectangular" width={140} height={36} sx={{ borderRadius: 2, bgcolor: 'grey.600' }} />
      </Box>
    </Box>
  );
};

export default JobListSkeleton;