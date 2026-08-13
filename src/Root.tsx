import { BrowserRouter } from "react-router";
import Router from "./router";

const Root = () => {

    return (
        <div className='bg-background w-full h-full'>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </div>
    );
};

export default Root;
