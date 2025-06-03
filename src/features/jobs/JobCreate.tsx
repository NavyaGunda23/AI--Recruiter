import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, InputAdornment, MenuItem, Select, OutlinedInput, Chip, TextField as MuiTextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import type { SelectChangeEvent } from '@mui/material';
import type { FieldProps } from 'formik';
import { createFolderInSharedFolder } from '@/createFolderInSharedFolder';
import { useSuccess } from '@/context/SuccessToastContext';
import VapiVoiceChat from '@/components/VapiVoiceChat';
import { useAirtableContext } from '@/context/AirtableContext';


interface JobFormValues {
  Position: string;
  Job_Description: string;
  Experience: number;
  Location: string[];
  'Onsite/Remote': string[];
  Language: string[];
  Salary: string;
  Recruiter_Email_Address: string;
  Recruiter_Name: string;
}

const JobSchema = Yup.object().shape({
  Position: Yup.string().required('Required'),
  Job_Description: Yup.string().required('Required'),
  Experience: Yup.number().required('Required').min(0),
  Location: Yup.array().of(Yup.string()).min(1, 'Select at least one location'),
  'Onsite/Remote': Yup.array().of(Yup.string()).min(1, 'Select at least one'),
  Language: Yup.array().of(Yup.string()).min(1, 'Select at least one language'),
  Salary: Yup.string().required('Required'),
  Recruiter_Email_Address: Yup.string().email('Invalid email').required('Required'),
  Recruiter_Name: Yup.string().required('Required'),
});

const initialValues = {
  Position: '',
  Job_Description: '',
  Experience: 1,
  Location: [],
  'Onsite/Remote': [],
  Language: [],
  Salary: '',
  Recruiter_Email_Address: '',
  Recruiter_Name: '',
  // submittedAt: '',
  // formMode: 'create' as 'create' | 'edit',
};

const gradientInputSx = {
  background: 'linear-gradient(90deg, #336A87 0%, #4C257E 100%)',
  color: 'white',
  borderRadius: 2,
  border: 'none',
  fontWeight: 400,
  fontSize: 16,
  width:"100%",
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  
  '& .MuiInputBase-input': {
    color: 'white',
  },
  
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiSelect-icon': {
    color: 'white',
  },
  '& .MuiChip-root': {
    background: '#2d2363',
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 2,
  },
};

