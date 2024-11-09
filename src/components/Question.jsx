import { motion } from 'framer-motion';
import { useQuizContext } from '../contexts/quiz-context';

export default function Question({ question, onSelectAnswer }) {
	const { updateStartTimer } = useQuizContext();

	return (
		<motion.fieldset
			className="question-options"
			variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
			onAnimationComplete={updateStartTimer}>
			<motion.legend
				key={question}
				variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0, transition: { type: 'spring' } } }}
				exit={{ opacity: 0, x: -15 }}>
				{`${question.id}.`} {question.question}
			</motion.legend>

			{question.options.map((option) => (
				<motion.label
					key={option}
					variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' } } }}
					exit={{ opacity: 0, y: 15 }}>
					<input type="radio" name={question.id} value={option} onInput={onSelectAnswer} />
					{option}
				</motion.label>
			))}
		</motion.fieldset>
	);
}
