import { Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';


function ProtectedRoute({children}) {

  const userData = secureLocalStorage.getItem('user');

  return userData ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;