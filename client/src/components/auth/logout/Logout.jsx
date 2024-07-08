import { useContext, useEffect } from "react";

import * as authService from "../../../services/authService";
import AuthContext from "../../../contexts/authContext";

export default function Logout() {
    const { logoutHandler, accessToken } = useContext(AuthContext);
    
    useEffect(() => {
        authService.logout(accessToken)
            .then(() => logoutHandler());
    }, []);
}