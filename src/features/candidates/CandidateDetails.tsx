import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GradientCard from '@/components/GradientCard';
import { useNavigate, useParams } from 'react-router-dom';
import scoreCard from '@/assets/scoreCard.png'
import { useAirtableContext } from '@/context/AirtableContext';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import DateRangeIcon from '@mui/icons-material/DateRange';
const candidate = {
  id: '1',
  name: 'Nahid Hasan',
  role: 'UX/UI Designer',
  phone: '+971 89 909 2134',
  email: 'sample@sample.com',
  linkedin: 'linkedurl.com',
  score: 800,
  languages: ['English', 'Arabic', 'French'],
  callInsights: {
    score: 800,
    status: 'finished',
    notes: 'LoremLoremLoremLorem LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLo remLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLo remLoremLoremLorem',
  },
  techSkills: [
    'AI/ML: PyTorch, TensorFlow, scikit-learn, Hugging Face Transformers, PyTorch Lightning',
    'LLMs & GenAI: Fine-tuning (LoRA/QLoRA), RAGs, multi-agent systems, open-source LLMs, prompt engineering',
    'MLOps & Deployment: MLflow, Airflow, Prometheus, Docker, Kubernetes, CI/CD pipelines',
    'Software Engineering: Python (advanced), C#, C++, Dart, JavaScript, FastAPI, Django, React.js, Next.js, .NET, Flutter',
    'Cloud Platforms: GCP Vertex AI, Azure ML Studio, Amazon SageMaker',
  ],
  softSkills: [
    'Cross-functional collaboration',
    'Agile delivery',
    'Communication with stakeholders',
    'Teamwork and independent work',
    'Problem-solving',
  ],
  experience: [
    'AI/ML Engineer | eData Information | June 2023 – present | Onsite | Dubai, UAE',
    '- Designed and deployed real-time AI valuation system for vehicles, built intelligent VIN decoding system, developed multi-agent AI systems and chatbots, led AI-powered scraping/data validation platform, fine-tuned LLMs, implemented RAG systems, managed MLOps pipelines, developed scalable backend services, delivered cloud-native AI solutions, automated model deployment, and collaborated with cross-functional teams.',
    'Software Engineer | Talal Tech | Feb 2022 – June 2023 | Remote | Medina, Saudi Arabia',
    '- Engineered scalable backend systems and APIs, excelled in Python backend development, contributed to full-stack development with React.js/Next.js, implemented CI/CD pipelines, and designed/testing frameworks.',
  ],
};

