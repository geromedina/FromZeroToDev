import React, { ReactNode, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [token, setToken] = useState({});
//   if (!token) {
//     return <Navigate to="/register" replace={true} />;
//   }
//   return <>{children}</>;
// };



interface Auth0ProviderWithRedirectUriProps {
    children: ReactNode;
    domain: string;
    clientId: string;
    redirectUri?: string;
    onRedirectCallback?: (appState: any) => void;
  }
  
  const Auth0ProviderWithRedirectUri = ({
    children,
    domain,
    clientId,
    redirectUri,
    onRedirectCallback,
  }: Auth0ProviderWithRedirectUriProps) => {
    const auth0Options = {
      domain,
      clientId,
      redirectUri,
      onRedirectCallback,
    };
  
    return <Auth0Provider {...auth0Options}>{children}</Auth0Provider>;
  };
  
  export default Auth0ProviderWithRedirectUri;