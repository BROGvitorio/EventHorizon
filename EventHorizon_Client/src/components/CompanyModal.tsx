import { useState } from "react";

import './CompanyModal.css';
import type { Company, Profile } from "./customLib";

interface CompanyModalProps {
    isLoading: boolean;
    SetIsLoading: (newValue: boolean) => void;
    userId: number;
    profiles: Profile[];
    AddProfile: (newProfile: any) => void;
}

const companyUrl = "/EventHorizon_API/api/Company";

export default function CompanyModal({ isLoading, SetIsLoading, userId, profiles, AddProfile }: CompanyModalProps) {
    const [cnpj, setCnpj] = useState('');
    const [fantasyName, setFantasyName] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');

    const companyInputs = [
        {
            label: 'Nome Fantasia',
            type: 'text',
            placeholder: 'Empresa XYZ',
            id: 'fantasyName',
            value: fantasyName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFantasyName(e.target.value)
        },
        {
            label: 'Faturamento Mensal',
            type: 'number',
            placeholder: '50000',
            id: 'monthlyIncome',
            value: monthlyIncome,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMonthlyIncome(e.target.value)
        }
    ]

    const createPJProfile = async (e: React.SubmitEvent) => {
        e.preventDefault();
        SetIsLoading(true);

        const newCompanyProfile: Company = {
            userId: userId,
            cnpj: cnpj,
            fantasyName: fantasyName,
            monthlyIncome: parseFloat(monthlyIncome)
        }

        const token = localStorage.getItem('token');

        try {
            const companyResponse = await fetch(companyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCompanyProfile)
            });

            const companyData = await companyResponse.json();

            if (companyResponse.ok) {
                alert(companyData.message);
            }
            else {
                alert(companyData.message);
                SetIsLoading(false);
                return;
            }
        } catch (error) {
            console.error(error);
            SetIsLoading(false);
            return;
        }

        if (newCompanyProfile) {
            AddProfile(
                {
                    documentId: newCompanyProfile.cnpj,
                    name: newCompanyProfile.fantasyName,
                    type: 'PJ',
                    userId: newCompanyProfile.userId
                }
            );
        }

        setCnpj('');
        setFantasyName('');
        setMonthlyIncome('');
        SetIsLoading(false);
    }

    return (
        <>
            <button
                data-bs-toggle="modal"
                data-bs-target="#pjProfileModal"
                className="h-25"
                hidden={profiles.length > 2 ? true : false}
            >
                + ABRIR PERFIL PJ
            </button>

            <form className="modal fade" id="pjProfileModal" onSubmit={createPJProfile}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal-theme">

                        <div className="modal-header border-0">
                            <h4 className="modal-title fw-bold">Dados da sua empresa</h4>
                            <button type="button" className="btn-close custom-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body d-flex flex-column row-gap-4 justify-content-center">

                            <div className="d-flex flex-column row-gap-2 justify-content-center">
                                <label htmlFor="cnpj">CNPJ (apenas números): </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="00000000000000"
                                    id="cnpj"
                                    value={cnpj}
                                    onChange={(e) => {
                                        if (e.target.value.length > 14) {
                                            e.target.value = e.target.value.slice(0, 14);
                                        }
                                        setCnpj(e.target.value);
                                    }}
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {companyInputs.map((option) => (
                                <div className="d-flex flex-column row-gap-2 justify-content-center" key={option.id}>
                                    <label htmlFor={option.id}>{option.label}</label>
                                    <input
                                        type={option.type}
                                        placeholder={option.placeholder}
                                        id={option.id}
                                        value={option.value}
                                        onChange={option.onChange}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            ))}

                        </div>

                        <button type="submit" className="btn align-self-center w-50 m-2" disabled={isLoading}>
                            {isLoading ? 'Criando...' : 'Criar Perfil PJ'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}