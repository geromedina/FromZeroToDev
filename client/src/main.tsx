import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Auth0ProviderWithRedirectUri from "./components/Auth0Provider/auth0Provider"; 
import dotenv from 'dotenv';
dotenv.config();


const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
          <Auth0ProviderWithRedirectUri 
          domain={domain!}
          clientId={clientId!}
          redirectUri={window.location.origin}>
            <App />
          </Auth0ProviderWithRedirectUri>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
