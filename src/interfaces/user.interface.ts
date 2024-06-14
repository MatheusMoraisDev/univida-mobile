export interface IUser {
  email: string;
  type: string;
  password: string;
  confirmPassword?: string;
}