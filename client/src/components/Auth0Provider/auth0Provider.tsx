import React, { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

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