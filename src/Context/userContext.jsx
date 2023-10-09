import React, { createContext, useState } from "react";


export const Context = createContext();

export default function UserProvider({children} ) {
  const [userData, setUserData] = useState({
    isLogged: false,
    email: '',
    name: '',
    _id: ''
  });

  return (
    <Context.Provider value={[ userData, setUserData ]}>
      {children}
    </Context.Provider>
  );
}