import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get(
          "http://localhost:5000/api/auth/check",
          { withCredentials: true }
        );
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