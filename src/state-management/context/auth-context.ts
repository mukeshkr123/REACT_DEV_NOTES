import React from "react";
import { AuthAction } from "../reducers/loginReducer";

interface AuthContextType {
  user: string;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
