import { User } from "@/types/User";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useEffect } from "react";
import { getSession } from "@/services/sessionService";

type UserType = User | null;

type AuthContextType = {
  user: UserType;
  setUser: (user: UserType) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<UserType>(null);

  const [loading, setLoading] =
    useState(true);

    useEffect(() => {
  async function loadSession() {
    const session = await getSession();

    if (session) {
      setUser(session);
    }

    setLoading(false);
  }

  loadSession();
}, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}