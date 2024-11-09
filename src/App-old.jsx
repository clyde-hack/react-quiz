import { createContext, useContext, useState } from 'react';
import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Modal from './components/Modal';
import { AnimatePresence } from 'framer-motion';
import { QUESTIONS } from './data/questions';

const QuizContext = createContext({
	questions: [],
	selectedAnswers: [],
	startTimer: false,
	updateSelectedAnswers: () => {},
	updateStartTimer: () => {}
});

export function useQuizContext() {
	const ctx = useContext(QuizContext);
	return ctx;
}

function App() {
	const [quizStarted, setQuizStarted] = useState(false);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [startTimer, setStartTimer] = useState(false);

	const showResults = selectedAnswers.length === QUESTIONS.length;

	function handleStartQuiz() {
		setQuizStarted(true);
	}

	function handleCloseModal() {
		setSelectedAnswers([]);
		setQuizStarted(false);
	}

	function updateSelectedAnswers(updatedSelectedAnswers) {
		setSelectedAnswers(updatedSelectedAnswers);
	}

	function updateStartTimer() {
		setStartTimer((prevStartTimer) => !prevStartTimer);
	}

	function calculateScore() {
		const correctAnswersQty = selectedAnswers.filter(
			(answer, index) => QUESTIONS[index].answer.toString() === answer.toString()
		).length;

		return (correctAnswersQty / QUESTIONS.length) * 100;
	}

	const ctxValue = {
		questions: QUESTIONS,
		selectedAnswers,
		startTimer,
		updateSelectedAnswers,
		updateStartTimer
	};

	return (
		<QuizContext.Provider value={ctxValue}>
			<AnimatePresence mode="wait">
				{!quizStarted && <Intro key="intro" onStartQuiz={handleStartQuiz} />}

				{quizStarted && <Quiz key="quiz" title="Chemistry quiz" />}
			</AnimatePresence>

			{showResults && (
				<Modal onClose={handleCloseModal}>
					<h3 id="score">Score: {`${calculateScore()}%`}</h3>
					<ol id="quiz-results">
						{selectedAnswers.map((answer, index) => (
							<li key={answer}>
								<span className={QUESTIONS[index].answer.toString() === answer.toString() ? 'correct' : 'wrong'}>
									{answer}
								</span>
							</li>
						))}
					</ol>
					<button id="close" onClick={handleCloseModal}>
						Close
					</button>
				</Modal>
			)}
		</QuizContext.Provider>
	);
}

export default App;
