import { createRoot } from "react-dom/client";
import App from "./App.js";
import './styles/styles.css';
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
    <NextUIProvider>
        <App />
    </NextUIProvider>
);