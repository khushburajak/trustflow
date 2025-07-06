import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you would call the API to send reset instructions
      setMessage(`Password reset instructions sent to ${email}`);
    } catch (err) {
      setMessage('Error sending reset instructions');
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password?</h2>
      <p>No worries, we'll send you reset instructions</p>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p>
        Back to <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default ForgotPassword;