export const companyUrl = "/EventHorizon_API/api/Company";
export const userUrl = "/EventHorizon_API/api/User";
export const personUrl = "/EventHorizon_API/api/Person";

export interface Company {
  cnpj: string;
  fantasyName: string;
  monthlyIncome: number;
  userId: number;
}

export interface Person {
  birthDate: Date;
  cpf: string;
  fullName: string;
  salary: number;
  userId: number;
}

export interface Profile {
  documentId: string;
  name: string;
  type: 'PF' | 'PJ';
  userId: number;
}

export interface UserPayload { email: string };
