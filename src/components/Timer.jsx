import './Timer.css'

const RING_RADIUS = 230
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function formatTime(totalSeconds) {
	const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
	const s = String(totalSeconds % 60).padStart(2, '0')
	return `${m}:${s}`
}

function buttonLabel(isRunning, hasPaused) {
	if (isRunning) return 'Pause'
	if (hasPaused) return 'Resume'
	return 'Start'
}

function Timer({ timeLeft, isRunning, hasPaused, pausedElapsed, progress, isFinished, onToggle, onIncrement, onDecrement, onReset }) {
	const showPausedTimer = hasPaused && !isRunning
	const isActive = isRunning || hasPaused
	const dashOffset = RING_CIRCUMFERENCE * (1 - progress)

	return (
		<div className="timer-container">
			<div className={`timer-display-wrapper ${!isActive && !isFinished ? 'idle' : ''}`}>
				<svg
					className={`progress-ring ${isActive ? 'active' : ''}`}
					viewBox="0 0 480 480"
				>
					<circle
						className="progress-ring-track"
						cx="240"
						cy="240"
						r={RING_RADIUS}
						fill="none"
						strokeWidth="1"
					/>
					<circle
						className="progress-ring-fill"
						cx="240"
						cy="240"
						r={RING_RADIUS}
						fill="none"
						strokeWidth="1.5"
						strokeDasharray={RING_CIRCUMFERENCE}
						strokeDashoffset={dashOffset}
						strokeLinecap="round"
						transform="rotate(-90 240 240)"
					/>
				</svg>
				<div className="timer-display">
					{(() => {
						const m = String(Math.floor(timeLeft / 60)).padStart(2, '0')
						const s = String(timeLeft % 60).padStart(2, '0')
						return <>
							<span key={`m0-${m[0]}`} className="digit">{m[0]}</span>
							<span key={`m1-${m[1]}`} className="digit">{m[1]}</span>
							<span className="digit-sep">:</span>
							<span key={`s0-${s[0]}`} className="digit">{s[0]}</span>
							<span key={`s1-${s[1]}`} className="digit">{s[1]}</span>
						</>
					})()}
				</div>
			</div>
			{isFinished ? (
				<div className="timer-controls">
					<button className="reset-btn" onClick={onReset}>
						Restart
					</button>
				</div>
			) : (
				<div className="timer-controls">
					<button
						className="adjust-btn"
						onClick={onDecrement}
					>
						-1:00
					</button>
					<button
						className="start-btn"
						onClick={onToggle}
						disabled={timeLeft === 0 && !isRunning}
					>
						{buttonLabel(isRunning, hasPaused)}
					</button>
					<button
						className="adjust-btn"
						onClick={onIncrement}
					>
						+1:00
					</button>
					<div className={`paused-timer ${showPausedTimer ? 'visible' : ''}`}>
						Paused for {formatTime(pausedElapsed)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Timer
