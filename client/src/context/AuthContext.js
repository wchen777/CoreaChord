import React, { createContext, useState, useContext } from 'react'


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export const AuthContext = createContext({});