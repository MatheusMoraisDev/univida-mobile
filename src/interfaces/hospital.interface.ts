import { IAddress } from "./address.interface";
import { IContact } from "./contact.interface";
import { IUser } from "./user.interface";

export interface IHospital {
  id: number;
  name: string;
  cnpj: string;
  hospitalType: string;
  contacts: IContact[];
  user: IUser;
  addresses: IAddress[];
}

export interface IHospitalParams {
  name?: string;
  cnpj?: string;
  hospitalType?: string;
  userId?: number;
}
