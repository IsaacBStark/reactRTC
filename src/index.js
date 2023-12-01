import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { CallInfoProvider } from "./components/CallInfo.jsx";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { Shell } from "./components/Shell.jsx";
import { Call, Landing, Error } from "./pages/";
import './styles/styles.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Shell />,
        errorElement: <Error />,
        children: [
            {index: true, element: <Landing />},
            {
                path: 'call/',
                element: <Call />,
            }
        ]
    }
])

createRoot(document.getElementById("root")).render(
    <CallInfoProvider>
        <NextUIProvider>
            <RouterProvider router={router} />
        </NextUIProvider>
    </CallInfoProvider>
);