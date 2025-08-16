import { useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUpEmailPassword } = useSignUpEmailPassword();
  const { signInEmailPassword } = useSignInEmailPassword();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Loading...');
    try {
      const res = await signInEmailPassword(email, password);
      if (res.error) {
        const signUpRes = await signUpEmailPassword(email, password);
        if (signUpRes.error) { throw signUpRes.error; }
      }
      toast.success('Successfully authenticated!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', fontFamily: 'sans-serif' }}>
      <h2>Welcome to AI Chatbot!</h2>
      <p>Enter your details to sign in or create a new account.</p>
      <form onSubmit={handleAuth}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', boxSizing: 'border-box', padding: '8px', marginBottom: '10px' }} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', boxSizing: 'border-box', padding: '8px', marginBottom: '10px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Sign In / Sign Up</button>
      </form>
    </div>
  );
};

export default AuthPage;