import Profile from "../components/Profile";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Quiz() {

    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState();
    const [loading , setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answersList, setAnswer] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const navigate = useNavigate();


    function getUserName() {
        let name = JSON.parse(localStorage.getItem("user-info"));
        return name.name;
    }

    function getQuizId() {
        return localStorage.getItem("quiz-id");

    }

    function getUserId() {
        return JSON.parse(localStorage.getItem("user-info")).id;
    }

    function goToNextQuestion(e) {
        if(currentQuestion < 10) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    }

    function calculateScore(answers) {
        let cnt = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i])
                cnt++;
        }
        return cnt
    }

    function postAnswer(question_id, answer, user_id) {
        const postData = { data: { question_id, answer, user_id} };
        axios.post("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/" + getQuizId() + "/submit", postData,
            {
                headers: {
                    "X-Access-Token": "9ec9dddd1901d812bb3a3b1b80fbc664bc98b424bca50dbabe9d150bed730da0",
                }
            }).then((res) => {
            setAnswer([...answersList ,res.data.correct]);
        }).catch((err) => alert("Incorrect data"));
    }

    useEffect(() => {
        axios.get("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/" + getQuizId(), {
            headers: {
                "X-Access-Token": "9ec9dddd1901d812bb3a3b1b80fbc664bc98b424bca50dbabe9d150bed730da0"
            }
        }).then((res) => {
            setQuiz(res.data);
            setQuestions(res.data["questions"]);
            setLoading(false);
        }).catch((err) => console.log(err));
    }, []);

    if(loading) {
        return (
            <div className="App">
                <div className="mainContainer">
                </div>
            </div>
        );
    }

    if(showScore) {
        return (
            <div className="App">
                <div className="mainContainer">
                    <Profile name={getUserName()}/>
                    <div className="scoreContainer">
                        <h3>Your score is {calculateScore(answersList)} / {quiz["questions"].length}</h3>
                        <button className="logOutButton" onClick={() => navigate("/landing")}>Go Back</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <div className="mainContainer">
                <Profile name={getUserName()}/>
                    <div className="fullQuestionContainer">
                        <h3> {currentQuestion} / {quiz["questions"].length}</h3>
                        <div className="questionContainer">
                            <h3>{questions[currentQuestion - 1]["question"]}</h3>
                        </div>
                        <div className="answersContainer">
                            {questions[currentQuestion - 1]["answers"].map(answer => <div id={questions[currentQuestion - 1].id} className="answerContainer" onClick={(e) =>{ postAnswer(questions[currentQuestion - 1].id, answer, getUserId()); goToNextQuestion(e);}}>{answer}</div>)}
                        </div>
                    </div>
            </div>
        </div>
    );
}