const CandidateDetails: React.FC = () => {
  const navigate = useNavigate();
  // const { state } = useAirtableContext();
  const {
    screeningRecords, phoneCallRecords
  } = useAirtableContext();
  const { name } = useParams();
  const [candidateDetails, setCandatdateDetails] = useState<any>()
  const [candidateCallDetails, setCandatdatCalleDetails] = useState<any>()

  useEffect(() => {
    console.log("name", name)
    if (!screeningRecords?.length) return;

    const candidateDetails = screeningRecords.filter((state) => state?.fields?.CandidateFileName == name)[0];
    console.log("candidateDetails", candidateDetails)
    setCandatdateDetails(candidateDetails)


  }, [screeningRecords, candidateDetails]);


  useEffect(() => {
    const phoneCallDetails = phoneCallRecords.filter((state) => state?.fields?.CandidateFileName == name)[0];
    console.log("phoneCallDetails", phoneCallDetails)
    setCandatdatCalleDetails(phoneCallDetails)
  }, [phoneCallRecords, candidateCallDetails])


  const handleIntiateCall = (event: any, airtable_id: any, canidateStatus: any) => {
    event?.stopPropagation()
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "brw=brwiMeamMoDgk2PG7; brwConsent=opt-in; AWSALBTG=zGcmiHtW0swgSl5qMiQm3A8YUCN+tgSVc26NjdSTLOhASizMIiZoRXU6Pu7pzF31Q11fV3iZXBIvhJx9fJAxZCYWS7UDIbFnUHA1I2Z0J4N4knHvf7qniBVcxcMCtowrpUB+OVe7Rc0WOava9wHlPW5931AndyeGA2f9t4pMj/bewcpEOOM=; AWSALBTGCORS=zGcmiHtW0swgSl5qMiQm3A8YUCN+tgSVc26NjdSTLOhASizMIiZoRXU6Pu7pzF31Q11fV3iZXBIvhJx9fJAxZCYWS7UDIbFnUHA1I2Z0J4N4knHvf7qniBVcxcMCtowrpUB+OVe7Rc0WOava9wHlPW5931AndyeGA2f9t4pMj/bewcpEOOM=");

    const raw = JSON.stringify({
      "records": [
        {
          "id": airtable_id,
          "fields": {
            "RecruiterApproval": canidateStatus
          }
        }
      ]
    });

    const requestOptions: any = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://api.airtable.com/v0/app6R5bTSGcKo2gmV/tblon8HRet4lsDOUe", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }


  return (
    <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 1 }, fontFamily: `'Montserrat', sans-serif` }}>
      {/* Top Row: Candidate Info and Call Insights */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <GradientCard gradient="linear-gradient(180deg, #336589 0%, #5545B9 100%)" sx={{ flex: 2, p: 1, borderRadius: 2, boxShadow: 6 }}>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 28, mb: 1 }}>{candidateDetails?.fields?.Name}</Typography>
          <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 20, mb: 2 }}>{candidateDetails?.fields?.Position}
          </Typography>
          <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhoneIcon sx={{ fontSize: 20, mr: 1 }} /> {candidateDetails?.fields?.CandidatePhone}
          </Box>
          <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <EmailIcon sx={{ fontSize: 20, mr: 1 }} /> {candidateDetails?.fields?.Email}

          </Box>

          <Box sx={{ color: 'white', opacity: 0.85, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <DateRangeIcon sx={{ fontSize: 20, mr: 1 }} /> {new Date(candidateDetails?.createdTime).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}


          </Box>

          <Box sx={{ color: 'white', opacity: 0.85, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={scoreCard} style={{ height: "20px", marginRight: "5px", verticalAlign: "middle" }} /> {candidateDetails?.fields?.FinalScore} / 1000
          </Box>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 18, mt: 2 }}>Role Fit: {candidateDetails?.fields?.RoleFit} / 10</Typography>
          {/* <Typography sx={{ color: 'white', opacity: 0.7, fontWeight: 400, fontSize: 16 }}></Typography> */}
          <Chip label={candidate.score} sx={{ position: 'absolute', top: 24, right: 24, background: '#23234f', color: 'white', fontWeight: 700, fontSize: 16, borderRadius: 2 }} />
        </GradientCard>
        <GradientCard gradient="linear-gradient(210deg, #336589 0%, #4C247E 100%)" sx={{ flex: 1, p: 1, borderRadius: 2, boxShadow: 6, position: 'relative' }}>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 24, mb: 1 }}>Call Insights</Typography>
          {candidateCallDetails && candidateCallDetails?.fields?.RecruiterApproval != "On Hold" ?
            <> <Chip label={candidate.callInsights.status} sx={{ position: 'absolute', top: 24, right: 24, background: '#3ad29f', color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />
              <Typography sx={{ color: 'white', opacity: 0.85, mb: 1, fontSize: 18, fontWeight: 700 }}>
                <img src={scoreCard} style={{ height: "20px", marginRight: "5px", verticalAlign: "middle" }} /> {candidateCallDetails?.fields?.
                  final_score
                } /1000
              </Typography>
              {/* <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16, mt: 2 }}>Final AI Short Rationale</Typography>
          <Typography sx={{ color: 'white', opacity: 0.85, fontWeight: 400, fontSize: 15, mt: 1, wordBreak: 'break-word', // ensures long words break into the next line
    whiteSpace: 'normal', }}>{candidateCallDetails?.fields?.Final_short_rationale}</Typography> */}
              {/* <Button onClick={() => navigate(`/candidates/${candidate.id}/call-insights`)}>View More</Button> */}
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  mt: 4,
                  fontSize: 15,
                  textTransform: 'none',
                  fontFamily: 'Montserrat',
                  '&:hover': { borderColor: '#a084e8', color: '#a084e8' },
                }}
                onClick={() => navigate(`/candidates/${name}/call-insights`)}
              >
                View Details
              </Button></> :

            // {candidateCallDetails?.RecruiterApproval}
            <Box> <Typography sx={{ fontWeight: 300, fontSize: 18, mb: 2 }}>No Call has been intiated. To intita ecall please click on belo button</Typography>
              <Button
                variant="contained"
                sx={{
                  background: 'white',
                  color: '#3a6ea5',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  fontSize: 15,
                  textTransform: 'none',
                  fontFamily: 'Montserrat',
                  '&:hover': {
                    background: '#e3e3e3',
                  },
                  '&.Mui-disabled': {
                    background: '#716F6F',
                    color: '#535353',
                    cursor: 'not-allowed',
                  },
                }}


                onClick={(event) => handleIntiateCall(event, candidateDetails.id, "Proceed")}
              >


                Initiate Call
              </Button>
            </Box>

          }

        </GradientCard>
      </Box>
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, mb: 4 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Profile Summary
        </Typography>
        {candidateDetails?.fields?.ProfileSummary

        }

      </Box>
      {/* Skills and Experience */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <Box sx={{ flex: 2, background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, position: "relative" }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Technical Skills</Typography>
          <Chip label={`AI Score:  ${candidateDetails?.fields?.Skills}`} sx={{ position: 'absolute', top: 24, right: 24, background: "linear-gradient(180deg, #336589 0%, #5545B9 100%)", color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />
          {/* <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>AI Score:{candidateDetails?.fields?.Skills} </Typography> */}
          {candidateDetails?.fields?.CV_Skills
          }
          {/* <ul style={{ margin: 0, paddingLeft: 20 }}>
            {candidate.techSkills.map((skill, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>{skill}</li>
            ))}
          </ul> */}
        </Box>
        <Box sx={{ flex: 1, background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Links</Typography>
          {candidateDetails?.fields?.Links
          }
          {/* <ul style={{ margin: 0, paddingLeft: 20 }}>
            {candidate.softSkills.map((skill, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>{skill}</li>
            ))}
          </ul> */}
        </Box>
      </Box>
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, color: 'white', boxShadow: 6, position: "relative" }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Experience</Typography>
        <Chip label={`AI Score:  ${candidateDetails?.fields?.
          Experience
          }`} sx={{ position: 'absolute', top: 24, right: 24, background: "linear-gradient(180deg, #336589 0%, #5545B9 100%)", color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />

        {candidateDetails?.fields?.CV_Experience
        }

      </Box>
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, mt: '30px', color: 'white', boxShadow: 6, position: "relative" }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Certificate</Typography>
        <Chip label={`AI Score:  ${candidateDetails?.fields?.Certificates}`} sx={{ position: 'absolute', top: 24, right: 24, background: "linear-gradient(180deg, #336589 0%, #5545B9 100%)", color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />

        {candidateDetails?.fields?.
          CV_Certificates

        }

      </Box>
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, mt: '30px', color: 'white', boxShadow: 6, position: "relative" }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Education</Typography>
        <Chip label={`AI Score:  ${candidateDetails?.fields?.Education}`} sx={{ position: 'absolute', top: 24, right: 24, background: "linear-gradient(180deg, #336589 0%, #5545B9 100%)", color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />

        {candidateDetails?.fields?.
          CV_Education


        }

      </Box>
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, mt: '30px', color: 'white', boxShadow: 6, position: "relative" }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Languages</Typography>
        {/* <Chip label={`AI Score:  ${candidateDetails?.fields?.Language}`} sx={{ position: 'absolute', top: 24, right: 24, background: "linear-gradient(180deg, #336589 0%, #5545B9 100%)", color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} /> */}

        {candidateDetails?.fields?.
          Languages



        }

      </Box>
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, mt: '30px', color: 'white', boxShadow: 6, position: "relative" }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Location</Typography>
        <Chip label={`AI Score:  ${candidateDetails?.fields?.Location}`} sx={{ position: 'absolute', top: 24, right: 24, background: "linear-gradient(180deg, #336589 0%, #5545B9 100%)", color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />

        {candidateDetails?.fields?.
          CV_Location



        }

      </Box>
      <Box sx={{ background: '#232323', borderRadius: 4, p: 4, mt: '30px', color: 'white', boxShadow: 6, position: "relative" }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Interests</Typography>
        <Chip label={`AI Score:  ${candidateDetails?.fields?.Interests}`} sx={{ position: 'absolute', top: 24, right: 24, background: "linear-gradient(180deg, #336589 0%, #5545B9 100%)", color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />

        {candidateDetails?.fields?.
          CV_Interests



        }

      </Box>
    </Box>
  );
};

export default CandidateDetails;