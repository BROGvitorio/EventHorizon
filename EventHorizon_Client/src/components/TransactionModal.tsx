import React, { useState } from 'react';

export default function TransactionModal() {
    const [isLoading, setIsLoading] = useState(false);
    
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    
    // const makeBankTransaction = async () => {
        
    // }

    const transactionOptions = [
        { id: 'withdrawal', label: 'Saque', val: 'withdrawal' },
        { id: 'deposit', label: 'Depósito', val: 'deposit' },
    ];
  
    return (
    <form className="modal fade" id="transactionModal" /*onSubmit={makeBankTransaction}*/>
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
                                    inputMode="decimal"
                                    pattern="^[0-9]*\.?[0-9]*$"
                                    placeholder="50.00"
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn align-self-center w-50 m-2" disabled={isLoading}>
                            {isLoading ? '...' : 'Realizar transação'}
                        </button>
                    </div>
                </div>
    </form>
  );
}