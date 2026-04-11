import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { setAuthToken } from "@/lib/auth-token";
import type { Session } from "@/types/session";

const STORAGE_KEY = "go_pizza_session";

type AuthContextValue = Readonly<{
  session: Session | null;
  isReady: boolean;
  isAdmin: boolean;
  userName: string;
  signIn: (session: Session) => Promise<void>;
  signOut: () => Promise<void>;
}>;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && alive) {
          const parsed = JSON.parse(raw) as Session;
          setSession(parsed);
          setAuthToken(parsed.token);
        }
      } catch {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setAuthToken(null);
      } finally {
        if (alive) setIsReady(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const signIn = useCallback(async (next: Session) => {
    setSession(next);
    setAuthToken(next.token);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const signOut = useCallback(async () => {
    setSession(null);
    setAuthToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isReady,
      isAdmin: Boolean(session?.isAdmin),
      userName: session?.userName ?? "",
      signIn,
      signOut,
    }),
    [session, isReady, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
