import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip, Select, MenuItem } from '@mui/material';
import GradientCard from '@/components/GradientCard';
import ResponsiveChart from '@/components/ResponsiveChart';
import { LineChart, AreaChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Area, CartesianGrid, Funnel, LabelList, FunnelChart, BarChart, Bar } from 'recharts';
// import type { FunnelLabelProps } from 'recharts/types/polar/Funnel';

// import dashboardIllustration from '@/assets/dashboard-illustration.png';
import dashboardIllustration1 from '@/assets/dashboard-illustration-1.png';
import { useNavigate } from 'react-router-dom';
import personPic from '@/assets/person-photi.png'
import VapiVoiceChat from '@/components/VapiVoiceChat';



const funnelChart = [
  {
    value: 120,
    name: "Applied",
    fill: "#CA5D56"
  },
  {
    value: 63,
    name: "Resume Qualified",
    fill: "#D8A758"
  },
  {
    value: 38,
    name: "Initial Approach",
    fill: "#5DA5CD"
  },
  {
    value: 24,
    name: "Interview",
    fill: "#5B76AB"
  },
  {
    value: 8,
    name: "Hired",
    fill: "#4BA991"
  }
];




const dataByYear: any = {
  allposition: [
    { name: 'Jan', candidate: 0, },
    { name: 'feb', candidate: 15000, },
    { name: 'mar', candidate: 10000, },
    { name: 'apr', candidate: 20000, },
    { name: 'may', candidate: 0, },
    { name: 'june', candidate: 15000, },
    { name: 'july', candidate: 10000, },
    { name: 'aug', candidate: 20000, },
    { name: 'sep', candidate: 15000, },
    { name: 'oct', candidate: 10000, },
    { name: 'nov', candidate: 20000, },
    { name: 'dec', candidate: 20000, },
  ],
  aienginner: [
    { name: 'Jan', candidate: 1000, },
    { name: 'feb', candidate: 19000, },
    { name: 'mar', candidate: 14000, },
    { name: 'apr', candidate: 24000, },
    { name: 'may', candidate: 10000, },
    { name: 'jun', candidate: 19000, },
    { name: 'july', candidate: 14000, },
    { name: 'aug', candidate: 24000, },
    { name: 'sep', candidate: 10000, },
    { name: 'oct', candidate: 19000, },
    { name: 'nov', candidate: 14000, },
    { name: 'dec', candidate: 24000, },
  ],
  fullstack: [
    { name: 'Jan', candidate: 10430, },
    { name: 'feb', candidate: 19340, },
    { name: 'mar', candidate: 14450, },
    { name: 'apr', candidate: 24900, },
    { name: 'may', candidate: 18900, },
    { name: 'jun', candidate: 19090, },
    { name: 'july', candidate: 14400, },
    { name: 'aug', candidate: 24990, },
    { name: 'sep', candidate: 10990, },
    { name: 'oct', candidate: 19220, },
    { name: 'nov', candidate: 14550, },
    { name: 'dec', candidate: 24880, },
  ]
};

const Statistics = [
  { name: "Open Position", value: 30 },
  { name: "Closed Position", value: 100 }
]

const barchart = [
  {
    name: 'Jan',
    'Age 20 - 40': 100,
    'Age 40 - 50': 200,
    'Age 50+': 400,
  },
  {
    name: 'Feb',
    'Age 20 - 40': 400,
    'Age 40 - 50': 600,
    'Age 50+': 800,
  },
  {
    name: 'Mar',
    'Age 20 - 40': 800,
    'Age 40 - 50': 600,
    'Age 50+': 400,
  },
  {
    name: 'Apr',
    'Age 20 - 40': 200,
    'Age 40 - 50': 400,
    'Age 50+': 600,
  },
  {
    name: 'May',
    'Age 20 - 40': 300,
    'Age 40 - 50': 600,
    'Age 50+': 900,
  },
  {
    name: 'Jun',
    'Age 20 - 40': 190,
    'Age 40 - 50': 590,
    'Age 50+': 890,
  },
  {
    name: 'July',
    'Age 20 - 40': 891,
    'Age 40 - 50': 17,
    'Age 50+': 19,
  },
  {
    name: 'Aug',
    'Age 20 - 40': 100,
    'Age 40 - 50': 200,
    'Age 50+': 400,
  },
  {
    name: 'Sep',
    'Age 20 - 40': 190,
    'Age 40 - 50': 580,
    'Age 50+': 400,
  },
  {
    name: 'Oct',
    'Age 20 - 40': 590,
    'Age 40 - 50': 200,
    'Age 50+': 400,
  },
  {
    name: 'Nov',
    'Age 20 - 40': 890,
    'Age 40 - 50': 200,
    'Age 50+': 400,
  },
  {
    name: 'Dec',
    'Age 20 - 40': 100,
    'Age 40 - 50': 200,
    'Age 50+': 400,
  },

];


