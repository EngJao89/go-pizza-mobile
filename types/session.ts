export type Session = Readonly<{
  token: string | null;
  userName: string;
  isAdmin: boolean;
}>;
