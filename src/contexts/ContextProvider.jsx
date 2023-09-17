import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  notification:null,
  setUser: () => {},
  setAccessToken: () => {},
  displayNotification: ()=>{}
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, setNotification] = useState('');


  const setAccessToken = (token) => {
    setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN", token);
    }
  };

  const displayNotification = message => {
    setNotification(message);

    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return(
    <AuthContext.Provider value={{
        user,
        setUser,
        token,
        setAccessToken,
        notification,
        displayNotification
    }}>
        {children}

    </AuthContext.Provider>
  )
};

export const useStateContext = () => useContext(AuthContext);