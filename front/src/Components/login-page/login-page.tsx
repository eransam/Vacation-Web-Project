import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../Models/UserModel";
import store from "../../redux/Store";
import "./login-page.css";

function loginPage(): JSX.Element {

    const [user, setUser] = useState<UserModel>(null);

    // Register 
    useEffect(() => {

        // Once - update user at component load: 
        setUser(store.getState().authState.user);

        // Subscribe to store changes - whenever AuthState change - report it:
        const unsubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        // When component destroyed:
        return () => unsubscribeMe();

    }, []);

    return (
        <div className="AuthMenu">
            {user === null ?
                <>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </>
                :
                <>
                    <span>Hello {user.firstName} {user.lastName}</span>
                    <span> | </span>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            }
        </div>
    );
}

export default loginPage;
