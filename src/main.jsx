import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (typeof window !== 'undefined' && window.electronApp) {
	const DESIGN_WIDTH = 560;
	function applyZoom() {
		const scale = Math.min(window.innerWidth / DESIGN_WIDTH, 1);
		document.documentElement.style.zoom = scale;
	}
	window.addEventListener('resize', applyZoom);
	applyZoom();
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
