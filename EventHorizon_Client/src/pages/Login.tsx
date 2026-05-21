import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router';


const authUrl = "/EventHorizon_API/api/Auth";

interface LoginResponse {
  token: string;
  message: string;
}

export default function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


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
    <div 
      id="main-page" 
      className="d-flex align-content-center justify-content-center flex-wrap"
    >
      <main className="d-flex flex-column align-content-center justify-content-center w-25 h-50 bg-light shadow-lg border border-secondary-subtle p-5 rounded-5">
        
        <form 
          onSubmit={handleLogin} 
          className="h-100 d-flex flex-column justify-content-around"
        >
          <h2 className="align-self-center">Login</h2>

          <input 
            type="email" 
            placeholder="Email" 
            id="loginEmail"
            className="bg-transparent border-0 border-bottom border-dark-subtle"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="w-100">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Senha" 
              id="loginPassword"
              className="bg-transparent border-0 border-bottom border-dark-subtle w-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <div className="form-check form-switch mt-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Mostrar senha
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-50 align-self-center btn btn-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Login'}
          </button>
        </form>

        <h6 className="text-center mt-3">
          Não tem uma conta?{' '}
          <Link to="/auth/register">Cadastre-se</Link>
        </h6>
      </main>
    </div>
  );
}