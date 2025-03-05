import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./routes/layout/Home";
import RouteSales from "./routes/layout/Sales";
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
                    path: '/sales',
                    element: <RouteSales />
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
