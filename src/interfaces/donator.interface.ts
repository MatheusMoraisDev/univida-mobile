import { IAddress } from "./address.interface";
import { IContact } from "./contact.interface";
import { IUser } from "./user.interface";

export interface IDonatorDetails {
  orientation: string;
  gender: string;
  weightKilo: number;
  hasAllergy: boolean;
  hasActiveSexLive: boolean;
  hasTattoo: boolean;
  allergyDescription: string | null;
  bloodType: string;
}

export interface IDonator {
  firstName: string;
  lastName: string;
  birthDate: string;
  cpf: string;
  rg: string;
  contacts: IContact[];
  user: IUser;
  addresses: IAddress[];
  donatorDetails: IDonatorDetails;
}
