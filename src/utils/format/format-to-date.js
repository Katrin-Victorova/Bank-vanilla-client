/**
 * Форматирует дату в формате "MMM DD, YYYY".
 * @param {string} dateString Строка с датой в формате "YYYY-MM-DDTHH:mm:ss.sssZ".
 * @returns {string} Отформатированная строка даты в формате "MMM DD, YYYY".
 */
export function formatDate(dateString) {
	const date = new Date(dateString)
	const options = { month: 'short', day: 'numeric', year: 'numeric' }
	return date.toLocaleDateString('en-US', options)
}
