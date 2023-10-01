import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../component/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  // if(!loading) {
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/shop-login`} replace />;
    } else {
      // return <>{children}</>
      return children;
    }
  }
};

export default SellerProtectedRoute;
