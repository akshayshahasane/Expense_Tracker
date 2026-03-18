import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login(){

    const navigate = useNavigate();

    const [login,setLogin] = useState({
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const res = await API.post("/auth/login",login);

            alert(res.data);

            // redirect to dashboard after login
            navigate("/dashboard");

        }catch(error){
            alert("Invalid Credentials");
        }
    };

    return(

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-80 hover:scale-105 transition duration-300">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded hover:opacity-90 transition"
                    >
                        Login
                    </button>

                </form>

                {/* Register Link */}
                <p className="text-center mt-4 text-sm">
                    New user?{" "}
                    <Link to="/register" className="text-blue-500 font-semibold">
                        Register here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;

