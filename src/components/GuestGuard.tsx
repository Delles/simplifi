import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";

export const GuestGuard = ({ children }: PropsWithChildren) => {
    const isLoggedIn = useGetIsLoggedIn();

    if (isLoggedIn) {
        // If the user is logged in, redirect to the main app page
        return <Navigate to="/app" replace />;
    }

    // If not logged in, render the children (the public page)
    return <>{children}</>;
};
