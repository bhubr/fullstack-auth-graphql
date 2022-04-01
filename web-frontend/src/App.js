import { useContext } from "react";


import "./App.css";
import Login from "./pages/Login";
import AuthProvider from "./components/AuthProvider";
import AuthStatus from "./components/AuthStatus";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AuthStatus />
        <Login />
      </div>
    </AuthProvider>
  );
}

export default App;
