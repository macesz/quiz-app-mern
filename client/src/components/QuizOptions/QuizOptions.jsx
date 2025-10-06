import { useState } from "react";
import { fetchQuestions } from "../../apis.js";
import { useNavigate } from "react-router-dom";
import "./QuizOptions.css"
import Loading from "../Loading/Loading.jsx";
import InfoModal from "../Modals/InfoModal.jsx";

const QuizOptions = () => {

    const [selectedCategory, setSelectedCategory] = useState(10);
    const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
    const [selectedLimit, setSelectedLimit] = useState(3);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorModalText, setErrorModalText] = useState({
        title: "ERROR",
        message: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const questions = await fetchQuestions(selectedDifficulty, selectedCategory, selectedLimit)
            navigate('/quiz', { state: { filteredQuestions: questions } });
        } catch (error) {
            console.error("Failed to fetch questions:", error);
            setErrorModalText({
                title: "ERROR",
                message: error.message || "Something went wrong. Please try again."
            });
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
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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