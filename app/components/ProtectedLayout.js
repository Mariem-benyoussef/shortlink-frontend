"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { loginSuccess, logout } from "../redux/slices/authSlice";

export default function ProtectedLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(
          loginSuccess({
            user: parsedUser,
            token: storedToken,
          })
        );
      } catch (error) {
        console.error(
          "Erreur lors de la lecture des données utilisateur :",
          error
        );
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      if (pathname && pathname.startsWith("/admin")) {
        if (user?.role !== "admin") {
          router.push("/unauthorized");
          return;
        }
      }

      if (pathname === "/auth/login" || pathname === "/auth/register") {
        return;
      }
    }
  }, [loading, isAuthenticated, user, router, pathname]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return <>{children}</>;
}
