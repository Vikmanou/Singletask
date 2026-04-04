import alarmSrc from '../assets/alarm.mp3'

export function playAlarm() {
	const audio = new Audio(alarmSrc)
	audio.play()
}
