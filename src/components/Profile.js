import logo from "../images/quiz.png"
import {useNavigate} from "react-router-dom";

export default function Profile(props) {
    const navigate = useNavigate();

    return (
        <div className="profileContainer">
            <img className="logoLanding" src={logo} alt="User" height={35} onClick={() => {
                navigate("/landing");}}/>
            <h3>Hi, {props.name}</h3>
            <button className="logOutButton" onClick={() => {
                navigate("/login");}}>Log Out</button>
        </div>
    );
}