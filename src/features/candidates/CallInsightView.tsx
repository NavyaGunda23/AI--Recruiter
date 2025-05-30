import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useParams } from 'react-router-dom';
import GradientCard from '@/components/GradientCard';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { useAirtableContext } from '@/context/AirtableContext';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CallInsightsSkeletonView from '@/components/CallInsightsSkeletobView';


const CallInsightView: React.FC = () => {
  const { id } = useParams();
   const {
        screeningRecords, phoneCallRecords
      } = useAirtableContext();
    const [ candidateCallDetails, setCandatdatCalleDetails] = useState<any>()

    const [ questionEntries, setQuestionEntires] = useState<any>()
    useEffect(() => {
      console.log("phoneCallDetails", phoneCallRecords, id);
      const phoneCallDetails = phoneCallRecords.filter((state) => state?.fields?.CandidateFileName == id);
      console.log("phoneCallDetails", {...phoneCallDetails[0]});
      const data:any = {...phoneCallDetails[0]};
      if(data?.fields){
        const fields = data?.fields || {};

        const questionEntriesData = Object.entries(fields)
          .filter(([key]) => key.endsWith('_Question'))
          .map(([key, questionValue]) => {
            const baseKey = key.replace('_Question', '');
            return {
              question: questionValue,
              answer: fields[`${baseKey}_Answer`] || '',
              score: fields[`${baseKey}_Score`] ?? null,
            };
          });
        
        console.log(questionEntriesData);
        // console.log("questionEntriesData",questionEntriesData)
        setQuestionEntires(questionEntriesData)
      }
   
      setCandatdatCalleDetails(data);
    }, [phoneCallRecords, id]); // ✅ removed candidateCallDetails
    
    // useEffect(() => {

    // },[candidateCallDetails])


  // In real app, fetch insights from Airtable by candidate id


  const [ showLoading, setShowLoaidng ] = useState(false)
    useEffect(() =>{
      setShowLoaidng(true)
      setTimeout(() => {
        setShowLoaidng(false)
      },3000)
    },[])


  return (
    <>
    {showLoading  ?  <CallInsightsSkeletonView /> :
   
    <Box sx={{ background: '#171717', minHeight: '100vh', p: { xs: 2, md: 2 },  }}>
      {/* Candidate Info Card */}
      <GradientCard gradient="linear-gradient(135deg, #395A84 0%, #4C277F 100%)" sx={{ p: 4, borderRadius: 4, boxShadow: 6, mb: 4, position: 'relative' }}>
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 28, mb: 1 }}>{candidateCallDetails?.fields?.Name}</Typography>
        <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 20, mb: 2 }}>{candidateCallDetails?.fields?.Position}</Typography>
        <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhoneIcon sx={{ fontSize: 20 }} /> {candidateCallDetails?.fields?.CandidatePhone
          }
        </Box>
        <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <DateRangeIcon sx={{ fontSize: 20, mr: 1 }} /> {new Date(candidateCallDetails?.fields?.CreationDate).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}

            
          </Box>
        {/* <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ fontSize: 20 }} /> {candidate.email}
        </Box> */}
       
        <Typography sx={{ color: 'white', opacity: 0.85, mb: 1, fontSize: 18, fontWeight: 700 }}>Score: {candidateCallDetails?.fields?.final_score} / 1000</Typography>
      
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16, mt: 2 }}>Recruiter Notes :</Typography>
        <Typography sx={{ color: 'white', opacity: 0.85, fontWeight: 400, fontSize: 15, mt: 1 }}>{candidateCallDetails?.fields?.
RecruiterNotes
}</Typography>
        <Chip label={candidateCallDetails?.fields?.CallStatus}sx={{ position: 'absolute', top: 24, right: 24, background: '#177E00', color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />
        <Button
          variant="contained"
          sx={{
            background: '#385F8D',
            color: 'white',
            fontWeight: 400,
            borderRadius: 6,
            px: 2,
            py: 1,
            fontSize: 18,
            textTransform: 'none',
          
            position: 'absolute', top: 74, right: 24,
            boxShadow: 2,
            '&:hover': { background: '#385F8D', },
            '&.Mui-disabled': {
      background: '#716F6F',
      color: '#535353',
      cursor: 'not-allowed',
    },
          }}
          disabled
        >
          Approve
        </Button>
      </GradientCard>

      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, mb: 4 }}>
      <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16, }}>AI Short Rationale :</Typography>
        <Typography sx={{ color: 'white', opacity: 0.85, fontWeight: 400, fontSize: 15, mt: 1 }}>{candidateCallDetails?.fields?.
Final_short_rationale
}</Typography>
      </Box>
  
      <Typography sx={{fontSize:"20px",color:"white",mb:2}}>Question Details:</Typography>
      <Box >
      {questionEntries?.map((row: any, idx: number) => (
        <Accordion key={idx} sx={{ backgroundColor: '#261F53', color: 'white', boxShadow: 6, mb: 2, borderRadius: 1, p: 0, }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
          <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}>
          <Typography fontWeight={400} sx={{lineHeight:"30px"}}>
              Question {idx + 1}
              
            </Typography>
            <Chip label={`Score`+row.score} sx={{  background: 'linear-gradient(135deg, #395A84 0%, #4C277F 100%)', color: 'white', fontWeight: 400, fontSize: 12, borderRadius: 2 }} />

          </Box>
            
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ opacity: 0.85, mb: 1 }}>
              <strong>Question:</strong> {row.question}
            </Typography>
            <Typography sx={{ opacity: 0.85 }}>
              <strong>Answer:</strong> {row.answer}
             
            </Typography>
            {/* Uncomment this if you want to include comments */}
            {/* <Typography sx={{ opacity: 0.85, mt: 1 }}>
              <strong>Comments:</strong> {row.comments}
            </Typography> */}
           
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mt: 2, background: 'linear-gradient(135deg, #395A84 0%, #4C277F 100%)', p: 2, borderRadius: 1,mb:4 }}>
        <Typography fontWeight={700} fontSize={16} color="white" align='right'>
          TOTAL SCORE: {candidateCallDetails?.fields?.final_score}
        </Typography>
      </Box>
    </Box>

      {/* Candidate Notes */}
      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, mb: 4 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Candidate Notes :</Typography>
        <Typography sx={{ color: 'white', opacity: 0.85, fontWeight: 400, fontSize: 15 }}>{candidateCallDetails?.fields?.CandidateNotes

          }</Typography>
      </Box>

      {/* Approve Button */}
      <Box sx={{ display: 'flex', }}>
       
      </Box>
    </Box> }
    </>
  );
};

export default CallInsightView;