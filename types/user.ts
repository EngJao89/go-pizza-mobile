export type UserProfile = Readonly<{
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthday: string;
  role?: string;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}>;
