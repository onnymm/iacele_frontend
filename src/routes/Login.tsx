import LoginForm from "@/components/app/LoginForm"
import React from "react";

const Login = () => {

    return (
        <main className="flex justify-center items-center h-full">
            <LoginForm />
        </main>
    );
};

export default React.memo(Login);
