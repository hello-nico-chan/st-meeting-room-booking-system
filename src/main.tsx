import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { configureStore } from '@reduxjs/toolkit';
import reducer from './store/reducer';
import { Provider } from 'react-redux';

const store = configureStore({ reducer });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
