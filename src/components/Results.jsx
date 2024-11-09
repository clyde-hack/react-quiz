import { useQuizContext } from '../contexts/quiz-context';
import Modal from './Modal';
import { AnimatePresence } from 'framer-motion';
import './Results.css';

export default function Results({ onClose }) {
	const { questions, selectedAnswers, updateSelectedAnswers } = useQuizContext();
	const showResults = selectedAnswers.length === questions.length;

	function calculateScore() {
		const correctAnswersQty = selectedAnswers.filter(
			(answer, index) => questions[index].answer.toString() === answer.toString()
		).length;

		return (correctAnswersQty / questions.length) * 100;
	}

	function handleCloseModal() {
		updateSelectedAnswers([]);
		onClose();
	}

	return (
		<AnimatePresence>
			{showResults && (
				<Modal onClose={handleCloseModal}>
					<h3 id="score">Score: {`${calculateScore()}%`}</h3>
					<ol id="quiz-results">
						{selectedAnswers.map((answer, index) => (
							<li key={answer}>
								<span className={questions[index].answer.toString() === answer.toString() ? 'correct' : 'wrong'}>
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
		</AnimatePresence>
	);
}
