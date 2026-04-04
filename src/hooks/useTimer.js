import { useState, useEffect, useCallback } from 'react'
import alarmSrc from '../assets/alarm.mp3'

const alarmAudio = new Audio(alarmSrc)

export function useTimer(initialMinutes = 25) {
	const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
	const [isRunning, setIsRunning] = useState(false)
	const [hasPaused, setHasPaused] = useState(false)
	const [pausedElapsed, setPausedElapsed] = useState(0)
	const [totalDuration, setTotalDuration] = useState(0)
	const [isFinished, setIsFinished] = useState(false)

	useEffect(() => {
		if (!isRunning) return

		const id = setInterval(() => {
			setTimeLeft((prev) => Math.max(0, prev - 1))
		}, 1000)

		return () => clearInterval(id)
	}, [isRunning])

	useEffect(() => {
		if (!hasPaused || isRunning) return

		const id = setInterval(() => {
			setPausedElapsed((prev) => prev + 1)
		}, 1000)

		return () => clearInterval(id)
	}, [hasPaused, isRunning])

	useEffect(() => {
		if (timeLeft === 0 && isRunning) {
			setIsRunning(false)
			setHasPaused(false)
			setPausedElapsed(0)
			setTotalDuration(0)
			setIsFinished(true)
			alarmAudio.currentTime = 0
			alarmAudio.play()
			if ('Notification' in window && Notification.permission === 'granted') {
				new Notification('Burnt Tomato', {
					body: 'Time is up!',
				})
			}
		}
	}, [timeLeft, isRunning])

	const toggleRunning = useCallback(() => {
		if (isRunning) {
			setIsRunning(false)
			setHasPaused(true)
			setPausedElapsed(0)
			return
		}
		if (timeLeft === 0) return
		if (!hasPaused) {
			setTotalDuration(timeLeft)
		}
		if ('Notification' in window && Notification.permission === 'default') {
			Notification.requestPermission()
		}
		setIsRunning(true)
	}, [isRunning, timeLeft, hasPaused])

	const increment = useCallback(() => {
		setTimeLeft((prev) => prev + 60)
		setTotalDuration((prev) => prev > 0 ? prev + 60 : prev)
		setIsFinished(false)
	}, [])

	const decrement = useCallback(() => {
		setTimeLeft((prev) => Math.max(0, prev - 60))
		setTotalDuration((prev) => prev > 0 ? Math.max(1, prev - 60) : prev)
		setIsFinished(false)
	}, [])

	const reset = useCallback(() => {
		const duration = initialMinutes * 60
		setTimeLeft(duration)
		setIsRunning(true)
		setHasPaused(false)
		setPausedElapsed(0)
		setTotalDuration(duration)
		setIsFinished(false)
	}, [initialMinutes])

	const progress = totalDuration > 0 ? timeLeft / totalDuration : 1

	return {
		timeLeft, isRunning, hasPaused, pausedElapsed,
		progress, isFinished, toggleRunning, increment, decrement, reset,
	}
}
