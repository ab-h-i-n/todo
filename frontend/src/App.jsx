import React, {  useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { UserContext } from "./UserContex";
import SigninPage from "./pages/SigninPage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";

function App() {

  const [userData, setUserData] = useState();
  

  return (
    <UserContext.Provider value={{userData , setUserData}}>
      <BrowserRouter>
        <Routes>
          {/* authentication routes  */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />

          {/* protected routes  */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
