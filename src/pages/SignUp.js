import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/quiz.png";

export default function SignUp() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const navigate = useNavigate();

    const logIn = (e) => {
        e.preventDefault();
        const postData = { data: { name, surname} };
        axios.post("https://pure-caverns-82881.herokuapp.com/api/v54/users", postData,
            {
                headers: {
                    "X-Access-Token": "e0b8123ec27f579c17eee96d003df3570d897b4f5d9c4d53de95b1c3f51e6fd0",
                }
            }).then((res) => {
                console.log(res);
                postData.data.id = res.data.id;
                localStorage.setItem("user-info", JSON.stringify(postData['data']))
                navigate("/landing");
            }).catch((err) => alert("This User Already Exists"));
    }

    return (
        <div className="App">
            <div className="mainContainer">
                <div className="loginContainer">
                    <img className="logoLogin" src={logo} alt="logo"/>
                    <h2>Sign Up</h2>
                    <form className="loginForm" onSubmit={logIn}>
                        <label htmlFor="name"> Name</label>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="surname">Surname</label>
                        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        <button className="loginButton" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>

    );
}