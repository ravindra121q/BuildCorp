import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        {/* Default redirect to admin login */}
        <Route path="*" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
