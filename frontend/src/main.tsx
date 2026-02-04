import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.tsx";
import { TavernContextProvider } from "./context/TavernContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TavernContextProvider>
      <RouterProvider router={router} />
    </TavernContextProvider>
  </StrictMode>,
);
