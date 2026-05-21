import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const apiUrl = "/EventHorizon_API/api/User";

interface RegisterResponse {
  message: string;
}

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateUser = async (e: React.SubmitEvent<HTMLFormElement>) => {
    let navigate = useNavigate();
    
    e.preventDefault(); 
    setIsLoading(true);

    const newUser = {
      Email: email,
      LoginPassword: password
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      const data: RegisterResponse = await response.json();
      alert(data.message);

      if (response.ok) {
        setEmail('');
        setPassword('');
        navigate("/auth/login");
      }
    } catch (error) {
      console.error('Erro na requisição de cadastro:', error);
      alert('Não foi possível conectar-se ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      id="main-page" 
      className="d-flex align-content-center justify-content-center flex-wrap vw-100 vh-100 bg-dark-subtle"
    >
      <main className="d-flex flex-column align-content-center justify-content-center w-25 h-50 bg-light shadow-lg border border-secondary-subtle p-5 rounded-5">
        
        <form 
          onSubmit={handleCreateUser}
          className="h-100 d-flex flex-column justify-content-around align-items-center"
        >
          <h2 className="align-self-center">Cadastro</h2>

          <input 
            type="email" 
            placeholder="Insira seu email" 
            id="signUpEmail"
            className="bg-transparent border-0 border-bottom border-dark-subtle w-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="w-100">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Insira sua senha" 
              id="signUpPassword"
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
            {isLoading ? 'Cadastrando...' : 'Cadastrar-se'}
          </button>
        </form>

        <h6 className="text-center mt-3">
          Já tem uma conta? <Link to="/auth/login">Faça login</Link>
        </h6>
      </main>
    </div>
  );
}