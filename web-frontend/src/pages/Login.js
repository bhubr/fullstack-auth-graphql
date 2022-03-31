import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "./Login.css";

// Define mutation
const LOGIN = gql`
mutation LoginMutation($email: String, $password: String) {
  login(email: $email, password: $password) {
    user {
      _id
      email
      role
    }
    jwt
  }
}
`;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [sendLogin, { data, loading, error }] = useMutation(LOGIN);

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData(({ ...formData, [name]: value }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    sendLogin({ variables: formData });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="Login">
      <h2>Login</h2>
      {data && JSON.stringify(data.login)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailInput">
          Email address
          <input
            type="email"
            id="emailInput"
            name="email"
            placeholder="johndoe@email.com"
            onChange={handleChange}
            value={formData.email}
          />
        </label>

        <label htmlFor="passwordInput">
          Password
          <input
            type="password"
            id="passwordInput"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
