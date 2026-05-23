import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import './Auth.css'
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import AuthToggle from '../components/AuthToggle';

const authUrl = "/EventHorizon_API/api/Auth";

interface LoginResponse {
  token: string;
  message: string;
}

export default function Auth() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');


  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedAuth, setSelectedAuth] = useState<string>('login');

  const handleLogin = async (e: React.SubmitEvent) => {
    let navigate = useNavigate();
    
    e.preventDefault();
    setIsLoading(true);

    const userLogin = {
      Email: email,
      LoginPassword: password
    };

    console.log('Tentativa de login com:', { email, password });

    try {
      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogin)
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/auth/dashboard");
      } else {
        alert(data.message || 'Falha ao realizar o login.');
      }
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      alert('Houve um erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mainPage d-flex align-content-center justify-content-around flex-wrap"
    >
      <main className="authCard d-flex flex-column align-content-center justify-content-center h-75 rounded-5">

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