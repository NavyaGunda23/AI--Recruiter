import { Box, Skeleton, Typography, Chip, Button } from '@mui/material';

const CandidateDetailSkeleton = () => {
  return (
    <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 1 } }}>
      {/* Top Cards */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <Box sx={{ flex: 2, p: 2, borderRadius: 2, boxShadow: 6, background: 'linear-gradient(180deg, #336589 0%, #5545B9 100%)' }}>
          <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: 'grey.700', mb: 1 }} />
          <Skeleton variant="text" width="40%" height={28} sx={{ bgcolor: 'grey.700', mb: 2 }} />
          {[1, 2, 3, 4].map((_, i) => (
            <Skeleton key={i} variant="text" width="80%" height={24} sx={{ bgcolor: 'grey.700', mb: 1 }} />
          ))}
          <Skeleton variant="text" width="50%" height={24} sx={{ bgcolor: 'grey.700', mt: 2 }} />
        </Box>

        <Box sx={{ flex: 1, p: 2, borderRadius: 2, boxShadow: 6, background: 'linear-gradient(210deg, #336589 0%, #4C247E 100%)' }}>
          <Skeleton variant="text" width="50%" height={30} sx={{ bgcolor: 'grey.700', mb: 2 }} />
          <Skeleton variant="text" width="60%" height={24} sx={{ bgcolor: 'grey.700', mb: 2 }} />
          <Skeleton variant="rectangular" width={120} height={36} sx={{ bgcolor: 'grey.600' }} />
        </Box>
      </Box>

      {/* Summary Card */}
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, mb: 4 }}>
        <Skeleton variant="text" width="30%" height={28} sx={{ bgcolor: 'grey.700', mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ bgcolor: 'grey.800' }} />
      </Box>

      {/* Skills & Links */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <Box sx={{ flex: 2, background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6 }}>
          <Skeleton variant="text" width="40%" height={28} sx={{ bgcolor: 'grey.700', mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ bgcolor: 'grey.800' }} />
        </Box>
        <Box sx={{ flex: 1, background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6 }}>
          <Skeleton variant="text" width="30%" height={28} sx={{ bgcolor: 'grey.700', mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ bgcolor: 'grey.800' }} />
        </Box>
      </Box>

      {/* Other Sections */}
      {["Experience", "Certificate", "Education", "Languages", "Location", "Interests"].map((title, i) => (
        <Box key={i} sx={{ background: '#232323', borderRadius: 4, p: 4, mt: '30px', color: 'white', boxShadow: 6 }}>
          <Skeleton variant="text" width="30%" height={28} sx={{ bgcolor: 'grey.700', mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={80} sx={{ bgcolor: 'grey.800' }} />
        </Box>
      ))}
    </Box>
  );
};

export default CandidateDetailSkeleton;
