import { BrowserRouter } from "react-router";
import Router from "./router";

const Root: React.FC = () => {

    return (
        <div className='bg-background w-full h-full'>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </div>
    );
};

export default Root;
