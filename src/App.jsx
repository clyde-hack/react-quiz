import { useState } from 'react';
import QuizContextProvider from './contexts/quiz-context';
import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { AnimatePresence } from 'framer-motion';

function App() {
	const [quizStarted, setQuizStarted] = useState(false);

	function handleStartQuiz() {
		setQuizStarted(true);
	}

	function handleResetQuiz() {
		setQuizStarted(false);
	}

	return (
		<QuizContextProvider>
			<AnimatePresence initial={false} mode="wait">
				{!quizStarted && <Intro key="intro" onCTA={handleStartQuiz} />}

				{quizStarted && <Quiz key="quiz" title="Chemistry quiz" />}
			</AnimatePresence>

			<Results onClose={handleResetQuiz} />
		</QuizContextProvider>
	);
}

export default App;
