import React from 'react';
import { useState, useRef } from "react";

import './SignUpForm.css';

import { userUrl, personUrl, bankAccountUrl} from './CustomLib';
import type {Person, BankAccount} from './CustomLib';

export default function SignUpForm() {
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

    const personInputs = [
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
        };

        let userMessage: string;
        
        try {
            const userResponse = await fetch(userUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });

            const userData = await userResponse.json();
            
            if (userResponse.ok) {
                userMessage = userData.message;
                console.log(userData.message);
            }
            else {
                alert(userData.message);

                setIsLoading(false);

                setCpf('');
                setFullName('');
                setBirthdate('');
                setSalary('');
                setSignUpStep(1);

                return;
            }
        } catch (error) {
            console.error(error);
            return;
        }

        const userIdResponse = await fetch(`${userUrl}/GetUserId/${email}`, {
            method: 'GET'
        });

        const userId = await userIdResponse.json();
        
        const newPersonProfile = {
            UserId: userId,
            Cpf: cpf,
            FullName: fullName,
            BirthDate: birthDate,
            Salary: salary
        }

        try {
            const personResponse = await fetch(personUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPersonProfile)
            });

            const personData = await personResponse.json();

            if (personResponse.ok) {
                console.log(personData.message);
            }
            else {
                alert(personData.message);

                setIsLoading(false);

                await fetch(userUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser.Email)
                });
            }

        } catch (error) {
            console.error(error);
            setCpf('');
            setFullName('');
            setBirthdate('');
            setSalary('');
            setSignUpStep(1);
            return;
        }

        try {
            const personResponse = await fetch(`${personUrl}/GetByCpf/${newPersonProfile.Cpf}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const personData: Person = await personResponse.json();

            const newCheckingAccount: BankAccount = {
                ownerId: personData.id,
                ownerMonthlyIncome: personData.salary,
                category: "saving"
            }

            const accountResponse = await fetch(bankAccountUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCheckingAccount)
            });

            const accountData = await accountResponse.json();

            if (accountResponse.ok) {
                console.log(accountData.message);
            }
            else {
                alert(accountData.message);
            }
            
        } catch (error) {
            console.error(error);
            setCpf('');
            setFullName('');
            setBirthdate('');
            setSalary('');
            setSignUpStep(1);
        }

        try {
            const personResponse = await fetch(`${personUrl}/GetByCpf/${newPersonProfile.Cpf}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const personData: Person = await personResponse.json();

            const newSavingAccount: BankAccount = {
                ownerId: personData.id,
                ownerMonthlyIncome: personData.salary,
                category: "checking"
            }

            const accountResponse = await fetch(bankAccountUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSavingAccount)
            });

            const accountData = await accountResponse.json();

            if (accountResponse.ok) {
                alert(userMessage);
                console.log(accountData.message);
                window.location.reload();
            }
            else {
                alert(accountData.message);
            }
            
        } catch (error) {
            console.error(error);
            setCpf('');
            setFullName('');
            setBirthdate('');
            setSalary('');
            setSignUpStep(1);
        } finally {
            setIsLoading(false);
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
                        
                        <div className="d-flex flex-column">
                            <label htmlFor="cpf">CPF (apenas números)</label>
                            <input
                                type = "text"
                                inputMode="numeric" 
                                pattern="[0-9]*" 
                                placeholder = "00000000000"
                                className="bg-transparent border-0 border-bottom"
                                id = "cpf"
                                value = {cpf}
                                onChange={(e) => {
                                    if (e.target.value.length > 11) {
                                        e.target.value = e.target.value.slice(0, 11);
                                    }
                                    setCpf(e.target.value);
                                }} 
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {personInputs.map((option) => (
                            <React.Fragment key={option.id}>
                                <div className="d-flex flex-column">
                                    <label htmlFor={option.id}>{option.label}</label>
                                    <input
                                        type ={ option.type}
                                        placeholder = {option.placeholder}
                                        className ="bg-transparent border-0 border-bottom"
                                        id = {option.id}
                                        value = {option.value}
                                        onChange ={option.onChange}
                                        disabled ={isLoading}
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
                        {isLoading ? 'Entrando...' : 'Cadastrar'}
                    </button>
                </div>)
            }
        </form>
    );
}