import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, LinearProgress } from '@mui/material';
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
import { useSuccess } from '@/context/SuccessToastContext';


const CallInsightView: React.FC = () => {
  const { id } = useParams();
  const { showSuccessToast} = useSuccess()
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

    const getMaxScore = (index: number): number => {
      if (index < 3) return 150;      // Questions 1–3 (index 0–2)
      if (index < 8) return 100;      // Questions 4–8 (index 3–7)
      return 50;                      // Question 9 (index 8+)
    };

    const handleIntiateCall = (event: any, airtable_id: any, canidateStatus: any) => {
      event?.stopPropagation();
    
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc");
      myHeaders.append("Content-Type", "application/json");
    
      const raw = JSON.stringify({
        records: [
          {
            id: airtable_id,
            fields: {
              RecruiterApproval: canidateStatus,
            },
          },
        ],
      });
    
      const requestOptions: any = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
    
      fetch("https://api.airtable.com/v0/app6R5bTSGcKo2gmV/tblcdsocb7LuTWZ1B", requestOptions)
        .then((response) => response.json())
        showSuccessToast("You have Rejected the Candidate")

    }

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
        <Box sx={{
           position: 'absolute', top: 74, right: 24,display:"flex",gap:2
        }}>
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
        <Button
                            variant="outlined"
                            sx={{
                              color: 'white',
                              borderColor: 'white',
                              
                              fontWeight: 700,
                              borderRadius: 2,
                              px: 2.5,
                              py: 1,
                              fontSize: 15,
                              textTransform: 'none',
                             
                              '&:hover': { borderColor: '#a084e8', color: '#a084e8' },
                            }}
                            onClick={(event) => handleIntiateCall(event, candidateCallDetails.id, "Reject")}
                          >
                            Reject
                          </Button>
        </Box>
    
      </GradientCard>

      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, mb: 4 }}>
      <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16, }}>AI Short Rationale :</Typography>
        <Typography sx={{ color: 'white', opacity: 0.85, fontWeight: 400, fontSize: 15, mt: 1 }}>{candidateCallDetails?.fields?.
Final_short_rationale
}</Typography>
      </Box>
  
      <Typography sx={{fontSize:"20px",color:"white",mb:2}}>Question Details:</Typography>
      <Box >
      {questionEntries?.map((row: any, idx: number) => {  const maxScore = getMaxScore(idx);
  const percentage = (row.score / maxScore) * 100;
  const isLastItem = idx < questionEntries.length - 2; // hide for last 2 questions

return (
        <Accordion key={idx} sx={{ backgroundColor: '#261F53', color: 'white', boxShadow: 6, mb: 2, borderRadius: 1, p: 0, }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
          <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}>
          <Typography fontWeight={400} sx={{lineHeight:"30px"}}>
              Question {idx + 1}
              
            </Typography>

{isLastItem  && (

<Box sx={{  position: 'relative',display:"flex",flexDirection:"row",alignItems:"center" }}>
<Typography
variant="caption"
sx={{
  position: 'relative',
  top: 0,
  left: 0,
  width: 'max-content',
  textAlign: 'center',
  color: 'white',
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: '12px',
}}
>
Score: {row.score}/{maxScore} : 
</Typography>
<LinearProgress
variant="determinate"
value={percentage}
sx={{
  height: 25,
  borderRadius: 5,
  ml:"10px",
  backgroundColor:'#1f2039' ,
  width:"200px",
  '& .MuiLinearProgress-bar': {
    background: 'linear-gradient(135deg, #395A84 0%, #4C277F 100%)',
  },
}}
/>

</Box>
)}

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
      )})}

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