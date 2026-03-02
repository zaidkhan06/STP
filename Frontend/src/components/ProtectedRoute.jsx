import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/authService";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
      const res = await checkAuth();
      console.log(res);
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };

    check();
  }, []);

  if (isAuth === null) return null;
  if (!isAuth) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;