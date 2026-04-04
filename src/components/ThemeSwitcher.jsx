import { THEME_LABELS } from '../utils/themes'
import './ThemeSwitcher.css'

function ThemeSwitcher({ theme, onCycle }) {
	return (
		<button
			className="theme-switcher"
			onClick={onCycle}
			title="Set theme"
		>
			<span className="theme-dot" />
			<span className="theme-label">{THEME_LABELS[theme]}</span>
		</button>
	)
}

export default ThemeSwitcher
