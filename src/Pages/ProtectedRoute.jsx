import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => state.token);

    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute;