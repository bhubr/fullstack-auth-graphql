import { gql, useQuery } from '@apollo/client';

import './App.css';
import Login from './pages/Login';

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
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
