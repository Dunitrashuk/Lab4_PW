import Quizes from "../components/Quizes"
import Profile from "../components/Profile";


function getUserName() {
    let name = JSON.parse(localStorage.getItem("user-info"));
    return name.name;
}

export default function Landing() {
    return(
        <div className="App">
            <div className="mainContainer">
                <Profile name={getUserName()}/>
                <div className="subMainContainer">
                    <h1>Select a Quiz</h1>
                    <Quizes />
                </div>
            </div>
        </div>
    );
}