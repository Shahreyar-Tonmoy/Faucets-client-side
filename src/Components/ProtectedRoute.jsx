/* eslint-disable react/prop-types */
import { Redirect, Route } from 'react-router-dom';


// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={props => (
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      )}
    />
  );
};

export default ProtectedRoute





