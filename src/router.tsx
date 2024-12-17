import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./routes/layout/Home";
import RouteCommissions from "./routes/layout/Commissions";
import RouteUITests from "./routes/layout/UITests";

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
                },
                {
                    path: '/uitests',
                    element: <RouteUITests />
                }
            ]
        }
    ]
)

export default router;
