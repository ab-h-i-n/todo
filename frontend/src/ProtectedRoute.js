import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContex';

function ProtectedRoute({children}) {

  const userData = localStorage.getItem('user');

  console.log(userData);

  return userData ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;