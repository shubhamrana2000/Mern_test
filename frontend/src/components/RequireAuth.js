import { useEffect } from "react";
import authStore from "../stores/authStore";
import { Navigate } from "react-router-dom";

export default function RequireAuth(props) {
  const store = authStore();
  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, [store]);
  if (store.loggedIn === null) return <div> loading</div>;
  if (store.loggedIn === false) return <Navigate to="/Login" />;
  return <div>{props.children}</div>;
}
