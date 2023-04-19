import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Auth0ProviderWithRedirectUri from "./components/Auth0Provider/auth0Provider";
// export const frontURL= `https://fromzerotodev-front.vercel.app`;
// export const backURL= `https://fromzerotodev-production.up.railway.app`
export const frontURL = `http://localhost:3000`;
export const backURL = `http://localhost:3001`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Auth0ProviderWithRedirectUri
          domain="dev-vvztjksljjvfv0t3.us.auth0.com"
          clientId="7hAv7GGHCbBdukK6oZkDWczJEcJaDISY"
          redirectUri={frontURL}
        >
          <App />
        </Auth0ProviderWithRedirectUri>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
