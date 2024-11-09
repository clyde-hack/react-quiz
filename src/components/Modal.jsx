import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './Modal.css';

export default function Modal({ children, onClose }) {
	return createPortal(
		<AnimatePresence mode="wait">
			<motion.div
				key="scrim"
				className="scrim"
				onClick={onClose}
				initial={{ opacity: 0, scale: 0.25 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.25 }}
				transition={{ duration: 0.3 }}></motion.div>
			<motion.dialog
				key="modal"
				className="modal"
				open
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0, transition: { type: 'spring' } }}
				exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}>
				{children}
			</motion.dialog>
		</AnimatePresence>,
		document.getElementById('modal')
	);
}
