import { gql, useQuery } from "@apollo/client";

import AuthContext from "../contexts/auth";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      _id
      email
      role
    }
  }
`;

function AuthProvider({ children }) {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ user: data?.currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;