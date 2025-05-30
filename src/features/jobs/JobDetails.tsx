import React, { useEffect, useState, type ReactEventHandler } from 'react';
import { Box, Typography, Button, Chip, Tabs, Tab, Tooltip } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonIcon from '@mui/icons-material/Person';
import scoreCard from '@/assets/scoreCard.png'
import GradientCard from '@/components/GradientCard';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AirtableListener from './WebSocket';
import { useAirtableContext } from '@/context/AirtableContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Modal from '@mui/material/Modal';
import { useInfo } from '@/context/InfoToastContext';
import CandidateCVCardSkeleton from '@/components/CandidateCVSkeleton';

const JobDetails: React.FC = () => {


  const {
    screeningRecords,
  } = useAirtableContext();
  const [jobDetails, setJobDetails] = useState<any>({})
  const [candidateDetails, setCandidateDetails] = useState<any>([])

  const { jobId,jobName } = useParams();
  const fetchRecords = async () => {



    try {
      const response = await fetch(
        `https://api.airtable.com/v0/app6R5bTSGcKo2gmV/tblAz9PFQthvbxaHu/${jobId}`,
        {
          headers: {
            Authorization: `Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc`,// or hardcoded if local testing
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Map Airtable records into your desired format
      const jobs = {
        id: data.id,
        title: data.fields.Position || '',
        location: data.fields.Location?.join(' ') || '',
        Job_Description: data.fields.Job_Description || '',
        salary: data.fields.salary || '',
        Experience: data.fields.Experience || '',
        Onsite: data.fields['Onsite/Remote']?.join(' '),
        oneDriveFolderID: data.fields.oneDriveFolderID || '',
      }

      setJobDetails(jobs);
      fetchFiles(jobs?.oneDriveFolderID)
    } catch (err) {
      console.error('Error:', err);
      // setError(err?.message);
    }
  };

  //from aritable 
  const fetchAppliedCandaidates = async () => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/appeH3LWtVbw0DDIv/Candidates`,
        {
          headers: {
            Authorization: `Bearer pate5F34PFXKdUFUU.2849c608f23ec107a0cc07b3fc92c2031e37f1b28c68026d23475ddd9bb1d9ae`,// or hardcoded if local testing
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Map Airtable records into your desired format
      const details = data.records.map((data: any) => ({
        id: data.id,
        'Candidate Name': data.fields['Candidate Name'] || '',
        Email: data.fields.Email || '',
        Phone_Number: data.fields.Phone_Number || '',
        Experience: data.fields.Experience || '',
        Resume_URL: data.fields.Resume_URL || '',
      }))


      // setJobDetails(jobs);
      setCandidateDetails(details)
    } catch (err) {
      console.error('Error:', err);
      // setError(err?.message);
    }
  };

  //from drive
  const [candiateDetailsDrive, setCandatdateDetails] = useState<any>([])
  const [rejectedCandidateDetails, setRejectedCandidateDetails] = useState<any>([]);
  const [candidateStatusModi, setCandidateModi] = useState<any>()

  const [activeCandidateId, setActiveCandidateId] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setActiveCandidateId(id);
  };

  const handleClose = () => {
    setActiveCandidateId(null);
  };

  // const handleIntiateCall = (event: any, airtable_id: any, canidateStatus: any) => {
  //   event?.stopPropagation()
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc");
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Cookie", "brw=brwiMeamMoDgk2PG7; brwConsent=opt-in; AWSALBTG=zGcmiHtW0swgSl5qMiQm3A8YUCN+tgSVc26NjdSTLOhASizMIiZoRXU6Pu7pzF31Q11fV3iZXBIvhJx9fJAxZCYWS7UDIbFnUHA1I2Z0J4N4knHvf7qniBVcxcMCtowrpUB+OVe7Rc0WOava9wHlPW5931AndyeGA2f9t4pMj/bewcpEOOM=; AWSALBTGCORS=zGcmiHtW0swgSl5qMiQm3A8YUCN+tgSVc26NjdSTLOhASizMIiZoRXU6Pu7pzF31Q11fV3iZXBIvhJx9fJAxZCYWS7UDIbFnUHA1I2Z0J4N4knHvf7qniBVcxcMCtowrpUB+OVe7Rc0WOava9wHlPW5931AndyeGA2f9t4pMj/bewcpEOOM=");

  //   const raw = JSON.stringify({
  //     "records": [
  //       {
  //         "id": airtable_id,
  //         "fields": {
  //           "RecruiterApproval": canidateStatus
  //         }
  //       }
  //     ]
  //   });

  //   const requestOptions: any = {
  //     method: "PATCH",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow"
  //   };

  //   fetch("https://api.airtable.com/v0/app6R5bTSGcKo2gmV/tblon8HRet4lsDOUe", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));
  //   setCandidateModi(true)


  // }

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
  
    fetch("https://api.airtable.com/v0/app6R5bTSGcKo2gmV/tblon8HRet4lsDOUe", requestOptions)
      .then((response) => response.json())
      .then(() => {
        // Find the candidate from either list
        // const candidate =
        //   candiateDetailsDrive.find((c: any) => c.airtable_id === airtable_id) ||
        //   rejectedCandidateDetails.find((c: any) => c.airtable_id === airtable_id);

          const candidate = (({ RecruiterApproval, airtable_id, canidateName, finalScore, id, name, shortInfoAI, weburl }) =>
            ({ RecruiterApproval, airtable_id, canidateName, finalScore, id, name, shortInfoAI, weburl }))(
              candiateDetailsDrive.find((c: any) => c.airtable_id === airtable_id) ||
              rejectedCandidateDetails.find((c: any) => c.airtable_id === airtable_id)
            );

  
        if (!candidate) return;
  
        const updatedCandidate = { ...candidate, RecruiterApproval: canidateStatus };
        let updatedSelected;
        let updatedRejected
        // Update lists based on action
        if (canidateStatus === "Reject") {
         updatedSelected = candiateDetailsDrive.filter(
            (c:any) => c.airtable_id !== airtable_id
          );
          updatedRejected = [...rejectedCandidateDetails, updatedCandidate];
        
         
        } else if (canidateStatus === "On Hold" || canidateStatus === "Proceed") {
          updatedRejected = rejectedCandidateDetails.filter(
            (c:any) => c.airtable_id !== airtable_id
          );
          updatedSelected = [...candiateDetailsDrive.filter(
            (c:any) => c.airtable_id !== airtable_id
          ), updatedCandidate];
        
        
        }
        setCandatdateDetails(updatedSelected);
        setRejectedCandidateDetails(updatedRejected);
  
        // Optionally update candidateStatusModi if still needed for other effects
        setCandidateModi(true);
      })
      .catch((error) => console.error(error));
  };
  


const [ originalDriveFiles, setOneDriveFiles] = useState<any>([])
  const fetchFiles = async (oneDriveFolderID: any) => {
    try {
      //https://innova-recruiter-candidate.darkube.app
      const res: any = await axios.get(`https://innova-recruiter-web.darkube.app/api/list-files?folderId=${oneDriveFolderID}`); // Adjust base URL if needed
      const jobs = res.data?.files.map((record: any) => ({
        id: record.id,
        name: record.name || '',
        weburl: record.webUrl || '',
      }));

      setCandatdateDetails(jobs)
      console.log("fetchFiles",jobs)
      setOneDriveFiles(jobs)
      console.log("res", res)
    } catch (err) {
      console.error(err);
      // setError('Failed to fetch files');
    }
  };

  useEffect(() => {
    if (!screeningRecords?.length || !candiateDetailsDrive?.length) return;

    const airtableRecords = screeningRecords.filter((records) => records?.fields?.Position == jobName);
    const rejectedCandidatesSet = new Set<string>();

    const scoreMap: Record<string, number> = {};
    const recuiterApproval: Record<string, number> = {};
    const canidateNames: Record<string, number> = {};
    const shortRationale: Record<string, number> = {};
    const airtableIDMap: Record<string, string> = {};
    const rejectedCandidates: any[] = [];

    airtableRecords.forEach(record => {
      const name = record.fields?.CandidateFileName?.trim();
      const finalScore = record.fields?.FinalScore;
      const status = record.fields?.RecruiterApproval;
      const shortInfoAI = record.fields?.ShortRationale;
      const canidateName = record.fields?.Name;
      const ondeRdiveId = candiateDetailsDrive.filter((drive:any) => drive?.name == record.fields?.CandidateFileName)[0]?.id
      if (!name) return;

      if (status === "Reject") {
        rejectedCandidatesSet.add(name);
        rejectedCandidates.push({
          name,
          finalScore: finalScore ?? null,
          airtable_id: record.id,
          RecruiterApproval: status,
          canidateName:canidateName,
          shortInfoAI: shortInfoAI,
          id:ondeRdiveId
          // ...record.fields
        });
        return;
      }

      if (finalScore !== undefined) {
        scoreMap[name] = finalScore;
        recuiterApproval[name] = status;
        canidateNames[name] = canidateName;
        shortRationale[name] = shortInfoAI;
      }

      airtableIDMap[name] = record.id;
    });

    // Enrich only non-rejected candidates
    const enrichedCandidates = candiateDetailsDrive
      .filter((candidate: any) => !rejectedCandidatesSet.has(candidate.name.trim()))
      .map((candidate: any) => ({
        ...candidate,
        finalScore: scoreMap[candidate.name.trim()] ?? null,
        airtable_id: airtableIDMap[candidate.name.trim()] ?? null,
        RecruiterApproval: recuiterApproval[candidate.name.trim()] ?? null,
        canidateName: canidateNames[candidate.name.trim()] ?? null,
        shortInfoAI: shortRationale[candidate.name.trim()] ?? null,
      }));

    console.log("enrichedCandidates", enrichedCandidates);
    console.log("rejectedCandidates", rejectedCandidates);

    // Update main candidate details if changed
    setCandatdateDetails((prev: any) => {
      const isSame = JSON.stringify(prev) === JSON.stringify(enrichedCandidates);
      return isSame ? prev : enrichedCandidates;
    });

    // Update rejected candidates
    setRejectedCandidateDetails((prev: any) => {
      const isSame = JSON.stringify(prev) === JSON.stringify(rejectedCandidates);
      return isSame ? prev : rejectedCandidates;
    });

    console.log("state details", screeningRecords);
  }, [screeningRecords, candiateDetailsDrive, candidateStatusModi]);

const [ showLoadingDots, setShowLoadingDots] = useState(false)

  useEffect(() => {
    fetchRecords();
    fetchAppliedCandaidates()
    setShowLoadingDots(true)
    setTimeout(() => {
      setShowLoadingDots(false)
    },3000)
  }, []);

  const [tab, setTab] = React.useState(0);
  const navigate = useNavigate();
  return (
    <Box sx={{position:"relative", minHeight: '100vh'}}>
    {/* {showLoadingDots ? <LoadingDots /> :  */}
    <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 1 },  }}>
      {/* <AirtableListener /> */}
      <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 24, mb: 2 }}>
        <a href='/jobs/list' style={{ color: "white" }}>Jobs</a>  <span style={{ color: '#a084e8', fontWeight: 400 }}>/ {jobDetails.title}</span>
      </Typography>
      <Box sx={{ background: '#261F53', borderRadius: 4, p: 4, mb: 4, display: 'flex', flexDirection: 'column', position: 'relative', color: 'white', boxShadow: 6 }}>
        <Chip label={jobDetails?.Onsite} sx={{ position: 'absolute', top: 24, right: 24, background: '#F1E0FF', color: '#6300B3', fontWeight: 700, fontSize: 14, borderRadius: 1 }} />

        <Typography sx={{ fontSize: 19, mb: 2 }}>
          <span style={{ fontWeight: 400 }}>Job Description : </span>
          <InfoOutlinedIcon onClick={() => handleOpen("job Desc")} sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
          <Modal
            open={activeCandidateId === "job Desc"}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#bbb9c3',
              color: "#000000",
              px: 3,
              py: 3,
              boxShadow: 6,

              borderRadius: "20px",
              border: "1px solid #443e6a",
              '&:focus-within': {
                outline: 'none',
                boxShadow: 'none',
              },

            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Job Description:
              </Typography>
              <Typography id="modal-modal-description" sx={{
                mt: 2, fontSize: "16px", maxHeight: 400, letterSpacing: "0.5px", '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#7a5fff',
                  borderRadius: '4px',
                },
                // 🔹 limit modal height
                overflowY: 'auto',
              }}>
                {jobDetails.Job_Description}  </Typography>
            </Box>
          </Modal>

        </Typography>


      </Box>
      {showLoadingDots ?  

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 5, mt: 4 }}>
        { Array.from({ length: 3 }).map((_, idx) => <CandidateCVCardSkeleton key={idx} />)}
      </Box>
     
      :
      originalDriveFiles.length == 0 ? 
      <>
      <Box sx={{background:'linear-gradient(90deg, #336A87 0%, #4C257E 100%)',display:"flex",alignItems:"center",justifyContent:"center", width:"100%", height:"300px",px:2,py:2,borderRadius:6,color:"white",}}>No Candidate Applied this job</Box>
      </>: 
      <>
      
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 3, borderBottom: '1px solid #261F53', minHeight: 48 }}
        TabIndicatorProps={{ style: { background: '#9F31D9', height: 3 } }}
      >
        <Tab label={<span style={{ color: tab === 0 ? '#9F31D9' : 'white', fontWeight: 400, fontSize: 18 }}>Selected</span>} sx={{ minWidth: 120 }} />
        <Tab label={<span style={{ color: tab === 1 ? '#9F31D9' : 'white', fontWeight: 400, fontSize: 18 }}>Rejected</span>} sx={{ minWidth: 120 }} />
      </Tabs>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 5, mt: 2 }}>
      
        {(tab === 0 ? candiateDetailsDrive : rejectedCandidateDetails).map((candidate: any) => (
          <GradientCard
            key={candidate.id}
            gradient="linear-gradient(180deg, #36638E 0%, #4C247E 100%)"

            sx={{ borderRadius: 2, boxShadow: 6, p: 1, minWidth: 320, minHeight: 180, display: 'flex', cursor: "pointer", flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 20, mb: 1 }}>
                <PersonIcon sx={{ fontSize: 18, mr: 1, mb: -0.5 }} />{candidate.canidateName ? candidate.canidateName : candidate.name}
              </Typography>
              <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 14, mb: 1 }}>
                <FilePresentIcon sx={{ fontSize: 18, mr: 1, mb: -0.5 }} /><a href={candidate.weburl} target='_blank' style={{color:"white"}}>{candidate.name}</a>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', opacity: 0.85, mb: 1, fontSize: 15 }}>
                <WorkOutlineIcon sx={{ fontSize: 18, mr: 1 }} />
                {jobDetails.title}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', opacity: 0.85, fontSize: 15 }}>
                <img src={scoreCard} style={{ height: "20px", marginRight: "14px" }} />
                {/* {candidate.finalScore >= 0 ? candidate.finalScore : "NA"} */}
                AI Score: {candidate.finalScore !== null && candidate.finalScore !== undefined
                  ? candidate.finalScore
                  : "NA"} / 1000  <InfoOutlinedIcon onClick={() => handleOpen(candidate.id)} sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />

                <Modal
                  open={activeCandidateId === candidate.id}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#bbb9c3',
                    color: "#000000",
                    px: 3,
                    py: 3,
                    boxShadow: 6,

                    borderRadius: "20px",
                    border: "1px solid #443e6a",
                    '&:focus-within': {
                      outline: 'none',
                      boxShadow: 'none',
                    },

                  }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Short AI Rationale:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{
                      mt: 2, fontSize: "16px", maxHeight: 400, letterSpacing: "0.5px", '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#7a5fff',
                        borderRadius: '4px',
                      },
                      // 🔹 limit modal height
                      overflowY: 'auto',
                    }}>
                      {candidate.shortInfoAI}    </Typography>
                  </Box>
                </Modal>


              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>

              {tab === 0 ?
                <>
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
                    onClick={(event) => (event.stopPropagation(), navigate(`/candidates/${candidate.name}`))}
                  >
                    Details
                  </Button>
                    {screeningRecords?.length>0  && <Button
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
                    onClick={(event) => handleIntiateCall(event, candidate.airtable_id, "Reject")}
                  >
                    Reject
                  </Button>}
                  
                  
                   
                  {candidate?.RecruiterApproval == "Proceed" ?
                    <>   <Button
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
                     
                        '&:hover': {
                          background: '#e3e3e3',
                        },
                        '&.Mui-disabled': {
                          background: '#716F6F',
                          color: '#535353',
                          cursor: 'not-allowed',
                        },
                      }}
                      disabled={candidate.finalScore !== null && candidate.finalScore !== undefined
                        ? false
                        : true}

                      onClick={(event) => (event.stopPropagation(), navigate(`/candidates/${candidate.name}/call-insights`))}

                    >


                      View Call Details
                    </Button></> :
                    <> <Button
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
                       
                        '&:hover': {
                          background: '#e3e3e3',
                        },
                        '&.Mui-disabled': {
                          background: '#716F6F',
                          color: '#535353',
                          cursor: 'not-allowed',
                        },
                      }}
                      disabled={candidate.finalScore !== null && candidate.finalScore !== undefined
                        ? false
                        : true}

                      onClick={(event) => handleIntiateCall(event, candidate.airtable_id, "Proceed")}
                    >


                      Initiate Call
                    </Button></>}


                </> : <>  <Button
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
                   
                    '&:hover': {
                      background: '#e3e3e3',
                    },
                    '&.Mui-disabled': {
                      background: '#716F6F',
                      color: '#535353',
                      cursor: 'not-allowed',
                    },
                  }}
                  disabled={candidate.finalScore !== null && candidate.finalScore !== undefined
                    ? false
                    : true}

                  onClick={(event) => handleIntiateCall(event, candidate.airtable_id, "On Hold")}
                >


                  Select Candiate
                </Button>
                </>}
            </Box>
          </GradientCard>
        ))}
      </Box>
      </>
    }

      {} 
    </Box>
    {/* } */}
    </Box>
  );
};

export default JobDetails;