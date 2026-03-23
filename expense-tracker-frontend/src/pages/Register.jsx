import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            await API.post("/auth/register", user);
            alert("User Registered Successfully");
            navigate("/");
        }catch(error){
            alert("Registration Failed");
        }
    };

    return(

        <div className="h-screen flex items-center justify-center bg-gray-200">

            <div className="bg-white p-6 rounded shadow-md w-96">

                <h2 className="text-xl font-semibold mb-4">
                    Register Page
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1">Email:</label>
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
                        Register
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center mt-4">
                    <Link to="/" className="text-blue-600">
                        Already have an account? Login here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;