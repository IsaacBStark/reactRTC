import { createRoot } from "react-dom/client";
import SimplePeer from "simple-peer";
import App from "./App.js";
import './styles/styles.css';
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
    <NextUIProvider>
        <App />
    </NextUIProvider>
);