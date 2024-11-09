import { useEffect, useState } from 'react';
import { useQuizContext } from '../contexts/quiz-context';
import './Timer.css';

export default function Timer({ timeout, onTimeOut }) {
	const { startTimer } = useQuizContext();
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		const timer = setTimeout(onTimeOut, timeout);

		if (!startTimer) clearTimeout(timer);

		return () => clearTimeout(timer);
	}, [timeout, onTimeOut, startTimer]);

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime((prevTimeRemaining) => prevTimeRemaining - 100);
		}, 100);

		if (!startTimer) clearInterval(interval);

		return () => clearInterval(interval);
	}, [startTimer]);

	return <progress className="timer" value={remainingTime} max={timeout}></progress>;
}
