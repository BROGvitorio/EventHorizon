export const userUrl = "/EventHorizon_API/api/User";
export const companyUrl = "/EventHorizon_API/api/Company";
export const personUrl = "/EventHorizon_API/api/Person";
export const bankAccountUrl = "/EventHorizon_API/api/BankAccount"
export const bankTransactionUrl = "/EventHorizon_API/api/BankTransaction"

export interface CCompany {
  cnpj: string;
  fantasyName: string;
  monthlyIncome: number;
  userId: number;
}

export interface Company {
  cnpj: string;
  fantasyName: string;
  monthlyIncome: number;
  id: number;
  userId: number;
}

export interface Person {
  birthDate: Date;
  cpf: string;
  fullName: string;
  salary: number;
  id: number;
  userId: number;
}

export interface Profile {
  documentId: string;
  name: string;
  type: 'PF' | 'PJ';
  ownerId: number;
  userId: number;
}

export interface UserPayload { email: string };

export interface CBankAccount {
  ownerId: number;
  ownerMonthlyIncome: number;
  category: string;
}

export interface BankAccount {
  id: number;
  ownerId: number;
  balance: number;
  category: string;
}

export interface Transaction {
  category: string;
  amount: number;
  date: Date;
}