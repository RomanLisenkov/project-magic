import React, { useState, useEffect } from 'react';
// import Header from '../components/Header/Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../components/HomePage/HomePage';
import RegistryPage from '../components/RegistrationPage/RegistrationPage';
import LoginPage from '../components/LoginPage/LoginPage';
import CartPage from '../components/CartPage/CartPage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
function App(): React.ReactElement {
  // const [count, setCount] = useState(0);
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('/get')
  //     .then((res) => res.json())
  //     .then(res => setData(res.message));
  // }, []);

  return (
    <>
      {/* <p>{data}</p> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="register" element={<RegistryPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
