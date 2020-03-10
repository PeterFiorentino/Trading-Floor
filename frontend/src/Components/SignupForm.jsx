import React from 'react';


const SignupForm = ({
  username,
  password,
  handleChange,
  signupUser,
  email
}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser()
  }

  return (
    <div className='form-container'>
      <div className="LoginAndSignUpDiv">
        <h2> Register </h2>
        <form onSubmit={handleSubmit}>
          <i class="fas fa-user"></i>{"  "}
          <input
            className='signup-input'
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={handleChange}
          /><br/>
          <i class="fas fa-user"></i>{"  "}
          <input
            className='signup-input'
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={handleChange}
          /><br/>
          <i class="fas fa-lock"></i>{"  "}
          <input
            className='signup-input'
            type="password"
            name="password"
            value={password}
            placeholder="••••••••"
            onChange={handleChange}
          /><br/>
          <i class="fas fa-image"></i>{"  "}
          <input className='submit-button' type="submit" value="Signup" />
        </form>
      </div>
    </div>
  )
}

export default SignupForm;