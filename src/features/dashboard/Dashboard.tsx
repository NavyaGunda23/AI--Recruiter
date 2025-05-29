import React from 'react';
import { Box, Typography, Button, Chip, Select, MenuItem } from '@mui/material';
import GradientCard from '@/components/GradientCard';
import ResponsiveChart from '@/components/ResponsiveChart';
import { LineChart,AreaChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Area, CartesianGrid } from 'recharts';
import dashboardIllustration from '@/assets/dashboard-illustration.png';
import { useNavigate } from 'react-router-dom';

const salesData = [
  { name: 'Jan', Graph1: 0, Graph2: 0 },
  { name: 'feb', Graph1: 15000, Graph2: 12000 },
  { name: 'mar', Graph1: 10000, Graph2: 10000 },
  { name: 'apr', Graph1: 20000, Graph2: 14000 },
 
 
];

const salesData1 = [
  { name: 'Jan', Graph1: 0, Graph2: 0 },
  { name: 'feb', Graph1: 15000, Graph2: 12000 },
  { name: 'mar', Graph1: 10000, Graph2: 10000 },
  { name: 'apr', Graph1: 20000, Graph2: 14000 },
  { name: 'Jan', Graph1: 0, Graph2: 0 },
  { name: 'feb', Graph1: 15000, Graph2: 12000 },
  { name: 'mar', Graph1: 10000, Graph2: 10000 },
  { name: 'apr', Graph1: 20000, Graph2: 14000 },
 
];

const donutData = [
  { name: 'Total Task', value: 1234, color: '#7B7BFF' },
  { name: 'Running', value: 4, color: '#6B73FF' },
  { name: 'Pending', value: 2, color: '#FFB6C1' },
];

const CustomLegend = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
    <div style={{ color: 'white',  fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: COLORS.total, marginRight: 8 }} />
      Total Task 1234
    </div>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: COLORS.running, marginRight: 8 }} />
      Running 04
    </div>
    <div style={{ color: 'white', fontSize: 14 }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: COLORS.pending, marginRight: 8 }} />
      Pending 02
    </div>
  </div>
);

const totalTaskData = [{ name: 'Total Task', value: 70 }, { name: 'Remaining', value: 30 }];
const runningData = [{ name: 'Running', value: 4 }, { name: 'Other', value: 96 }];
const pendingData = [{ name: 'Pending', value: 2 }, { name: 'Other', value: 98 }];

const COLORS = {
  total: '#8F88FF',
  running: '#FF9C87',
  pending: '#98E4DB',
  bg: 'rgba(255,255,255,0.1)'
}


const roleRows = [
  { id: '01', name: 'AI Engineer', popularity: 90, status: '46%', color: '#FFB86C' },
  { id: '02', name: 'Full Stack Developer', popularity: 60, status: '17%', color: '#7B7BFF' },
  { id: '03', name: 'QA Analysts', popularity: 70, status: '19%', color: '#6B73FF' },
  { id: '04', name: 'Product Manager', popularity: 40, status: '29%', color: '#FFB6C1' },
];