const JobCreate: React.FC = () => {
  const navigate = useNavigate();
  const locations = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman','Umm Al Quwain','Ras Al Khaimah', 'Fujairah'];
  const onsiteRemote = ['Onsite', 'Remote', 'Hybrid'];
  const languages = [ 'English', 'Arabic'];
 
 const { showSuccessToast } = useSuccess();
 const { createPosition} = useAirtableContext()
 const [ intailCalues, setIntailValues] = useState(initialValues)


 const getInitialValues = (position: any): JobFormValues => {
  return {
    Position: position?.Position || '',
    Job_Description: position?.Job_Description || '',
    Experience: position?.Experience || 1,
    Location: Array.isArray(position?.Location)
      ? position.Location
      : typeof position?.Location === 'string'
      ? position.Location.split(',').map((item: string) => item.trim())
      : [],
    'Onsite/Remote': Array.isArray(position?.['Onsite/Remote'])
      ? position['Onsite/Remote']
      : typeof position?.['Onsite/Remote'] === 'string'
      ? position['Onsite/Remote'].split(',').map((item: string) => item.trim())
      : [],
    Language: Array.isArray(position?.Language)
      ? position.Language
      : typeof position?.Language === 'string'
      ? position.Language.split(',').map((item: string) => item.trim())
      : [],
    Salary: position?.Salary || '',
    Recruiter_Email_Address: position?.Recruiter_Email_Address || '',
    Recruiter_Name: position?.Recruiter_Name || '',
  };
};

const [formValues, setFormValues] = useState<JobFormValues>(initialValues);

const [ vocieActive, setVoiceActive] = useState<Boolean>(false)




const fetchRecords = async () => {
  try {
    const response = await fetch(
      'https://api.airtable.com/v0/app6R5bTSGcKo2gmV/tblc4r88rUh95DHfZ',
      {
        headers: {
          Authorization: `Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc` ,// or hardcoded if local testing
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json().then((response) => {
      const recordId = response?.records[0]?.id


      const raw = JSON.stringify({
        records: [
          {
            id: recordId,
            fields: {
              Position: '',
              Job_Description: '',
              Experience: 0, // Use 0 instead of null
              Location: [], // Must be array if it's a multi-select or linked field
              'Onsite/Remote': [],
              Language: [],
              Salary: '',
            
            },
          },
        ],
      });
    
      const requestOptions: any = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc` ,// or hardcoded if local testing
          'Content-Type': 'application/json'
        },
        body: raw,
        redirect: "follow",
      };
  
      fetch("https://api.airtable.com/v0/app6R5bTSGcKo2gmV/tblc4r88rUh95DHfZ", requestOptions)
      .then((response) => response.json())
  
     console.log(data)
    })
 
  } catch (err) {
    console.error('Error:', err);
    // setError(err?.message);
  }
};


const handleVapiChatClick = (active: boolean) => {
  fetchRecords()
  setTimeout(() => {
    setVoiceActive(active);
    if (active && createPosition[0]?.fields) {
      const updatedValues = getInitialValues(createPosition[0].fields);
      setFormValues(updatedValues);
    }
  },5000)
 
}; useEffect(() => {
  if (vocieActive && createPosition.length > 0 && createPosition[0]?.fields) {
    const timer = setTimeout(() => {
      const updatedValues = getInitialValues(createPosition[0].fields);
      setFormValues(updatedValues);
    }, 5000); // adjust delay as needed (not 30000 = 30s!)

    return () => clearTimeout(timer);
  }
}, [createPosition, vocieActive]);


useEffect(() =>{
  console.log("intailCalues",intailCalues)
},[intailCalues])
  return (
    <Box sx={{  minHeight: '100vh', p: { xs: 2, md: 1 },  }}>
      <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 20, mb: 4, }}>
        Create a New job
      </Typography>
      <Formik<JobFormValues>
      enableReinitialize
        initialValues={formValues}
        validationSchema={JobSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const folderName = values?.Position
          try {
            const res:any = await axios.post("https://sharepoint-api-recruiter.wonderfulmoss-ad1f6e96.uaenorth.azurecontainerapps.io/api/create-folder", {
              folderName,
            });
           const driveFileid = res?.data?.folder?.id
    const data = {
      records: [
        {
          fields: {
            ...values,
            Experience:Number(values?.Experience),
            oneDriveFolderID:driveFileid
          }
        }
      ]
    };
  
    await axios.post(
      'https://api.airtable.com/v0/app6R5bTSGcKo2gmV/tblAz9PFQthvbxaHu',
  data,
      
      {
        headers: {
          Authorization: `Bearer pat3fMqN9X4eRWFmd.b31cffaf020d8e4666de0f657adc110e17127c9c38b093cf69d0996fe8e8dfcc` ,// or hardcoded if local testing
          'Content-Type': 'application/json'
        }
      }
    );
    showSuccessToast("Job Created SuccessFully")
            navigate('/jobs/list');

          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
            }}>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1,}}>Job Position</Typography>
                <Field name="Position">
                  {({ field, meta }: FieldProps) => (
                    <MuiTextField
                      {...field}
                      placeholder="JOB POSITION"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WorkOutlineIcon sx={{ color: 'white' }} />
                          </InputAdornment>
                        ),
                        sx: gradientInputSx,
                      }}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                  )}
                </Field>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, }}>Expereince</Typography>
                <Field name="Experience">
                  {({ field, meta }: FieldProps) => (
                    <MuiTextField
                      {...field}
                      placeholder="1"
                      fullWidth
                      InputProps={{
                         sx: gradientInputSx,
                      }}
                       error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                  )}
                </Field>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1,  }}>Location</Typography>
                <Select
                  multiple
                  value={values.Location}
                  onChange={(event: SelectChangeEvent<string[]>) => setFieldValue('Location', event.target.value)}
                  input={<OutlinedInput sx={{ color: 'white',  }} />}
                  renderValue={(selected: string[]) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ background: '#a084e8', color: 'white', fontWeight: 600,  }}
                          onDelete={(event) => {
                            event.stopPropagation();
                            const newSelected = values.Location.filter((item: string) => item !== value);
                            setFieldValue('Location', newSelected);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  sx={gradientInputSx}
                >
                  {locations.map(loc => (
                    <MenuItem key={loc} value={loc} sx={{ color: 'white', background: 'linear-gradient(90deg, #336A87 0%, #4C257E 100%)',
                      '&.Mui-selected':{
                        backgroundColor: '#336A87',
                      },
                      '&:hover': {
      backgroundColor: '#336A87',
    },
   }}>{loc}</MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, }}>Onsite/Remote</Typography>
                <Select
                  multiple
                  value={values['Onsite/Remote']}
                  onChange={(event: SelectChangeEvent<string[]>) => setFieldValue('Onsite/Remote', event.target.value)}
                  input={<OutlinedInput sx={{ color: 'white',  }} />}
                  renderValue={(selected: string[]) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ background: '#a084e8', color: 'white', fontWeight: 600,  }}
                          onDelete={(event) => {
                            event.stopPropagation();
                            const newSelected = values['Onsite/Remote'].filter((item: string) => item !== value);
                            setFieldValue('Onsite/Remote', newSelected);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  sx={gradientInputSx}
                >
                  {onsiteRemote.map(opt => (
                    <MenuItem key={opt} value={opt} sx={{ color: 'white',  background: 'linear-gradient(90deg, #336A87 0%, #4C257E 100%)','&.Mui-selected':{
                        backgroundColor: '#336A87',
                      },
                      '&:hover': {
      backgroundColor: '#336A87',
    } }}>{opt}</MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, }}>Language</Typography>
                <Select
                  multiple
                  value={values.Language}
                  onChange={(event: SelectChangeEvent<string[]>) => setFieldValue('Language', event.target.value)}
                  input={<OutlinedInput sx={{ color: 'white', }} />}
                  renderValue={(selected: string[]) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ background: '#a084e8', color: 'white', fontWeight: 600, }}
                          onDelete={(event) => {
                            event.stopPropagation();
                            const newSelected = values.Language.filter((item: string) => item !== value);
                            setFieldValue('Language', newSelected);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  sx={gradientInputSx}
                >
                  {languages.map(lang => (
                    <MenuItem key={lang} value={lang} sx={{ color: 'white',  background: 'linear-gradient(90deg, #336A87 0%, #4C257E 100%)','&.Mui-selected':{
                      backgroundColor: '#336A87',
                    },
                    '&:hover': {
    backgroundColor: '#336A87',
  }  }}>{lang}</MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1,  }}>Recruiter Email Address</Typography>
                <Field name="Recruiter_Email_Address">
                  {({ field, meta }: FieldProps) => (
                     <MuiTextField
                      {...field}
                      placeholder="SAMPLE@SAMPLE.COM"
                      fullWidth
                       InputProps={{
                         sx: gradientInputSx,
                      }}
                       error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                  )}
                </Field>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight:300, mb: 1, }}>Salary</Typography>
                <Field name="Salary">
                  {({ field, meta }: FieldProps) => (
                    <MuiTextField
                      {...field}
                      placeholder="12,000 AED"
                      fullWidth
                       InputProps={{
                         sx: gradientInputSx,
                      }}
                       error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                  )}
                </Field>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1,  }}>Recruter Name</Typography>
                <Field name="Recruiter_Name">
                  {({ field, meta }: FieldProps) => (
                    <MuiTextField
                      {...field}
                      placeholder="NAME"
                      fullWidth
                       InputProps={{
                         sx: gradientInputSx,
                      }}
                       error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                  )}
                </Field>
              </Box>
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1,}}>Job Description</Typography>
                <Field name="Job_Description">
                   {({ field, meta }: FieldProps) => (
                     <MuiTextField
                      {...field}
                      placeholder="JOB DESCRIPTION"
                      fullWidth
                      multiline
                      rows={5}
                       InputProps={{
                         sx: gradientInputSx,
                      }}
                       error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      FormHelperTextProps={{
                        sx: { color: 'red', mt: 1 },
                      }}
                    />
                   )}
                </Field>
              </Box>
              <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    py: 1.2,
                    fontSize: 16,
                    textTransform: 'none',
                   
                    '&:hover': { borderColor: '#a084e8', color: '#a084e8' },
                  }}
                  onClick={() => navigate('/jobs/list')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    background: 'linear-gradient(90deg, #3a6ea5 0%, #6B73FF 100%)',
                    color: 'white',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    py: 1.2,
                    fontSize: 16,
                    textTransform: 'none',
                   
                    boxShadow: 2,
                    '&:hover': { background: 'linear-gradient(90deg, #6B73FF 0%, #3a6ea5 100%)' },
                  }}
                >
                  Create
                </Button>
              </Box>
            
            </Box>
          </Form>
        )}
      </Formik>
      <Box sx={{
                position:"fixed",
                bottom:"10px",
                right:"10px"
              }}>
               
                 <VapiVoiceChat handleVapiChatClick={handleVapiChatClick}/>

              </Box>
    </Box>
  );
};

export default JobCreate;