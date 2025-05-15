import { type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";

export const AuthGuard = ({ children }: PropsWithChildren) => {
    const isLoggedIn = useGetIsLoggedIn();
    const location = useLocation();

    if (!isLoggedIn) {
        // Redirect them to the home page, passing the current location that they were
        // trying to go to so we can send them along after they login.
        // However, our current login buttons redirect to /app, so state passing for redirection
        // might not be immediately used unless login flow is changed.
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>; // If logged in, render the children components
};
