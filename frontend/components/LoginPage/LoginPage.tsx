import './LoginPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {LoginInterface} from './interfaces'
import Header from '../Header/Header';
const LoginPage = () => {
  const nav = useNavigate();

  const [login, setLogin] = useState<LoginInterface>({
    username: '',
    email: '',
  });

  const handleInputChange = async (e): Promise<void> => {
    // we use it in order to collect entire string from input, each new letter will be added to the prevoous string
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(login);
  };

  const handleLogin = async (e) : Promise<void> => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
      credentials: 'include',
    });
    console.log('?11111: ', login);
    nav('/');
    // const toJson = await res.json();
  };

  return (
    <div>
      <Header />
      <div id="login-main-container">
        <div id="login-form-container">
          <form name="login" onSubmit={handleLogin}>
            <h4>Please login</h4>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleInputChange}
              />
              <div id="emailHelp" className="form-text">
                {/* We'll never share your email with anyone else. */}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
