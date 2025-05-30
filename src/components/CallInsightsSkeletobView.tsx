import { Box, Skeleton, Typography, Chip, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CallInsightsSkeletonView = () => {
  return (
    <Box sx={{ background: '#171717', minHeight: '100vh', p: { xs: 2, md: 2 } }}>
      {/* Candidate Info Card */}
      <Box sx={{ p: 4, borderRadius: 4, boxShadow: 6, mb: 4, position: 'relative', background: 'linear-gradient(135deg, #395A84 0%, #4C277F 100%)' }}>
        <Skeleton variant="text" width="40%" height={40} sx={{ bgcolor: 'grey.700', mb: 1 }} />
        <Skeleton variant="text" width="30%" height={28} sx={{ bgcolor: 'grey.700', mb: 2 }} />
        {[1, 2].map((_, i) => (
          <Skeleton key={i} variant="text" width="60%" height={24} sx={{ bgcolor: 'grey.700', mb: 1 }} />
        ))}
        <Skeleton variant="text" width="30%" height={24} sx={{ bgcolor: 'grey.700', mb: 2 }} />
        <Skeleton variant="text" width="90%" height={60} sx={{ bgcolor: 'grey.800' }} />
        <Skeleton variant="rectangular" width={100} height={32} sx={{ position: 'absolute', top: 24, right: 24, borderRadius: 2, bgcolor: 'grey.600' }} />
        <Skeleton variant="rectangular" width={100} height={36} sx={{ position: 'absolute', top: 74, right: 24, borderRadius: 2, bgcolor: 'grey.600' }} />
      </Box>

      {/* AI Short Rationale */}
      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, boxShadow: 6, mb: 4 }}>
        <Skeleton variant="text" width="30%" height={24} sx={{ bgcolor: 'grey.700', mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ bgcolor: 'grey.800' }} />
      </Box>

      {/* Question Details */}
      <Typography sx={{ fontSize: '20px', color: 'white', mb: 2 }}>Question Details:</Typography>
      <Box>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Accordion key={idx} sx={{ backgroundColor: '#261F53', color: 'white', boxShadow: 6, mb: 2, borderRadius: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: 'grey.700' }} />
                <Skeleton variant="rectangular" width={60} height={24} sx={{ bgcolor: 'grey.600', borderRadius: 2 }} />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: 'grey.700', mb: 1 }} />
              <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: 'grey.700' }} />
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ mt: 2, background: 'linear-gradient(135deg, #395A84 0%, #4C277F 100%)', p: 2, borderRadius: 1, mb: 4 }}>
          <Skeleton variant="text" width="30%" height={24} sx={{ bgcolor: 'grey.700' }} />
        </Box>
      </Box>

      {/* Candidate Notes */}
      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, boxShadow: 6, mb: 4 }}>
        <Skeleton variant="text" width="30%" height={24} sx={{ bgcolor: 'grey.700', mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ bgcolor: 'grey.800' }} />
      </Box>
    </Box>
  );
};

export default CallInsightsSkeletonView;