/**
 * Форматирует число в строку с указанным символом валюты.
 * @param {number} number — число, которое нужно преобразовать в денежный формат.
 * @returns {string} Отформатированное число с символом валюты.
 */
export function formatToCurrency(number) {
	const value = Number(number)

	if (isNaN(value)) return '0,00 ₽'

	return new Intl.NumberFormat('ru-RU', {
		currency: 'RUB',
		style: 'currency'
	}).format(value)
}
