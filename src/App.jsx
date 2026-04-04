import { useState, useEffect, useCallback } from 'react'
import { THEMES } from './utils/themes'
import { useTimer } from './hooks/useTimer'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import Timer from './components/Timer'
import ThemeSwitcher from './components/ThemeSwitcher'
import PinButton from './components/PinButton'
import './App.css'

function App() {
	const {
		timeLeft, isRunning, hasPaused, pausedElapsed,
		progress, isFinished, toggleRunning, increment, decrement, reset,
	} = useTimer()

	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('singletask-theme') || 'void'
	})

	const isElectron = typeof window !== 'undefined' && !!window.electronApp?.isElectron
	const [isPinned, setIsPinned] = useState(false)

	const handlePin = useCallback(async () => {
		if (!isElectron) return
		const next = await window.electronApp.toggleAlwaysOnTop()
		setIsPinned(next)
	}, [isElectron])

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('singletask-theme', theme)
	}, [theme])

	useEffect(() => {
		if (isRunning || hasPaused) {
			const m = String(Math.floor(timeLeft / 60)).padStart(2, '0')
			const s = String(timeLeft % 60).padStart(2, '0')
			document.title = `${m}:${s} - Singletask`
		} else {
			document.title = 'Singletask'
		}
	}, [timeLeft, isRunning, hasPaused])

	const cycleTheme = useCallback(() => {
		setTheme((prev) => {
			const idx = THEMES.indexOf(prev)
			return THEMES[(idx + 1) % THEMES.length]
		})
	}, [])

	useKeyboardShortcuts({
		onToggle: toggleRunning,
		onIncrement: increment,
		onDecrement: decrement,
		isFinished,
	})

	return (
		<div className="app">
			<Timer
				timeLeft={timeLeft}
				isRunning={isRunning}
				hasPaused={hasPaused}
				pausedElapsed={pausedElapsed}
				progress={progress}
				isFinished={isFinished}
				onToggle={toggleRunning}
				onIncrement={increment}
				onDecrement={decrement}
				onReset={reset}
			/>
			<ThemeSwitcher
				theme={theme}
				onCycle={cycleTheme}
			/>
			{isElectron && (
				<PinButton isPinned={isPinned} onToggle={handlePin} />
			)}
		</div>
	)
}

export default App
