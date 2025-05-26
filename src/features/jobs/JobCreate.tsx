import React from 'react';
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

const JobSchema = Yup.object().shape({
  Position: Yup.string().required('Required'),
  Job_Description: Yup.string().required('Required'),
  Experience: Yup.number().required('Required').min(0),
  Location: Yup.array().of(Yup.string()).min(1, 'Select at least one location'),
  'Onsite/Remote': Yup.array().of(Yup.string()).min(1, 'Select at least one'),
  Language: Yup.array().of(Yup.string()).min(1, 'Select at least one language'),
  salary: Yup.string().required('Required'),
  Recruiter_email_address: Yup.string().email('Invalid email').required('Required'),
  Recruiter_name: Yup.string().required('Required'),
});

const initialValues = {
  Position: '',
  Job_Description: '',
  Experience: 1,
  Location: [],
  'Onsite/Remote': [],
  Language: [],
  salary: '12,000 AED',
  Recruiter_email_address: 'SAMPLE@SAMPLE.COM',
  Recruiter_name: 'NAME',
  submittedAt: '',
  formMode: 'create' as 'create' | 'edit',
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
  const locations = ['Dubai', 'London', 'New York'];
  const onsiteRemote = ['Full-Time', 'Remote'];
  const languages = [ 'English', 'French'];
 


  return (
    <Box sx={{  minHeight: '100vh', p: { xs: 2, md: 1 }, fontFamily: `'Montserrat', sans-serif` }}>
      <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 20, mb: 4, fontFamily: 'Montserrat' }}>
        Create a New job
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={JobSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const folderName = values?.Position
          try {
            const res:any = await axios.post("http://localhost:5172/api/create-folder", {
              folderName,
            });
           const driveFileid = res?.data?.folder?.id
            
  // const data = {...values , role:values?.Position,
  //   //  oneDriveFolderID:driveFileid
  //   }
    // const data = { Position: values?.Position }
    const data = {
      records: [
        {
          fields: {
            ...values,
            formMode:'create',
            submittedAt:new Date().toISOString(),
            oneDriveFolderID:driveFileid
          }
        }
      ]
    };
  
    await axios.post(
      'https://api.airtable.com/v0/appeH3LWtVbw0DDIv/Job%20Openings',
  data,
      
      {
        headers: {
          Authorization: `Bearer pate5F34PFXKdUFUU.2849c608f23ec107a0cc07b3fc92c2031e37f1b28c68026d23475ddd9bb1d9ae` ,// or hardcoded if local testing
          'Content-Type': 'application/json'
        }
      }
    );
    
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
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Job Position</Typography>
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
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Expereince</Typography>
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
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Location</Typography>
                <Select
                  multiple
                  value={values.Location}
                  onChange={(event: SelectChangeEvent<string[]>) => setFieldValue('Location', event.target.value)}
                  input={<OutlinedInput sx={{ color: 'white', fontFamily: 'Montserrat' }} />}
                  renderValue={(selected: string[]) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ background: '#a084e8', color: 'white', fontWeight: 600, fontFamily: 'Montserrat' }}
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
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Onsite/Remote</Typography>
                <Select
                  multiple
                  value={values['Onsite/Remote']}
                  onChange={(event: SelectChangeEvent<string[]>) => setFieldValue('Onsite/Remote', event.target.value)}
                  input={<OutlinedInput sx={{ color: 'white', fontFamily: 'Montserrat' }} />}
                  renderValue={(selected: string[]) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ background: '#a084e8', color: 'white', fontWeight: 600, fontFamily: 'Montserrat' }}
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
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Language</Typography>
                <Select
                  multiple
                  value={values.Language}
                  onChange={(event: SelectChangeEvent<string[]>) => setFieldValue('Language', event.target.value)}
                  input={<OutlinedInput sx={{ color: 'white', fontFamily: 'Montserrat' }} />}
                  renderValue={(selected: string[]) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ background: '#a084e8', color: 'white', fontWeight: 600, fontFamily: 'Montserrat' }}
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
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Recruiter Email Address</Typography>
                <Field name="Recruiter_email_address">
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
                <Typography sx={{ color: 'white', fontWeight:300, mb: 1, fontFamily: 'Montserrat' }}>Salary</Typography>
                <Field name="salary">
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
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Recruter Name</Typography>
                <Field name="Recruiter_name">
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
                <Typography sx={{ color: 'white', fontWeight: 300, mb: 1, fontFamily: 'Montserrat' }}>Job Description</Typography>
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
              <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
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
                    fontFamily: 'Montserrat',
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
                    fontFamily: 'Montserrat',
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
    </Box>
  );
};

export default JobCreate;