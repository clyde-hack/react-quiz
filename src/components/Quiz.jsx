import { useCallback, useState } from 'react';
import { useQuizContext } from '../contexts/quiz-context.jsx';
import Question from './Question.jsx';
import Timer from './Timer.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import './Quiz.css';

export default function Quiz({ title }) {
	const { questions, selectedAnswers, updateSelectedAnswers, updateStartTimer } = useQuizContext();
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [isDisabled, setIsDisabled] = useState(true);

	const showTimer = selectedAnswers.length < questions.length;

	const handleSkipAnswer = useCallback(() => {
		const updatedSelectedAnswers = [...selectedAnswers, 'Unanswered'];

		updateSelectedAnswers(updatedSelectedAnswers);

		updateStartTimer();

		setActiveQuestion((prevActiveQuestion) => {
			if (prevActiveQuestion === questions.length - 1) {
				return prevActiveQuestion;
			}

			return prevActiveQuestion + 1;
		});
	}, [selectedAnswers]);

	function handleSelectAnswer(event) {
		const updatedSelectedAnswers = [...selectedAnswers];
		updatedSelectedAnswers[activeQuestion] = event.target.value;

		setIsDisabled(updatedSelectedAnswers.length === questions.length);
		updateSelectedAnswers(updatedSelectedAnswers);
	}

	function handleNextBtnClick() {
		updateStartTimer();
		setActiveQuestion((prevActiveQuestion) => prevActiveQuestion + 1);
		setIsDisabled(true);
	}

	return (
		<motion.section
			id="questions"
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
			}}
			initial="hidden"
			animate="visible"
			exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}>
			<h2>{title}</h2>

			{showTimer && <Timer key={activeQuestion} timeout={15000} onTimeOut={handleSkipAnswer} />}

			<article className="question">
				<AnimatePresence initial={false} mode="wait">
					<Question key={activeQuestion} question={questions[activeQuestion]} onSelectAnswer={handleSelectAnswer} />
				</AnimatePresence>

				<button className="next-question" disabled={isDisabled} onClick={handleNextBtnClick}>
					Next
				</button>
			</article>
		</motion.section>
	);
}
