import './PinButton.css'

export default function PinButton({ isPinned, onToggle }) {
	return (
		<button
			className={`pin-btn${isPinned ? ' pin-btn--active' : ''}`}
			onClick={onToggle}
			title={isPinned ? 'Unpin window' : 'Keep window on top'}
			aria-label={isPinned ? 'Unpin window' : 'Keep window on top'}
			aria-pressed={isPinned}
		>
			<span className="pin-btn__emoji" aria-hidden="true">📌</span>
		</button>
	)
}
