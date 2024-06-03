import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Header.css';
import {UserInterface} from './interfaces';

function Header(): JSX.Element {
  const nav = useNavigate();

  const [user, setUser] = useState<UserInterface>();
  //   {
  //   name: '',
  //   email: '',
  //   city: '',
  // }

  useEffect(() => {
    (async function () : Promise<void> {
      const userFindBack = await fetch('http://localhost:3000/user-session', {
        method: 'GET',
        credentials: 'include',
      });
      const jsonFromBack = await userFindBack.json();
      // dispatch(getUser(jsonFromBack));
      setUser(jsonFromBack);
    })();
  }, []);

  const logout = async (e): Promise<void>  => {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const toJson = await response.json();

    if (toJson.message === 'OK') {
      console.log('logout');
      nav('/login');
    }
  };

  return (
    <>
      {user ? (
        <>
          <ul className="nav nav-tabs">
            <>
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          </ul>
          <div id="name-container">
            <h5>User: {user.name}</h5>
          </div>
        </>
      ) : (
        <ul className="nav nav-tabs">
          <>
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </>
        </ul>
      )}
    </>
  );
}

export default Header;
