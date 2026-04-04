import { useEffect } from 'react'

export function useKeyboardShortcuts({ onToggle, onIncrement, onDecrement, isFinished }) {
	useEffect(() => {
		function handleKeyDown(e) {
			if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

			switch (e.code) {
				case 'Space':
					e.preventDefault()
					onToggle()
					break
				case 'ArrowUp':
					if (isFinished) return
					e.preventDefault()
					onIncrement()
					break
				case 'ArrowDown':
					if (isFinished) return
					e.preventDefault()
					onDecrement()
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onToggle, onIncrement, onDecrement, isFinished])
}
