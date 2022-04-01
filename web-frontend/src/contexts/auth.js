import { createContext } from "react";

const AuthContext = createContext({
  user: null, // { _id, email, role }
});

export default AuthContext;
