import { gql, useQuery } from "@apollo/client";

import "./App.css";
import Login from "./pages/Login";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      _id
      email
      role
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="App">
      {data?.currentUser ? (
        <p>Authenticated as {data.currentUser.email}</p>
      ) : (
        <p>not authenticated</p>
      )}
      <Login />
    </div>
  );
}

export default App;
