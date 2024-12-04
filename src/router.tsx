import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./routes/layout/Home";
import RouteCommissions from "./routes/layout/Commissions";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: '/commissions',
                    element: <RouteCommissions />
                }
            ]
        }
    ]
)

export default router;
