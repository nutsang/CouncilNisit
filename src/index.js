import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopUp from './pages/topup/TopUp';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import WaitingCard from './pages/wating-card/WaitingCard'
import RedeemReward from './pages/redeem-reward/RedeemReward';
import reportWebVitals from './reportWebVitals';

document.body.className = 'font-Kanit'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<WaitingCard />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/profile' element={<Profile />}/>
        <Route exact path='/topup' element={<TopUp />}/>
        <Route exact path='/redeem-reward' element={<RedeemReward />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
