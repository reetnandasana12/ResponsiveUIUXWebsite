import { Navigate, Outlet } from "react-router-dom";
import { useLoginStore } from "./store/authStore";

function LoginRoute() {
    const isLogin = useLoginStore((state) => state.isLogin)
    console.log(isLogin)

    return isLogin == false ? <Outlet /> :<Navigate to="/"/>;
}
export default LoginRoute;