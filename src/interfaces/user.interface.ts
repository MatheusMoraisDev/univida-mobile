export interface IUser {
  id?: number;
  email: string;
  type: string;
  password: string;
  confirmPassword?: string;
}