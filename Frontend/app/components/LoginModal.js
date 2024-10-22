import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose, setLoggedInUser }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin ? 'http://localhost:8080/api/login' : 'http://localhost:8080/api/register';
      const response = await axios.post(url, { username, password }, { withCredentials: true });

      if (response.data.success) {
        alert(`Successfully ${isLogin ? 'logged in' : 'registered'}!`);
        setLoggedInUser(username); // Set the logged-in user
        onClose();
      } else {
        alert(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('An error occurred. Please check your connection and try again.');
    }
  };

  return (
    <div className="modal-wrapper">
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <p onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
