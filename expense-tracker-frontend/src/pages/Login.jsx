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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", login);

            // Always log the actual data
            console.log("LOGIN RESPONSE:", res.data); // { message: "...", userId: ... }

            // Correct key from your DTO
            localStorage.setItem("userId", res.data.userId);

            alert(res.data.message); // Use message from backend
            navigate("/dashboard");

        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Invalid Credentials");
        }
    };

    return(

        <div className="h-screen flex items-center justify-center bg-gray-200">

            <div className="bg-white p-6 rounded shadow-md w-96">

                <h2 className="text-xl font-semibold mb-4">
                    Login Page
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Username */}
                    <div>
                        <label className="block mb-1">Username:</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Button */}
                    <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                        Login
                    </button>

                </form>

                {/* Register Link */}
                <p className="text-center mt-4">
                    <Link to="/register" className="text-blue-600">
                        New user? Register here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;