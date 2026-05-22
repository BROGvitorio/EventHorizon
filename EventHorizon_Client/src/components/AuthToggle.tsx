import React from 'react';
import './AuthToggle.css'

interface AuthToggleProps {
  value: string; 
  onChange: (newValue: string) => void;
}

export default function AuthToggle({ value, onChange }: AuthToggleProps) {
  const radioOptions = [
    { id: 'loginRadio', label: 'Login', val: 'login' },
    { id: 'signUpRadio', label: 'Cadastro', val: 'signup' },
  ];

  return (
    <div className="w-f max-w-sm mx-auto">
      <div className="btn-group w-100" role="group">
        {radioOptions.map((option) => (
          <React.Fragment key={option.id}>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id={option.id}
              autoComplete="off"
              checked={value === option.val}
              onChange={() => onChange(option.val)}
            />
            <label className="btn btn-outline-dark" htmlFor={option.id}>
              {option.label}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}