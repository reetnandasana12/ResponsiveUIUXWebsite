import { Navigate, Outlet } from "react-router-dom";
import { useLoginStore } from "./store/authStore";

export function UserRoute() {
    const userType = useLoginStore((state) => state.userType)
    const getType = useLoginStore((state) => state.getType)
    getType()
    console.log(userType)

    return userType == "user" ?
        <Outlet />
        : <Navigate to={'/auth/register'} />;
}

export function AdminRoute() {
    const userType = useLoginStore((state) => state.userType)
    const getType = useLoginStore((state) => state.getType)
    getType()
    console.log(userType)

    return userType == "admin" ?
        <Outlet /> : <Navigate to={'/auth/register'} />;
}
