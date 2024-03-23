import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { UserContext } from "./UserContex";
import SigninPage from "./pages/SigninPage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";

function App() {
  const [userData, setUserData] = useState();
  const user = localStorage.getItem("user");

  const getUser = async (user) => {
    if (user) {
      try {
        const responce = await fetch("http://localhost:3001/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: user,
        });

        if (responce.ok) {
          const responceJson = await responce.json();

          setUserData(responceJson);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getUser(user);
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={userData || {}}>
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
