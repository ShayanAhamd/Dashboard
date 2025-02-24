import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