const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: '#171717', minHeight: '100vh', p: { xs: 1, md: 4 },  }}>
      {/* Top Row */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, mb: 4 }}>
        {/* Welcome Card */}
        <GradientCard
          gradient="linear-gradient(180deg, #34708B 0%, #2B3C6F 100%)"
          sx={{ flex: 2, minHeight: 220, display: 'flex', alignItems: 'center',  p: 4, borderRadius: 4, boxShadow: 6 }}
          childLayout= {{display:"flex",flexDreiction:"column"}}
        >
          <Box >
            <Typography sx={{ color: 'white', fontWeight: 200, fontSize: 19, mb: 1,}}>
              Welcome To
            </Typography>
            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 23, mb: 2, }}>
              Your AI Recruiter
            </Typography>
            <Typography sx={{ color: 'white',  fontWeight: 300, fontSize: 16, mb: 4 }}>
              Lorem ipsum dolor sit amet consectetur. Bibendum risus urna tortor praesent. Lorem ipsum dolor sit amet consectetur. Bibendum risus urna tortor praesent.
            </Typography>
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
              
                '&:hover': { background: '#3a6ea5',color:"white" },
              }}
              onClick={() => navigate('/jobs/create')}
            >
              Create New Job Role
            </Button>
          </Box>
          <Box sx={{  display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <img src={dashboardIllustration} alt="AI Recruiter" style={{ height: 200}} />
          </Box>
        </GradientCard>
        {/* Stat Cards */}
        {/* <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(auto-fit, minmax(250px, 1fr))' }, gap: 4 }}> */}
          {/* Stat Card 1 */}
          <GradientCard
            gradient="linear-gradient(180deg, #385F8D 0%, #4B2A80 100%)"
            sx={{ p: 1,flex:1, borderRadius: 4, boxShadow: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
          >
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Typography fontWeight={700} color="white" sx={{ mb: 1, fontSize: 18 }}>Customer Fulfilment</Typography>
            <Chip label="$1250" sx={{ background: 'white', color: '#3a6ea5', fontWeight: 700, fontSize: 14, borderRadius: 2 }} />
            </Box>
            <Box sx={{  mt: 2,  }}>
              <ResponsiveChart height="180px">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#074C8F" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#123B6F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="rgba(177,177,177,0.5)" />

                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.7)" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/100}K`} />
                    <Tooltip contentStyle={{ background: '#23234f', border: 'none', color: 'white',  }} />
                    <Area type="monotone" dataKey="Graph1" stroke="#00BFFF"   strokeWidth={0} fillOpacity={1} fill="url(#colorUv)" />
                    {/* <Line type="monotone" dataKey="Graph1" stroke="#fff" strokeWidth={2} dot={false} /> */}
                  </AreaChart>
                </ResponsiveContainer>
              </ResponsiveChart>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 2,borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', color: 'white',mt:"20px" }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#7B7BFF', mr: 1 }} />
                <Box>
                  <Typography color="#A0A0A0" fontWeight={400} fontSize={13} >Last Month</Typography>
                  <Typography color="white" fontWeight={400} fontSize={13} >$4,087</Typography>
                </Box>
              </Box>
              <Box sx={{width:"1px",height:"60px",backgroundColor:"rgba(255,255,255,0.06)" , mt:"10px"}}></Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', color: 'white', mt:"20px" }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#6B73FF', mr: 1 }} />
                <Box >
                  <Typography color="#A0A0A0" fontWeight={400} fontSize={13} >This Month</Typography>
                  <Typography color="white" fontWeight={400} fontSize={13} >$5,506</Typography>
                </Box>
              </Box>
            </Box>
          </GradientCard>
       
        {/* </Box> */}
      </Box>
      {/* Middle Row */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, mb: 4 }}>
        {/* Sales Chart */}
        <GradientCard gradient="linear-gradient(180deg, #2B3C6F 0%, #5545B9 100%)" sx={{ flex: 2, p: 1, minHeight: 300, borderRadius: 4, boxShadow: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography fontWeight={700} color="white" sx={{  fontSize: 22 }}>Sales</Typography>
            <Select value={2022} sx={{ color: 'white', background: 'transparent',borderColor:"#525252", borderRadius: 2, fontWeight: 700, fontSize: 16 }}>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
            </Select>
          </Box>
          <Box>
            <ResponsiveChart height= "250px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData1} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#074C8F" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#123B6F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.7)" axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
                  <Tooltip contentStyle={{ background: '#23234f', border: 'none', color: 'white',  }} />
                  <Legend
                    verticalAlign="bottom"
                    align="left"
                    iconType="square"
                    iconSize={10}
                    formatter={(value) => <span style={{ color: 'white', fontSize: 14 }}>{value}</span>}
                  />
                  <Line type="monotone" dataKey="Graph1" stroke="#73FFCC" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="Graph2" stroke="#A9DFD8" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ResponsiveChart>
          </Box>
        </GradientCard>
        {/* Donut Chart */}
        <GradientCard gradient="linear-gradient(180deg, #385F8D 0%, #4B2A80 100%)" sx={{ flex: 1, p: 1, minHeight: 300, borderRadius: 4, boxShadow: 6, display: 'flex', flexDirection: 'column',  }}>
          <Typography fontWeight={700} color="white" sx={{ mb: 2,  fontSize: 18 }}>Task Percentage</Typography>
          <Box sx={{ height: 200, width: '100%',position:"relative" }}>
            <ResponsiveChart height="300px">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
              <Tooltip contentStyle={{ background: '#23234f', border: 'none', color: 'white',}} />
              <Pie
        data={totalTaskData}
        dataKey="value"
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={-270}
        innerRadius={120}
        outerRadius={130}
        stroke="none"
        isAnimationActive={false}
      >
        <Cell fill={COLORS.total} />
        <Cell fill={COLORS.bg} />
      </Pie>

      {/* Running ring */}
      <Pie
        data={runningData}
        dataKey="value"
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={-270}
        innerRadius={100}
        outerRadius={105}
        stroke="none"
        isAnimationActive={false}
      >
        <Cell fill={COLORS.running} />
        <Cell fill={COLORS.bg} />
      </Pie>

      {/* Pending ring */}
      <Pie
        data={pendingData}
        dataKey="value"
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={-270}
        innerRadius={80}
        outerRadius={85}
        stroke="none"
        isAnimationActive={false}
      >
        <Cell fill={COLORS.pending} />
        <Cell fill={COLORS.bg} />
      </Pie>

      {/* Optional: custom legend */}
      {/* <Legend
        verticalAlign="top"
        align="right"
        iconType="circle"
        iconSize={10}
        formatter={(value) => (
          <span style={{ color: 'white', fontSize: 13 }}>
            {value}
          </span>
        )}
      /> */}
    </PieChart>
    
              
              </ResponsiveContainer>
            </ResponsiveChart>
            <div style={{ position: 'absolute', top: -40, right: 10 }}>
        <CustomLegend />
      </div>
          </Box>
        </GradientCard>
      </Box>
      {/* Bottom Row: Role Overview Table */}
      <GradientCard gradient="linear-gradient(135deg, #23234f 0%, #23234f 100%)" sx={{ p: 1, mt: 2, borderRadius: 4, boxShadow: 6 }}>
        <Typography fontWeight={700} color="white" sx={{ mb: 2, fontSize: 16,  }}>Role Overview</Typography>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', color: 'white', }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" sx={{ textAlign: 'left', py: 1, px: 2, fontWeight: 400, fontSize: 16,color:"#87888C" }}>#</Box>
              <Box component="th" sx={{ textAlign: 'left', py: 1, px: 2, fontWeight: 400, fontSize: 16 , color:"#87888C"}}>Name</Box>
              <Box component="th" sx={{ textAlign: 'left', py: 1, px: 2, fontWeight: 400, fontSize: 16 , color:"#87888C" }}>Popularity</Box>
              <Box component="th" sx={{ textAlign: 'left', py: 1, px: 2, fontWeight: 400, fontSize: 16, color:"#87888C" }}>Status</Box>
            </Box>
          </Box>
          <Box component="tbody">
            {roleRows.map((row) => (
              <Box component="tr" key={row.id} sx={{borderTop:"1px solid rgba(255,255,255,0.1)"}}>
                <Box component="td" sx={{ py: 1, px: 2 }}>{row.id}</Box>
                <Box component="td" sx={{ py: 1, px: 2 }}>{row.name}</Box>
                <Box component="td" sx={{ py: 1, px: 2, width: 300 }}>
                  <Box sx={{ width: '100%', height: 8, background: '#23234f', borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ width: `${row.popularity}%`, height: '100%', background: row.color, borderRadius: 4 }} />
                  </Box>
                </Box>
                <Box component="td" sx={{ py: 1, px: 2 }}>
                  <Chip label={row.status} sx={{ background: 'rgba(123,123,255,0.1)', color: row.color, fontWeight: 700, fontSize: 14, borderRadius: 2 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </GradientCard>
    </Box>
  );
};

export default Dashboard;