const topCandidates = [
  {
    personPic: personPic,
    name: "Tom",
    position: "Front End Developer",
    score: "100"
  },
  {
    personPic: personPic,
    name: "David",
    position: "AI Engineer",
    score: "100"
  },
  {
    personPic: personPic,
    name: "Yogesh",
    position: "Designer",
    score: "100"
  }
]

const CustomLegend = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#1CD0BB', marginRight: 8 }} />
      Female
    </div>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EC4899', marginRight: 8 }} />
      Male
    </div>
  </div>
);


const CustomLegendFunnel = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#CA5D56', marginRight: 8 }} />
      Applied
    </div>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#D8A758', marginRight: 8 }} />
      Resume Qualified
    </div>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#5DA5CD', marginRight: 8 }} />
      Inital Approach
    </div>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#5B76AB', marginRight: 8 }} />
      Interview
    </div>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4BA991', marginRight: 8 }} />
      Hired
    </div>
  </div>
);

const totalTaskData = [
  { name: 'Male', value: 70 },
  { name: 'Female', value: 30 }

]
const COLORS = ['#1CD0BB', '#EC4899'];



const roleRows = [
  { id: '01', name: 'AI Engineer', popularity: 90, status: '46%', color: '#FFB86C' },
  { id: '02', name: 'Full Stack Developer', popularity: 60, status: '17%', color: '#7B7BFF' },
  { id: '03', name: 'QA Analysts', popularity: 70, status: '19%', color: '#6B73FF' },
  { id: '04', name: 'Product Manager', popularity: 40, status: '29%', color: '#FFB6C1' },
];


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<any>("allposition");
  const salesData2: any = dataByYear[selectedYear];

  const [animatedLineData, setAnimatedLineData] = useState(salesData2);
  const [animatedBarData, setAnimatedBarData] = useState(barchart);
  const [animatedPieData, setAnimatedPieData] = useState(totalTaskData);

  const handleDropdownChange = (event: any) => {
    const year = event.target.value;
    setSelectedYear(year);
    const updatedData = dataByYear[year]; // use the new value directly
    setAnimatedLineData(updatedData);
  };
  

  useEffect(() =>{

  },[animatedLineData,selectedYear])


  return (
    <Box sx={{ background: '#171717', minHeight: '100vh', p: { xs: 1, md: 4 }, }}>
      <Box sx={{ mb:3,display:"flex",justifyContent:"space-between" , alignItems:"center"}}>
        <Typography variant='h5' sx={{color:"white"}}>AI Recrutment Agent</Typography>
      <Select

value={selectedYear}
onChange={(event) => handleDropdownChange(event)}
sx={{
  color: 'white',
  backgroundImage: 'linear-gradient(90deg, #6B73FF 0%, #3a6ea5 100%)',
  borderRadius: 2,
  fontWeight: 700,
  fontSize: 16,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#525252',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#777',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#aaa',
  },
}}
>
<MenuItem value="allposition">All Positions</MenuItem>
<MenuItem value="aienginner">AI Engineer</MenuItem>
<MenuItem value="fullstack">Full-Stack Developer</MenuItem>
</Select>
      </Box>
    
<Box>

</Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, mb: 4 }}>

        <GradientCard
          className='dahsbiard'
          gradient="linear-gradient(180deg, #34708B 0%, #2B3C6F 100%)"
          sx={{ flex: 2, minHeight: 220, display: 'flex', alignItems: 'center', position: "relative", height: "max-content", p: 4, pb: 0, borderRadius: 4, boxShadow: 6 }}
          childLayout={{ display: "flex", flexDreiction: "column" }}
        >
          <Box >

            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 23, mb: 2, }}>
              Launch Your Next Hire
            </Typography>
            <Typography sx={{ color: 'white', fontWeight: 300, fontSize: 16, mb: 4 }}>
              Define the position you’re hiring for, and let me take care of sourcing, screening and scoring the best-fit candidates.
            </Typography>
            <Box sx={{display:"flex",gap:2}}>
            <Button
              variant="contained"
              sx={{
                background: 'white',
                color: '#3a6ea5',
                fontWeight: 700,
                borderRadius: 8,
                px: 4,
                py: 1.5,
                fontSize: 16,

                textTransform: 'none',

                '&:hover': { background: '#3a6ea5', color: "white" },
              }}
              onClick={() => navigate('/jobs/create')}
            >
              Create Job Position
            </Button>
           
            </Box>
            
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
            <img src={dashboardIllustration1} alt="AI Recruiter" style={{ height: 300, }} />
          </Box>
        </GradientCard>

        <GradientCard
          gradient="linear-gradient(180deg, #385F8D 0%, #4B2A80 100%)"
          sx={{ p: 1, flex: 1, borderRadius: 4, boxShadow: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={700} color="white" sx={{ mb: 1, fontSize: 18 }}>Funnel Progression</Typography>

          </Box>
          <Box sx={{ mt: 0, }}>
            <ResponsiveChart height="260px">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart  >
                  <Tooltip />
                  <Funnel dataKey="value" data={funnelChart} isAnimationActive={true}   animationDuration={5000} nameKey="name"  >
                    <LabelList
                      position="center"
                      fill="#000"
                      stroke="none"
                      dataKey={"value"}
                      style={{ fill: 'white', fontWeight: '100', fontSize: "14px" }}
                    />

                  </Funnel>
                  
                </FunnelChart>


              </ResponsiveContainer>
            </ResponsiveChart>
            <div style={{ position: 'absolute', bottom: 40, left: 10 }}>
              <CustomLegendFunnel />
            </div>
          </Box>

        </GradientCard>

        {/* </Box> */}
      </Box>
      {/* Middle Row */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, mb: 4 }}>
        {/* Sales Chart */}
        <GradientCard gradient="linear-gradient(180deg, #2B3C6F 0%, #5545B9 100%)" sx={{ flex: 2, p: 1, minHeight: 300, borderRadius: 4, boxShadow: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography fontWeight={700} color="white" sx={{ fontSize: 22 }}>Total Candiate  in pipelines</Typography>
        
          </Box>
          <Box>
            <ResponsiveChart height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={animatedLineData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#074C8F" stopOpacity={1} />
                      <stop offset="95%" stopColor="#123B6F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.7)" axisLine={false} tickLine={false} tickFormatter={v => `${v / 100}`} />
                  <Tooltip contentStyle={{ background: '#23234f', border: 'none', color: 'white', }} />
                  <Legend
                    verticalAlign="bottom"
                    align="left"
                    iconType="square"
                    iconSize={10}
                    formatter={(value) => <span style={{ color: 'white', fontSize: 14 }}>{value}</span>}
                  />
                  <Line type="monotone" dataKey="candidate" stroke="#73FFCC" strokeWidth={3} dot={false} isAnimationActive={true}
    animationDuration={7000} />
                </LineChart>
              </ResponsiveContainer>
            </ResponsiveChart>
          </Box>
        </GradientCard>
        {/* Donut Chart */}
        <GradientCard gradient="linear-gradient(180deg, #385F8D 0%, #4B2A80 100%)" sx={{ flex: 1, p: 1, minHeight: 300, borderRadius: 4, boxShadow: 6, display: 'flex', flexDirection: 'column', }}>
          <Typography fontWeight={700} color="white" sx={{ mb: 2, fontSize: 18 }}>Candidate Gender</Typography>
          <Box sx={{ height: 300, width: '100%', position: "relative" }}>
            <ResponsiveChart height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      background: '#23234f',
                      border: 'none',
                      color: 'white',
                      borderRadius: 8
                    }}
                  />
                  <Pie
                    isAnimationActive={true}
                    animationDuration={5000}
                    data={animatedPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={140}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) / 2;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#ffffff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={14}
                          fontWeight={600}
                        >
                          {(percent * 100).toFixed(0)}%
                        </text>
                      );
                    }}
                    labelLine={false}
                  >
                    {totalTaskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>


              </ResponsiveContainer>
            </ResponsiveChart>
            <div style={{ position: 'absolute', top: -40, right: 10 }}>
              <CustomLegend />
            </div>
          </Box>
        </GradientCard>
      </Box>


      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, mb: 4 }}>
        {/* Donut Chart */}
        <GradientCard gradient="linear-gradient(180deg, #385F8D 0%, #4B2A80 100%)" sx={{ flex: 1, p: 1, minHeight: 300, borderRadius: 4, boxShadow: 6, display: 'flex', flexDirection: 'column', }}>
          <Typography fontWeight={700} color="white" sx={{ mb: 2, fontSize: 18 }}>Statistics</Typography>
          <Box sx={{ height: 300, width: '100%', position: "relative" }}>
            {Statistics.map((stat, index) => (
              <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="body1" color="white">{stat.name}</Typography>
                <Typography variant="h6" color="white">{stat.value}</Typography>
              </Box>
            ))}


          </Box>
        </GradientCard>
        {/* Sales Chart */}
        <GradientCard gradient="linear-gradient(180deg, #2B3C6F 0%, #5545B9 100%)" sx={{ flex: 2, p: 1, minHeight: 300, borderRadius: 4, boxShadow: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography fontWeight={700} color="white" sx={{ fontSize: 18 }}>Candidate Age bracket</Typography>

          </Box>
          <Box>
            <ResponsiveChart height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={animatedBarData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                 

                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

                  {/* <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.2)" /> */}
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.7)" axisLine={false} tickLine={false} tickFormatter={v => `${v}`} />

                  {/* <XAxis dataKey="name" />
          <YAxis /> */}
                  <Tooltip />



                  <Legend />
                  <Bar dataKey="Age 20 - 40" stackId="a" fill="#1CD0BB"
                    isAnimationActive={true}
                    animationDuration={5000}
                  />
                  <Bar dataKey="Age 40 - 50" stackId="a" fill="#EC4899"
                    isAnimationActive={true}
                    animationDuration={5000}
                     />
                  <Bar dataKey="Age 50+" stackId="a" fill="#915BF3"
                    isAnimationActive={true}
                    animationDuration={5000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ResponsiveChart>
          </Box>
        </GradientCard>

      </Box>

      {/* Bottom Row: Role Overview Table */}
      <GradientCard gradient="linear-gradient(-240deg, #23234f 0%, #564CB7 100%)" sx={{ p: 1, mt: 2, borderRadius: 4, boxShadow: 6 }}>
        <Typography fontWeight={700} color="white" sx={{ mb: 2, fontSize: 16, }}>Top Candidates</Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr', // Single column on extra-small screens
            sm: 'repeat(auto-fill, minmax(250px, 1fr))' // Responsive grid from small screens upward
          },
          gap: 2,
          mt: 4
        }}>
          {topCandidates.map((can) => (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
              <img src={can.personPic} alt={can.name} style={{ height: 250 }} />
              <Typography variant='h6'>{can.name}</Typography>
              <Typography variant='body1'>{can.position}</Typography>
              <Typography variant='body1'>AI Score: {can.score} / 1000</Typography>
            </Box>
          ))}
        </Box>
      </GradientCard>
    </Box>
  );
};

export default Dashboard;