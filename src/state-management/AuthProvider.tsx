import React, { useReducer } from "react";
import loginReducer from "./reducers/loginReducer";
import AuthContext from "./context/auth-context";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(loginReducer, "");

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
