import { Box, Skeleton, Typography, Button } from '@mui/material';

const CandidateCVCardSkeleton = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 6,
        p: 2,
        minWidth: 320,
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, #36638E 0%, #4C247E 100%)',
      }}
    >
      <Box>
        <Typography sx={{ mb: 1 }}>
          <Skeleton variant="text" width="70%" sx={{ bgcolor: 'grey.700' }} />
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <Skeleton variant="text" width="80%" sx={{ bgcolor: 'grey.700' }} />
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Skeleton variant="text" width="60%" sx={{ bgcolor: 'grey.700' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="rectangular" width={24} height={24} sx={{ mr: 1, bgcolor: 'grey.700' }} />
          <Skeleton variant="text" width="40%" sx={{ bgcolor: 'grey.700' }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
        <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2, bgcolor: 'grey.600' }} />
        <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2, bgcolor: 'grey.600' }} />
        <Skeleton variant="rectangular" width={140} height={36} sx={{ borderRadius: 2, bgcolor: 'grey.600' }} />
      </Box>
    </Box>
  );
};

export default CandidateCVCardSkeleton;
