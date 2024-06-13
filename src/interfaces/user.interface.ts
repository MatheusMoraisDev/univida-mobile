export interface IUser {
  email: string;
  type: string;
  password: string;
  confirmPassword?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}