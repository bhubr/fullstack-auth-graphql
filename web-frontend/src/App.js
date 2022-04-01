import { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import "./App.css";
import Login from "./pages/Login";
import AuthContext from "./contexts/auth";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      _id
      email
      role
    }
  }
`;

function AuthStatus() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? (
        <p>Authenticated as {user.email}</p>
      ) : (
        <p>not authenticated</p>
      )}
    </div>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  return (
    <AuthContext.Provider value={{ user: data?.currentUser }}>
      <div className="App">
        <AuthStatus />
        <Login />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
