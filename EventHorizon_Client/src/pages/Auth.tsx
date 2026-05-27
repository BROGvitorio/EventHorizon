import { useState } from 'react';

import './Auth.css'
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import AuthToggle from '../components/AuthToggle';

export default function Auth() {
  const [selectedAuth, setSelectedAuth] = useState<string>('login');

  return (
    <div className="mainPage d-flex align-content-center justify-content-around flex-wrap">
      <main className="authCard h-75 d-flex flex-column align-content-center justify-content-center rounded-5">

        <img className="ehLogo" src="./src/assets/eh_logo.svg" alt="Event Horizon logotipo" />

        <h2 className="align-self-center fw-semibold">{
          selectedAuth == 'login' ?
          'Acesse sua conta' :
          'Cadastre-se'
        }
        </h2>

        <AuthToggle value={selectedAuth} onChange={setSelectedAuth}></AuthToggle>
        
        {selectedAuth == 'login' ? <LoginForm/> : <SignUpForm/>}
      </main>
    </div>
  );
}