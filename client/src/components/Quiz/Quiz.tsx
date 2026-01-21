import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import InfoModal, { ModalContent } from "../Modals/InfoModal";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css"
import Loading from "../Loading/Loading";
import { postGameResult } from "../../Services/apiService";
import { useAuth } from "../../context/AuthContext";
import { IQuestion } from "../../interfaces/IQuestion";

const decodeHtml = (html: string): string => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const shuffleAnswers = (question: IQuestion): string[] => {
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

interface LocationState {
    filteredQuestions: IQuestion[];
}

const Quiz: React.FC = () => {
    const [currentQuestionObject, setCurrentQuestionObject] = useState<IQuestion | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
    const [currentAnswers, setCurrentAnswers] = useState<string[] | null>(null)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [correctAnswers, setCorrectAnswers] = useState<number>(0)
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false)
    const [showCorrect, setShowCorrect] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [modalText, setModalText] = useState<ModalContent>({
        title: "Congratulation, you finished the quiz! You had 0 correct answer(s).",
        message: "Lets play again and try out other categories!"
    })

    const navigate = useNavigate();
    const { user } = useAuth();

    const location = useLocation();
    const state = location.state as LocationState;
    const filteredQuestions = state?.filteredQuestions || [];

    useEffect(() => {
        if (filteredQuestions && filteredQuestions.length > 0) {
            loadQuestion(0);
        } else {
            navigate('/quiz-options');
        }
    }, [filteredQuestions])

    const loadQuestion = (index: number) => {
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

    const handleChoose = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(!currentQuestionObject || selectedAnswer) return;

        const answer = (event.target as HTMLButtonElement).innerText;
        
        const decodeCorrect = decodeHtml(currentQuestionObject.correct_answer); 
        const wasCorrect = answer === decodeCorrect;

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
        if (!user) return;
        setLoading(true);

        const token = localStorage.getItem('token') || '';

        await postGameResult(token, {
            user_id: user._id,
            correct: correctAnswers,
            question_number: filteredQuestions.length,
            rate: correctAnswers / filteredQuestions.length
        });
        setShowResult(false);
        setLoading(false);
        navigate('/home')
    }

    const renderAnswerButton = (answer: string, index: number) => {
        if (!currentQuestionObject) return null;

        const isSelected = selectedAnswer === answer;
        const isRight = decodeHtml(currentQuestionObject.correct_answer) === answer 

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
