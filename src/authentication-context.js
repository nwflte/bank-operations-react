import React from 'react';
import KeycloakService from 'keycloak';

const AuthContext = React.createContext();

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

function AuthProvider(props) {
  const [userInfo] = React.useState(KeycloakService.getUserInfos());
  const value = React.useMemo(() => [userInfo], [userInfo]);
  return <AuthContext.Provider
    value={value}
    {...props}
  />;
}

export {AuthProvider, useAuth}
