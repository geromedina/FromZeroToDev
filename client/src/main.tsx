import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Auth0ProviderWithRedirectUri from "./components/Auth0Provider/auth0Provider"; 


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
          <Auth0ProviderWithRedirectUri 
          domain='dev-c556ut7dezqsu5xn.us.auth0.com'
          clientId='Pt4iDYS5IXt3Bufu5g1aBA2NH0EkOd0h'
          redirectUri='http://localhost:3000/home' >
            <App />
          </Auth0ProviderWithRedirectUri>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
