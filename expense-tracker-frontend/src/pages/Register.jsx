import { useState } from "react";
import API from "../services/api";

function Register() {

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
        await API.post("/auth/register", user);
        alert("User Registered Successfully");
    };

    return(
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button type="submit">Register</button>

            </form>
        </div>
    );
}

export default Register;