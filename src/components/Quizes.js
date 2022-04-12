import axios from "axios";
import {useEffect, useState} from "react";
import html from "../images/html.png";
import js from "../images/java-script.png";
import css from "../images/css.png";
import {useNavigate} from "react-router-dom";


export default function Quizes() {
    const [quizesList, setQuizes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes", {
            headers: {
                "X-Access-Token": "e0b8123ec27f579c17eee96d003df3570d897b4f5d9c4d53de95b1c3f51e6fd0"
            }
        }).then((res) => {
            setQuizes(res.data);
        }).catch((err) => console.log(err));
    }, []);

    function goToQuiz(e) {
        localStorage.setItem("quiz-id", e.target.id);
        navigate("/quiz");
    }

    return (
        <div className="quizesContainer">
            {quizesList.map(quiz =>
                <div key={quiz.id} id={quiz.id} className="quizContainer" onClick={goToQuiz}>
                    {quiz.id === 103 && <img id={quiz.id} src={js} alt={js} height={100} onClick={goToQuiz}/>}
                    {quiz.id === 104 && <img id={quiz.id} src={html} alt={js} height={100} onClick={goToQuiz}/>}
                    {quiz.id === 105 && <img id={quiz.id} src={css} alt={js} height={100} onClick={goToQuiz}/>}
                </div>
            )}
        </div>
    );
}