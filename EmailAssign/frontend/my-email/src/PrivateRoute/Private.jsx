import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../COntext/context";

const Private = ({ children }) => {
  const value = useContext(AppContext);
  if (value.state) {
    return children;
  } else {
    return <Navigate to="/signup" replace={true} />;
  }
};

export default Private;
