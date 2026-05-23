import React from 'react';
import { useState, useRef } from "react";
import { useNavigate } from "react-router";

import './SignUpForm.css'

const SignUpUrl = "/EventHorizon_API/api/Auth";
const PersonUrl = "/EventHorizon_API/api/Person";

export default function SignUpForm() {
    let navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthdate] = useState('');
    const [salary, setSalary] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signUpStep, setSignUpStep] = useState(1);

    const personData = [
        { 
            label: 'Cpf', 
            type: 'text', 
            placeholder: '00000000000', 
            id: 'cpf',  
            value: cpf, 
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)
        },
        { 
            label: 'Nome Completo', 
            type: 'text', 
            placeholder: 'Fulano da Silva', 
            id: 'name',  
            value: fullName, 
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)
        },
        { 
            label: 'Data de nascimento', 
            type: 'date', 
            placeholder: '10-05-2006', 
            id: 'birthDate',  
            value: birthDate, 
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBirthdate(e.target.value)
        },
        { 
            label: 'Salário (R$)', 
            type: 'number', 
            placeholder: '1000', 
            id: 'salary',  
            value: salary, 
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSalary(e.target.value)
        }
    ];

    const handleNextStep = () => {
        if (!email || !password) {
            alert('Por favor, preencha o email e a senha antes de avançar.');
        } else if (!email.includes('@') || email.endsWith('@')) {
            alert('Seu email deve conter um domínio!');
        } else {
            setSignUpStep(2);
        }
    };

    const handlePrevStep = () => {
        setSignUpStep(1);
    };

    const handleSignUp = async (e: React.SubmitEvent) => {

        e.preventDefault();
        setIsLoading(true);

        const newUser = {
            Email: email,
            LoginPassword: password,

            Cpf: cpf,
            FullName: fullName,
            BirthDate: birthDate,
            Salary: salary
        };

        try {

                const response = await fetch(SignUpUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser)
                });

                const data = await response.json();

                alert(data.message);
            } catch (erro) {
                console.error(erro);
            }
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSignUp}
            className="h-100 d-flex flex-column">

            {signUpStep == 1 && (
                <div className="mt-5 d-flex flex-column h-100 row-gap-4" >
                <h4>Credenciais</h4>
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent border-0 border-bottom"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                />

                <div className="d-flex flex-column w-100">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        className="bg-transparent border-0 border-bottom w-100 mt-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    <div className="form-check mt-3">
                        <input className="form-check-input" type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label" htmlFor="showPassword">
                            Mostrar senha
                        </label>
                    </div>
                    
                    <button
                        type="button"
                        className="w-50 align-self-center mt-5"
                        onClick={handleNextStep}
                    >
                        Avançar
                    </button>
                </div>
            </div>)
            }

            {signUpStep == 2 && ( 
                <div className="d-flex flex-column">
                    <div className="d-flex flex-column row-gap-3">

                        <h4>
                            <button
                            type="button"
                            className="btn btn-secondary goBack me-3"
                            onClick={handlePrevStep}
                            disabled={isLoading}
                        >
                            {"<"}
                        </button>
                            Dados Pessoais
                        </h4>

                        {personData.map((option) => (
                            <React.Fragment key={option.id}>
                                <div className="d-flex flex-column">
                                    <label htmlFor={option.id}>{option.label}</label>
                                    <input
                                        type ={ option.type}
                                        placeholder= {option.placeholder}
                                        className="bg-transparent border-0 border-bottom"
                                        id = {option.id}
                                        value = {option.value}
                                        onChange={option.onChange}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-50 align-self-center mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Login'}
                    </button>
                </div>)
            }
        </form>
    );
}