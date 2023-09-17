import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setAccessToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setAccessToken = (accessToken) => {
    setToken(accessToken);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN", token);
    }
  };

  return(
    <AuthContext.Provider value={{
        user,
        setUser,
        token,
        setAccessToken,
    }}>
        {children}

    </AuthContext.Provider>
  )
};

export const useStateContext = () => useContext(AuthContext);