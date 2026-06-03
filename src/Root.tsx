import { BrowserRouter } from "react-router";
import Router from "./router";

const Root: React.FC = () => {

    return (
        <div className='bg-slate-100 dark:bg-[#101b26] h-full'>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </div>
    );
};

export default Root;
