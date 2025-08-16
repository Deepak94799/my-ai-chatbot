import { useAuthenticationStatus } from '@nhost/react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import ChatLayout from './components/ChatLayout';
import AuthPage from './components/AuthPage';

function App() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  console.log({ isAuthenticated, isLoading });

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '200px' }}>Loading...</div>;
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} />
        <Route path="/*" element={isAuthenticated ? <ChatLayout /> : <Navigate to="/auth" />} />
      </Routes>
    </>
  );
}

export default App;