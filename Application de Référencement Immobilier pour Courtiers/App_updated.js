import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NewReference from './pages/NewReference';
import CalculateurCommission from './components/calculateur/CalculateurCommission';
import AuthLayout from './components/layouts/AuthLayout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="new-reference" element={<NewReference />} />
        <Route path="calculateur" element={<CalculateurCommission />} />
      </Route>
    </Routes>
  );
}

export default App;
