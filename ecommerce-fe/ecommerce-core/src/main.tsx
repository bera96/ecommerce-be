import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import initStore from "./store/store.ts";
import "./i18n/config.ts";

const root = createRoot(document.getElementById("root") as HTMLElement);

initStore().then((Store) => {
  root.render(
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});
