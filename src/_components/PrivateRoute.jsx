import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : newFunction(props)
    )} />
)

function newFunction(props) {
  // if(props.location.pathname === '/home'){
  //   console.log('voy a home')
  //   return null
  // }
  // console.log('no es home')
  return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
}
