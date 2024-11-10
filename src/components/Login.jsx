import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from './firebase/config.js';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = { name: user.displayName || 'User', email: user.email };
      dispatch(login(userData));

      navigate('/workspace');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = { name: user.displayName, email: user.email };
      dispatch(login(userData));

      navigate('/workspace');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const userData = { name: user.displayName, email: user.email };
      dispatch(login(userData));

      navigate('/workspace');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', width:'1000px' }}>
      <div style={{ width: '500px', padding: '20px', border: '1px none #ccc', borderRadius: '0px'}}>
        <h3 style={{fontFamily:'monospace'}}>{isRegistering ? 'REGISTER' : 'LOGIN'}</h3><br></br>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className='custom-button'
                required
              />
            </div>
          )}
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              className='custom-textbox'
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className='custom-textbox'
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div style={{ marginBottom: '10px' }}>
          <button type="submit" className='custom-button'>
            {isRegistering ? 'Register' : 'Login'}
          </button>
          </div>
          
        </form>
        <button onClick={handleGoogleLogin} className='custom-button'>
          Sign in with Google
        </button>
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          {/* {isRegistering ? 'Already have an account?' : "Don't have an account?"} */}
          <button onClick={() => setIsRegistering(!isRegistering)} className='custom-button'>
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
