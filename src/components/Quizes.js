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
                "X-Access-Token": "9ec9dddd1901d812bb3a3b1b80fbc664bc98b424bca50dbabe9d150bed730da0"
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
                    {quiz.id > 105 && <h3>{quiz.title}</h3>}
                </div>
            )}
            <div className="createQuizContainer" onClick={() => navigate("/makeQuiz")}>Create Quiz</div>
        </div>
    );
}