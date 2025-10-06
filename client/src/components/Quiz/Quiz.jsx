import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import InfoModal from "../Modals/InfoModal.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css"
import Loading from "../Loading/Loading";
import { postGameResult } from "../../apis";
import { useAuth } from "../../context/AuthContext.jsx";

const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const shuffleAnswers = (question) => {
    const answers = [...question.incorrect_answers, question.correct_answer];

    let currentIndex = answers.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [answers[currentIndex], answers[randomIndex]] = [
            answers[randomIndex], answers[currentIndex]];
    }
    return answers.map(answer => decodeHtml(answer));
}

const Quiz = () => {
    const [currentQuestionObject, setCurrentQuestionObject] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [currentAnswers, setCurrentAnswers] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [isCorrect, setIsCorrect] = useState(null)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false)
    const [showCorrect, setShowCorrect] = useState(false)
    const [loading, setLoading] = useState(false);
    const [modalText, setModalText] = useState({
        title: "Congratulation, you finished the quiz! You had 0 correct answer(s).",
        message: "Lets play again and try out other categories!"
    })

    const navigate = useNavigate();
    const { user } = useAuth();
    const { filteredQuestions } = useLocation().state;

    useEffect(() => {
        if (filteredQuestions && filteredQuestions.length > 0) {
            loadQuestion(0);
        }
    }, [filteredQuestions])

    const loadQuestion = (index) => {
        setLoading(true);
        setTimeout(() => {
            const questionObj = filteredQuestions[index];
            setCurrentQuestionObject(questionObj);
            setCurrentQuestion(decodeHtml(questionObj.question));
            setCurrentAnswers(shuffleAnswers(questionObj));
            setSelectedAnswer(null);
            setIsCorrect(null);
            setShowCorrect(false);
            setLoading(false);
        }, 100);
    }

    const handleChoose = (event) => {
        const answer = event.target.innerText;
        const wasCorrect = answer === currentQuestionObject.correct_answer;
        const updatedCorrectAnswers = wasCorrect ? correctAnswers + 1 : correctAnswers;

        setSelectedAnswer(answer);
        setIsCorrect(wasCorrect);
        setCorrectAnswers(updatedCorrectAnswers);

        if (!wasCorrect) {
            setShowCorrect(true)
        }

        setTimeout(() => {
            if (currentIndex < filteredQuestions.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                loadQuestion(nextIndex);
            } else {
                setCurrentQuestionObject(null)
                setModalText({
                    title: `Congratulation, you finished the quiz! You had ${updatedCorrectAnswers} correct answer(s).`,
                    message: "Lets play again and try out other categories!"
                  })
                setShowResult(true)
            }
        }, 2000);
    }

    const handleResultShowClose = async () => {
        setLoading(true);
        await postGameResult(user, correctAnswers, filteredQuestions.length);
        setShowResult(false);
        setLoading(false);
        navigate('/home')
    }

    const renderAnswerButton = (answer, index) => {
        const isSelected = selectedAnswer === answer;
        const isRight = decodeHtml(currentQuestionObject.correct_answer) === answer;

        const classes = [
            "answer-button",
            isSelected && (isCorrect ? "correct" : "incorrect"),
            !isSelected && isRight && showCorrect && "highlight-correct",
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <button key={index} className={classes} onClick={handleChoose}>
                {answer}
            </button>
        );
    };

    if (loading) return <Loading/>

    return (
        <>
            {currentQuestionObject ? (
                <div className="box"  >
                    <div className="question">
                        <p>{currentQuestion}</p>
                        <div className="answers">
                            {currentAnswers && currentAnswers.map(renderAnswerButton)}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {showResult && createPortal(
                        <InfoModal modalText={modalText} onClose={handleResultShowClose} />,
                        document.body
                    )}
                </div>
            )}

        </>
    );
}

export default Quiz;
