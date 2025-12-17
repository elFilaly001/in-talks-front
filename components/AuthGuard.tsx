"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const allowedPaths = ["/", "/login", "/register"];

type AuthContextValue = {
    isAuthenticated: boolean | undefined;
    refresh: () => void;
};

const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: undefined,
    refresh: () => { },
});

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // Start as `undefined` so server and initial client render are consistent.
    // We set the real value on mount inside useEffect which avoids hydration
    // mismatches when client auth differs from the server.
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("token");
        const path = pathname || window.location.pathname;

        // If the path is allowed for unauthenticated users, just set state and return
        if (allowedPaths.includes(path)) {
            setIsAuthenticated(!!token);
            return;
        }

        // Otherwise, if there's no token, redirect to /login
        if (!token) {
            router.push("/login");
            setIsAuthenticated(false);
            return;
        }

        setIsAuthenticated(!!token);
    }, [pathname, router]);

    const refresh = () => {
        if (typeof window === "undefined") return;
        setIsAuthenticated(!!localStorage.getItem("token"));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}
