import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return userInfo ? element : <Navigate to="/login" />;

}
export default PrivateRoute;
