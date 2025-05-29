import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '@/features/auth/LoginForm';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import LoadingDots from '@/components/LoadingDots';

const Dashboard = React.lazy(() => import('@/features/dashboard/Dashboard'));
const JobList = React.lazy(() => import('@/features/jobs/JobList'));
const JobCreate = React.lazy(() => import('@/features/jobs/JobCreate'));
// const CandidatePortal = React.lazy(() => import('@/features/candidates/CandidatePortal'));
const JobDetails = React.lazy(() => import('@/features/jobs/JobDetails'));

const CandidateDetails = React.lazy(() => import('@/features/candidates/CandidateDetails'));
const CallInsightView = React.lazy(() => import('@/features/candidates/CallInsightView'));
import { SuccessProvider } from '@/context/InfoToastContext';
import SuccessToastComponent from '@/components/InfoToastComponent';


const AppRoutes: React.FC = () => (
  <BrowserRouter>
  <SuccessProvider>
    <React.Suspense fallback={<LoadingDots />}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
             <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs">
            <Route path="list" element={<JobList />} />
            <Route path="create" element={<JobCreate />} />
            <Route path=":jobId/:jobName" element={<JobDetails />} />
            {/* Add JobDetails here later */}
          </Route>
          <Route path="candidates">
  {/* <Route index element={<CandidatePortal />} /> */}
  <Route path=":name" element={<CandidateDetails />} />
  <Route path=":id/call-insights" element={<CallInsightView />} />
</Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </React.Suspense>
    <SuccessToastComponent />
    </SuccessProvider>
  </BrowserRouter>
);

export default AppRoutes;