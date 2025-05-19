import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OfficeProvider } from './contexts/OfficeContext';
import { UserProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Office from './pages/Office';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/shared/ProtectedRoute';

function App() {
  return (
    <Router>
      <UserProvider>
        <OfficeProvider>
          <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } />
              <Route path="/office/*" element={
                <ProtectedRoute>
                  <Office />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </OfficeProvider>
      </UserProvider>
    </Router>
  );
}

export default App;