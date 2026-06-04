import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { UserProfile, CheckingAccount, SavingAccount, BusinessAccount } from '../components/Icons';
import './Dashboard.css'
import { useNavigate } from 'react-router';
import CompanyModal from '../components/CompanyModal';

import type { BankAccount, Company, Person, Profile } from '../components/CustomLib';
import type { UserPayload } from '../components/CustomLib';
import { userUrl, personUrl, companyUrl, bankAccountUrl } from '../components/CustomLib';
import TransactionModal from '../components/TransactionModal';

export const getLocalDate = (): string => {
  const localDate = new Date();
  
  return localDate.toLocaleDateString('pt-BR', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Ensures it respects the local system timezone
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileName, setProfileName] = useState('');
  
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(-1);

  const navigate = useNavigate();

  const addProfile = (newProfile: Profile) => {
    setProfiles(prevProfiles => {
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

  const getOwnerAccounts = async (token: string, ownerId: number) => {
    try {
      const accountResponse = await fetch(`${bankAccountUrl}/GetByOwnerId/${ownerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      let bankAccounts: BankAccount[] = [];
      if (accountResponse.ok) {
        const accountsList: BankAccount[] = await accountResponse.json();

        bankAccounts = accountsList.map(ba => ({
          id: ba.id,
          ownerId: ba.ownerId,
          balance: ba.balance,
          category: ba.category
        }));
      }

      setBankAccounts([...bankAccounts]);
    } catch (error) {
      console.error(error);
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
      const userIdFromApi = await userIdResponse.json();
      setUserId(userIdFromApi);

      try {
        const personResponse = await fetch(`${personUrl}/GetByUserId/${userIdFromApi}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        let pfProfile: Profile | null = null;
        let initialOwnerId = -1;

        if (personResponse.ok) {
          const personDataPartial: Person = await personResponse.json();

          if (personDataPartial.cpf) {
            const personFullResponse = await fetch(`${personUrl}/GetByCpf/${personDataPartial.cpf}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });

            if (personFullResponse.ok) {
              const personFullData: Person = await personFullResponse.json();
              initialOwnerId = personFullData.id;

              pfProfile = {
                documentId: personFullData.cpf,
                name: personFullData.fullName,
                type: 'PF',
                ownerId: personFullData.id,
                userId: personFullData.userId
              };
            }
          }
        }

        const companyResponse = await fetch(`${companyUrl}/GetByUserId/${userIdFromApi}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        let pjProfiles: Profile[] = [];
        if (companyResponse.ok) {
          const companiesListPartial: Company[] = await companyResponse.json();

          pjProfiles = await Promise.all(
            companiesListPartial.map(async (company) => {
              try {
                const companyFullResponse = await fetch(`${companyUrl}/GetByCnpj/${company.cnpj}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                });

                if (companyFullResponse.ok) {
                  const companyFullData: Company = await companyFullResponse.json();
                  return {
                    documentId: companyFullData.cnpj,
                    name: companyFullData.fantasyName,
                    type: 'PJ',
                    ownerId: companyFullData.id, 
                    userId: Number(userIdFromApi)
                  };
                }
              } catch (err) {
                console.error(`Erro ao buscar dados completos da empresa CNPJ: ${company.cnpj}`, err);
              }

              return {
                documentId: company.cnpj,
                name: company.fantasyName,
                type: 'PJ',
                ownerId: company.id,
                userId: Number(userIdFromApi)
              };
            })
          );
        }

        const allProfiles = pfProfile ? [pfProfile, ...pjProfiles] : pjProfiles;
        setProfiles(allProfiles);

        if (pfProfile) {
          setSelectedProfile(pfProfile);
          // setProfileName(pfProfile.name);
          
          if (initialOwnerId !== -1) {
            getOwnerAccounts(token, initialOwnerId);
          }
        } else if (pjProfiles.length > 0) {
          setProfileName(pjProfiles[0].name);
          getOwnerAccounts(token, pjProfiles[0].ownerId);
        }

      } catch (erro) {
        console.error("Erro no fluxo de carregamento de dados:", erro);
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
          <h1>Olá, {selectedProfile?.name}!</h1>
          <p>{getLocalDate()}</p>
        </div>

        <div className="profileController d-flex h-100 align-items-center column-gap-5">
          <select
            className="profileSelector h-25"
            name="profileSelector"
            id="profileSelect"
            onChange={(e) => {
              const selectedDocumentId = e.target.value;
              const profile = profiles.find(p => p.documentId === selectedDocumentId);

              if (profile) {
                setSelectedProfile(profile)
                setProfileName(profile.name);

                const token = localStorage.getItem('token');
                if (!token) return;

                getOwnerAccounts(token, profile.ownerId);
              }
            }}
          >
            {profiles.map((option) => (
              <option key={option.documentId} value={option.documentId}>
                {option.name}
              </option>
            ))}
          </select>

          <CompanyModal isLoading={isLoading} SetIsLoading={setIsLoading} userId={userId} profiles={profiles} AddProfile={addProfile}></CompanyModal>
        </div>
      </section>

      <section className="profileDetails d-flex w-100 p-5 justify-content-between">
        <div className="profileAccounts d-flex flex-column align-items-center row-gap-5">

          {bankAccounts.length > 0 ? (
            bankAccounts.map((account, index) => {
              // console.log(bankAccounts);
              return (
                <div key={index} className="profileAccount d-flex w-75 p-4 justify-content-around align-items-center column-gap-4">
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    {(() => {
                      switch (parseInt(account.category)) {
                        case 0: return <BusinessAccount />;
                        case 1: return <CheckingAccount />;
                        case 2: return <SavingAccount />;
                        default: return null;
                      }
                    })()}
                  </div>

                  <div>
                    <h4>
                      {(() => {
                        switch (parseInt(account.category)) {
                          case 0: return 'Conta Empresarial';
                          case 1: return 'Conta Corrente';
                          case 2: return 'Conta Poupança';
                          default: return null;
                        }
                      })()}
                    </h4>
                    <h6>
                      Saldo: R$ {account.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h6>
                  </div>

                  <button 
                    className="btn " 
                    data-bs-toggle="modal" 
                    data-bs-target="#transactionModal"
                    onClick={() => setSelectedAccount(account)}
                    >
                    Realizar Transação
                  </button>

                </div>
              );
            })
          ) : (
            <p>Nenhuma conta encontrada para este perfil.</p>
          )}
          
          <TransactionModal
            accountId={selectedAccount?.id}
            onTransactionSuccess={() => {
              const token = localStorage.getItem('token');

              if (!token || !selectedProfile) return;

              getOwnerAccounts(token, selectedProfile.ownerId);
            }}
          ></TransactionModal>

        </div>

        <div className="profilesTransactions justify-content-center">
          <div className="d-flex flex-column profileTransactions align-items-center justify-content-center">

            <h5 >HISTÓRICO DE TRANSAÇÕES</h5>
            <h2>EM BREVE</h2>

          </div>
        </div>
      </section>
    </div>
  );
}