
import React, { ReactNode, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

import React, { ReactNode } from "react";
import { Auth0Provider, Auth0ProviderOptions, CacheLocation } from "@auth0/auth0-react";


interface Auth0ProviderWithRedirectUriProps extends Auth0ProviderOptions {
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
  cacheLocation = "localstorage", // los tokens se almacenarán en el almacenamiento local o de sesión del navegador
  useRefreshTokens = true // Auth0 utilizará tokens de actualización para obtener nuevos tokens de acceso automáticamente.
}: Auth0ProviderWithRedirectUriProps) => {
  const auth0Options = {
    domain,
    clientId,
    redirectUri,
    onRedirectCallback,
    cacheLocation,
    useRefreshTokens
  };

  return <Auth0Provider {...auth0Options}>{children}</Auth0Provider>;
};

export default Auth0ProviderWithRedirectUri;
