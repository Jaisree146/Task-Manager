import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  roleId: number | null;
  login: (token: string, roleId: number) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [roleId, setRoleId] = useState<number | null>(() => {
    const storedRole = localStorage.getItem("roleId");
    return storedRole ? Number(storedRole) : null;
  });

  function login(token: string, roleId: number) {
    localStorage.setItem("token", token);
    localStorage.setItem("roleId", roleId.toString());

    setToken(token);
    setRoleId(roleId);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("roleId");

    setToken(null);
    setRoleId(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        roleId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
