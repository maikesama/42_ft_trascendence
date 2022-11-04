import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from "../../hooks/useAuth";

const PrivateRoutes = () => {
    const { authed } = useAuth();

    return(
        authed ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes
