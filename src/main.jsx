import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { extractAccessToken } from "./utils/authHandler.js";
import { StrictMode } from "react";
import App from "./App.jsx";

extractAccessToken();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
