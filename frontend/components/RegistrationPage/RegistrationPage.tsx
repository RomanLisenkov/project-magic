import Header from '../Header/Header';
import './RegistrationPage.css';
import { useState, useEffec } from 'react';
// import { getPost } from '../../api/postNewUser';
import {useNavigate} from "react-router-dom"


const RegistrationPage = () => {

  const nav = useNavigate()

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    city: '',
  });


  const handleInputChange = async(e) => {
    // we use it in order to collect entire string from input, each new letter will be added to the prevoous string
    setInput({...input, [e.target.name]: e.target.value})

    console.log(input)

  }

  
  const handleRegistr = async (e) => {
    e.preventDefault();
   
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
      credentials: 'include',
    });
    // const toJson = await res.json();
    // console.log("?11111: ", toJson)
    nav("/")
  };

  return (
    <div>
      <Header />
      <div id="registr-main-container">
        <div id="registry-form-container">
          <form name="registry" onSubmit={handleRegistr}>
            <h4>Please provide information for registration</h4>
            <div className="mb-3">
              <label htmlFor="exampleInputUsername1" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername1"
                aria-describedby="emailHelp"
                name="name"
                // value={formData.username}
                onChange={handleInputChange}
              />
            </div>

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
                // value={formData.email}
                onChange={handleInputChange}
              />
              <div id="emailHelp" className="form-text">
                {/* We'll never share your email with anyone else. */}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputCity"
                name="city"
                // value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                // value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
