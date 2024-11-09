import { motion } from 'framer-motion';
import './Intro.css';

export default function Intro({ onCTA }) {
	return (
		<motion.section
			id="intro"
			initial={{ opacity: 0, scale: 0.25 }}
			animate={{ opacity: 1, scale: 1, transition: { type: 'spring' } }}
			exit={{ opacity: 0, scale: 0.25, transition: { duration: 0.3 } }}>
			<h2>The goal</h2>

			<p>
				There are 10 questions on the subject of chemistry. You have 15 seconds to select an answer for each question.
			</p>

			<p>Once you start the quiz, you can&apos;t stop the timer,</p>

			<h3>Good luck!</h3>

			<button onClick={onCTA}>Start Quiz</button>
		</motion.section>
	);
}
