import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';

const PrivateRoute = ({ element }) => {
  const { authState } = useContext(AuthContext);

  return authState ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
