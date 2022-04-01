import { useContext } from "react";

import AuthContext from "../contexts/auth";

function AuthStatus() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? <p>Authenticated as {user.email}</p> : <p>not authenticated</p>}
    </div>
  );
}

export default AuthStatus;
