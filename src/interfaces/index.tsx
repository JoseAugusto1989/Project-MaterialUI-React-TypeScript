export interface ICustomer  {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
  occupation: string;
  number: number;
  district: string;
  city: string;
  state: string;
}

export interface IEmailProvider {
  subject: string;
  email: string;
  text: string;
}

export interface IEmployee {
  id: number;
  name: string;
  email: string;
  phone: string;
  job: string;
  salary: number;
  // TODO: ajustar bonificação, porcentagem das vendas
  bonus: number;
  initialDate: Date;
}

export interface IProduct {
  id: number;
  name: string;
  salePrice: number;
  code: string;
  purchasePrice: number;
  gain?: number;
  quantityInStock: number;
  addedAmount: number;
  // TODO: transformar em Objeto 'Provider'
  provider: string;
}

export interface IProvider {
  id: number;
  name: string;
  lastName: string;
  phone: number;
  email: string;
  companyName: string;
  cnpj: string;
}

export interface ISales {
  id: number;
  employee: string;
  unitPrice: number;
  totalPrice: number;
  code: string;
  quantity: number;
  dateSale: Date;
  customer: string;
  description: string;
  productName: string;
}

export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  occupation: string;
  privatyTerms: boolean;
}
  