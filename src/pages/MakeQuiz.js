import Profile from "../components/Profile";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function MakeQuiz() {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([{question:'',answers:[],correct_answer:''}])
    const [title, setTitle] = useState("Quiz Title");
    const [correctAnswer, setCorrectAnswer] = useState('correct answer');
    const [question, setQuestion] = useState('Question ?');
    const [answer1, setAnswer1] = useState('answer1');
    const [answer2, setAnswer2] = useState('answer2');
    const [answer3, setAnswer3] = useState('answer3');
    const [answer4, setAnswer4] = useState('answer4');

    function handleSubmit(e) {
        questions.shift();
        addQuestion(e);

        let data = {data: {title, questions}};

        axios.post("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes", data,
            {
                headers: {
                    "X-Access-Token": "9ec9dddd1901d812bb3a3b1b80fbc664bc98b424bca50dbabe9d150bed730da0",
                }
            }).then((res) => {
                navigate("/landing");
        }).catch((err) => alert("Quiz not posted"));
    }

    function addQuestion(e) {
        e.preventDefault();
        setQuestions([...questions, {question: question, answers: [answer1, answer2, answer3, answer4], correct_answer: correctAnswer}]);
    }

    function getUserName() {
        let name = JSON.parse(localStorage.getItem("user-info"));
        return name.name;
    }

    return (
        <div className="App">
            <div className="mainContainer">
                <Profile name={getUserName()}/>
                <form className="fullQuestionContainer" onSubmit={handleSubmit}>
                    <input type="text" className="customQuestionContainer" placeholder={title} onChange={(e) => setTitle(e.target.value)}/>
                    <input type="text" className="customQuestionContainer" placeholder={question} onChange={(e) => setQuestion(e.target.value)}/>
                    <div className="customAnswersContainer">
                        <input type="text" className="customAnswerContainer" placeholder={answer1} name="answer1" onChange={(e) => setAnswer1(e.target.value)}/>
                        <input type="text" className="customAnswerContainer" placeholder={answer2} name="answer2" onChange={(e) => setAnswer2(e.target.value)}/>
                        <input type="text" className="customAnswerContainer" placeholder={answer3} name="answer3" onChange={(e) => setAnswer3(e.target.value)}/>
                        <input type="text" className="customAnswerContainer" placeholder={answer4} name="answer4" onChange={(e) => setAnswer4(e.target.value)}/>
                    </div>
                    <input type="text" className="customAnswerContainer" placeholder={correctAnswer} name="correctAnswer" onChange={(e) => setCorrectAnswer(e.target.value)}/>
                    <button className="logOutButton" onClick={addQuestion}>Add Question</button>
                    <button className="logOutButton" type="submit">Submit Quiz</button>
                </form>
            </div>
        </div>
    );
}