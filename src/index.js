import { createRoot } from "react-dom/client";
import { CallInfoProvider } from "./components/CallInfo.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Shell } from "./components/Shell.jsx";
import { Call, Landing, Error } from "./pages/";
import './styles/styles.css';

const router = createBrowserRouter([
    {
        path: '/reactRTC',
        element: <Shell />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Landing /> },
            {
                path: '/reactRTC/call',
                element: <Call />,
            }
        ]
    }
])

createRoot(document.getElementById("root")).render(
    <CallInfoProvider>
        <RouterProvider router={router} />
    </CallInfoProvider>
);