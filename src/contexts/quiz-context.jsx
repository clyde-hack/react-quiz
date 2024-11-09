import { createContext, useContext, useState } from 'react';
import { QUESTIONS } from '../data/questions';

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

export default function QuizContextProvider({ children }) {
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [startTimer, setStartTimer] = useState(false);

	function updateSelectedAnswers(updatedSelectedAnswers) {
		setSelectedAnswers(updatedSelectedAnswers);
	}

	function updateStartTimer() {
		setStartTimer((prevStartTimer) => !prevStartTimer);
	}

	const ctxValue = {
		questions: QUESTIONS,
		selectedAnswers,
		startTimer,
		updateSelectedAnswers,
		updateStartTimer
	};

	return <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>;
}
