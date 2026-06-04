import React, { useState } from 'react';
import type { Transaction } from './CustomLib';
import { bankTransactionUrl } from './CustomLib';

interface TransactionModalProps {
    accountId: number | undefined;
    onTransactionSuccess: () => void;
}

export default function TransactionModal({ accountId, onTransactionSuccess }: TransactionModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    
    const makeBankTransaction = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        if (!accountId) {
            alert("Nenhuma conta selecionada.");
            return;
        }
        
        setIsLoading(true);

        const transactionDTO = {
            category: category,
            amount: amount,
            date: new Date().toISOString().split('T')[0]
        }

        try {
            const response = await fetch(`${bankTransactionUrl}/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionDTO)
            })

            const data = await response.json();

            if (response.ok) {
                onTransactionSuccess();
                setCategory('');
                setAmount('');
            }

            alert(data.message)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }

    const transactionOptions = [
        { id: 'withdrawal', label: 'Saque', val: 'withdrawal' },
        { id: 'deposit', label: 'Depósito', val: 'deposit' },
    ];
  
    return (
    <form className="modal fade" id="transactionModal" onSubmit={makeBankTransaction}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal-theme">

                        <div className="modal-header border-0">
                            <h4 className="modal-title fw-bold">Dados da sua transação</h4>
                            <button type="button" className="btn-close custom-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body d-flex flex-column row-gap-4 justify-content-center">

                        <div className="w-f max-w-sm mx-auto">
                                <div className="btn-group w-100" role="group">
                                {transactionOptions.map((option) => (
                                    <React.Fragment key={option.id}>
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="btnradio"
                                        id={option.id}
                                        autoComplete="off"
                                        onChange={() => setCategory(option.id)}
                                        value={category}
                                        checked={option.id == category}
                                        required
                                    />
                                    <label className="btn btn-outline-dark" htmlFor={option.id}>
                                        {option.label}
                                    </label>
                                    </React.Fragment>
                                ))}
                                </div>
                            </div>

                            <div className="d-flex flex-column row-gap-2 justify-content-center">
                                <label htmlFor="cnpj">Valor (R$): </label>
                                <input
                                    type="text"
                                    maxLength={9}
                                    inputMode="decimal"
                                    pattern="^[0-9]*\.?[0-9]*$"
                                    placeholder="50.00"
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    value={amount}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn align-self-center w-50 m-2" disabled={isLoading}>
                            {isLoading ? 'Carregando' : 'Realizar transação'}
                        </button>
                    </div>
                </div>
    </form>
  );
}