import {
  createContext,
  useState,
} from "react";

export const AuthContext =
  createContext();

function AuthProvider({ children }) {

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [user, setUser] = useState(

    JSON.parse(
      localStorage.getItem("user")
    ) || null
  );

  const login = (newToken, userData) => {

    localStorage.setItem(
      "token",
      newToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setToken(newToken);

    setUser(userData);
  };

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken("");

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export default AuthProvider;