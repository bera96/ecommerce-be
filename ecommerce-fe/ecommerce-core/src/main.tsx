import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import initStore from "./store/store.ts";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config.ts";

const root = createRoot(document.getElementById("root") as HTMLElement);

initStore().then((Store) => {
  root.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={Store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  );
});
