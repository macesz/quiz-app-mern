import React from "react";
import { useState } from "react";
import { fetchQuestions } from "../../Services/apiService";
import { useNavigate } from "react-router-dom";
import "./QuizOptions.css"
import Loading from "../Loading/Loading";
import InfoModal from "../Modals/InfoModal";
import { IQuestionQuery } from "../../interfaces/IQuestionQuery";

const QuizOptions: React.FC = () => {

    const [selectedCategory, setSelectedCategory] = useState<number>(10);
    const [selectedDifficulty, setSelectedDifficulty] = useState<IQuestionQuery['difficulty']>('easy');    
    const [selectedLimit, setSelectedLimit] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorModalText, setErrorModalText] = useState({
        title: "ERROR",
        message: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        try {
            const query: IQuestionQuery = {
                category_id: selectedCategory.toString(),
                difficulty: selectedDifficulty,
                limit: selectedLimit.toString()
            };
            const questions = await fetchQuestions(query);
            navigate('/quiz', { state: { filteredQuestions: questions } });
        } catch (error: any) {
            console.error("Failed to fetch questions:", error);
            setErrorModalText({
                title: "ERROR",
                message: error.response?.data?.message || error.message || "Something went wrong."            });
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />

    return (
        <div className="box">
            <form onSubmit={handleSubmit} className="quiz-options-form">
                <div className="form-group">
                    <label>
                        Choose a Category:
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(Number(e.target.value))}>
                            <option value={10}>Book</option>
                            <option value={11}>Film</option>
                            <option value={12}>Music</option>
                            <option value={17}>Science & Nature</option>
                            <option value={23}>History</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Choose a Difficulty:
                        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Choose the number of questions (max 10):
                        <input type="number" min={1} max={10} value={selectedLimit} onChange={(e) => setSelectedLimit(Number(e.target.value))}></input>
                    </label>
                </div>
                <div className="button-group">
                    <button className="button" type="submit">Play</button>
                    <button className="button" type="button" onClick={() => navigate('/home')}>Cancel</button>
                </div>

            </form>
            {hasError && (
                <InfoModal
                    onClose={() => setHasError(false)}
                    modalText={errorModalText}
                />
            )}
        </div>
    );
};

export default QuizOptions;