import { Outlet } from "react-router-dom";
import NavBar from "../Nav/Nav";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
    const { user } = useAuth();
    return (
        <>
            {user && <div id="bg-c"></div>}
            <NavBar />
            <Outlet />
        </>
    );
}

export default Layout;