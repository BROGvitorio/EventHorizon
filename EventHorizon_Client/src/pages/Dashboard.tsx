import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router';


import { UserProfile, CheckingAccount, SavingAccount } from '../components/Icons';
import './Dashboard.css'

export default function Dashboard() {
  interface Profile {
    id: number;
    name: string;
    type: 'PF' | 'PJ';
    document: string;   //CFP ou CNPJ
    activeAccounts: number;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };    
  
  return (
    <div className="mainPage d-flex flex-column flex-wrap align-items-center justify-content-between">
      
      <nav className='d-flex flex-row justify-content-between w-100 header'>
          <div className="d-flex flex-row align-items-center column-gap-4">
            <img className="eh-logo" src="./src/assets/eh_logo.svg" alt="Event Horizon logotipo" />
            <h3 className="fw-bold">Dashboard</h3>
          </div>
          
          <div className="d-flex flex-row user-options w-50 align-items-center column-gap-3">
            
            <UserProfile></UserProfile>

            <p className='mb-0'>user@email.com</p>

            <button 
              onClick={handleLogout} 
              className="btn fw-bold p-0 ms-2"
            >
              Sair
            </button>
          </div>
      </nav>
        
      <section className="currentProfileSection d-flex px-5 justify-content-between align-items-center">
        <div>
          <h1>Olá, seu nome!</h1>
          <p>24 de abril de 2024</p>
        </div>

        <div className="profileController d-flex h-100 align-items-center column-gap-5">
          <select className="profileSelector h-25" name="profileSelecter" id="profileSelect">
            <option value="CPF">Melissa Vitorio</option>
            <option value="CNPJ">Empresa Presa</option>
          </select>

          <button className="h-25" >+ ABRIR PERFIL PJ</button>
        </div>
      </section>

      <section className="profileDetails d-flex w-100 p-5 justify-content-between">
        <div className="profileAccounts d-flex flex-column align-items-center row-gap-5">
          <div className="profileAccount d-flex w-75 p-4 justify-content-around align-items-center column-gap-4">
            <div className="rounded-circle d-flex justify-content-center align-items-center">
              <CheckingAccount/>
            </div>

            <div>
              <h4>Conta Corrente</h4>
              <h6>Saldo: R$ 00,00</h6>
            </div>

            <button>Realizar Transação</button>
          </div>

          <div className="profileAccount d-flex w-75 p-4 justify-content-around align-items-center column-gap-4">
            <div className="rounded-circle d-flex justify-content-center align-items-center">
              <SavingAccount/>
            </div>

            <div>
              <h4>Conta Poupança</h4>
              <h6>Saldo: R$ 00,00</h6>
            </div>

            <button>Realizar Transação</button>
          </div>
        </div>

        <div className="profilesTransactions justify-content-center">
          <div className="profileTransactions">

            <div className="profileTransaction">
              <h5 className="mb-4">Conta Poupança</h5>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Categoria</th>
                    <th>Valor(R$)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-12-23</td>
                    <td>Saque</td>
                    <td>30,00</td>
                  </tr>
                  <tr>
                    <td>2025-12-23</td>
                    <td>Depósito</td>
                    <td>70,00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="profileTransaction mt-5">
              <h5 className="mb-4">Conta Corrente</h5>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Categoria</th>
                    <th>Valor(R$)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-12-23</td>
                    <td>Saque</td>
                    <td>40,00</td>
                  </tr>
                  <tr>
                    <td>2025-12-23</td>
                    <td>Depósito</td>
                    <td>100,00</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
      </div>
  );
}