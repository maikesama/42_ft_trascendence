import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from "../../hooks/useAuth";

const PrivateRoutes = () => {
    const { authed } = useAuth();
    console.log("ciao ",authed);

    return(
        authed ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes
