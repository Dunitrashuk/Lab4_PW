import Profile from "../components/Profile";
import {useEffect, useState} from "react";
import axios from "axios";


export default function Quiz() {

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

    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState();
    const [loading , setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answersList, setAnswer] = useState([]);
    const [showScore, setShowScore] = useState(false);

    function postAnswer(question_id, answer, user_id) {
        const postData = { data: { question_id, answer, user_id} };
        axios.post("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/" + getQuizId() + "/submit", postData,
            {
                headers: {
                    "X-Access-Token": "e0b8123ec27f579c17eee96d003df3570d897b4f5d9c4d53de95b1c3f51e6fd0",
                }
            }).then((res) => {
            setAnswer([...answersList ,res.data.correct]);
        }).catch((err) => alert("Incorrect data"));
    }

    function goToNextQuestion(e) {
        if(currentQuestion < 10) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    }

    function calculateScore(answers){
        let cnt = 0;
        for(let i = 0; i < answers.length; i++) {
            if(answers[i])
                cnt++;
        }
        return cnt
    }

    useEffect(() => {
        axios.get("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/" + getQuizId(), {
            headers: {
                "X-Access-Token": "e0b8123ec27f579c17eee96d003df3570d897b4f5d9c4d53de95b1c3f51e6fd0"
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
                        <h3>Your score is {calculateScore(answersList)} / {quiz["questions"].length}</h3>
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