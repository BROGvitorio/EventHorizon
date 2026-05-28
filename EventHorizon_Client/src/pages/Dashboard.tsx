import React, { useEffect, useState } from 'react';
import { jwtDecode, type JwtPayload } from "jwt-decode";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { UserProfile, CheckingAccount, SavingAccount } from '../components/Icons';
import './Dashboard.css'
import { useNavigate } from 'react-router';
import CompanyModal from '../components/CompanyModal';

import type { Company, Person, Profile } from '../components/CustomLib';
import type { UserPayload } from '../components/CustomLib';
import { userUrl, personUrl, companyUrl } from '../components/CustomLib';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileName, setProfileName] = useState('');

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(-1);

  const navigate = useNavigate();

  const addProfile = (newProfile: Profile) => {
    setProfiles(prevProfiles => {
      console.log(prevProfiles);

      const exists = prevProfiles.some(p => p.documentId === newProfile.documentId);

      if (exists) return prevProfiles;

      return [...prevProfiles, newProfile];
    });
  };

  const decodeJWTToken = (token: string) => {
    try {
      const decoded = jwtDecode<UserPayload>(token);
      return decoded.email;
    }
    catch (error) {
      console.error("Invalid token", error);
      navigate('/');
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) return;
      const userEmail = decodeJWTToken(token);

      if (!userEmail) return;
      setEmail(userEmail);

      const userIdResponse = await fetch(`${userUrl}/GetUserId/${userEmail}`, {
        method: 'GET'
      });
      const userId = await userIdResponse.json();
      setUserId(userId);

      try {
        const personResponse = await fetch(`${personUrl}/GetByUserId/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const personData: Person = await personResponse.json();

        const pfProfile : Profile = {
          documentId: personData.cpf,
          name: personData.fullName,
          type: 'PF',
          ownerId: personData.ownerId,
          userId: personData.userId
        }
        
        const companyResponse = await fetch(`${companyUrl}/GetByUserId/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        let pjProfiles: Profile[] = [];
        if (companyResponse.ok) {
          const companiesList: Company[] = await companyResponse.json();

          pjProfiles = companiesList.map( c => ({
            documentId: c.cnpj,
            name: c.fantasyName,
            type: 'PJ',
            ownerId: c.ownerId,
            userId: parseInt(userId)
          }));
        }

        setProfiles([pfProfile, ...pjProfiles]);
        setProfileName(pfProfile.name);

      } catch (erro) {
        console.error(erro);
      }
    };
    fetchUserData();

  }, []);

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

          <p className='mb-0'>{email}</p>

          <button
            onClick={handleLogout} className="btn fw-bold p-0 ms-2">
            Sair
          </button>
        </div>
      </nav>

      <section className="currentProfileSection d-flex px-5 justify-content-between align-items-center">
        <div>
          <h1>Olá, {profileName}!</h1>
          <p>24 de abril de 2024</p>
        </div>

        <div className="profileController d-flex h-100 align-items-center column-gap-5">
          <select
            className="profileSelector h-25"
            name="profileSelector"
            id="profileSelect"
            onChange={(e) => {
              const selectedDocumentId = e.target.value;
              const selectedProfile = profiles.find(p => p.documentId === selectedDocumentId);

              if (selectedProfile) {
                setProfileName(selectedProfile.name);
              }
            }}
          >
            {profiles.map((option, index) => (
              <option key={`${option.documentId}-${index}`} value={option.documentId}>
                {option.name}
              </option>
            ))}
          </select>

          <CompanyModal isLoading={isLoading} SetIsLoading={setIsLoading} userId={userId} profiles={profiles} AddProfile={addProfile}></CompanyModal>
        </div>
      </section>

      <section className="profileDetails d-flex w-100 p-5 justify-content-between">
        <div className="profileAccounts d-flex flex-column align-items-center row-gap-5">
          <div className="profileAccount d-flex w-75 p-4 justify-content-around align-items-center column-gap-4">
            <div className="rounded-circle d-flex justify-content-center align-items-center">
              <CheckingAccount />
            </div>

            <div>
              <h4>Conta Corrente</h4>
              <h6>Saldo: R$ 00,00</h6>
            </div>

            <button>Realizar Transação</button>
          </div>

          <div className="profileAccount d-flex w-75 p-4 justify-content-around align-items-center column-gap-4">
            <div className="rounded-circle d-flex justify-content-center align-items-center">
              <SavingAccount />
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