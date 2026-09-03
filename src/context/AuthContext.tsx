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
  isDemo: boolean;
};

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  const [isDemo] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      new URLSearchParams(window.location.search).get("demo") ===
      "true"
    );
  });

  useEffect(() => {
    async function loadSession() {
      if (isDemo) {
  
        

      const session = await getSession();

      if (session) {
        setUser(session);
      }

      setLoading(false);
    }

    loadSession();
  }, [isDemo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        isDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}