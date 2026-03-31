/**
 * Formats a credit card number string by adding dashes (-) after every 4th character.
 * @param {string} cardNumber - The credit card number string to format.
 * @return {string} - Returns the formatted credit card number string.
 */
export function formatCardNumberWithDashes(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}

/**
 * Форматирует номер банковской карты в вид: **** **** **** ****.
 * @param {string} cardNumber — номер карты, состоящий из 16 цифр без разделителей.
 * @returns {string} Отформатированный номер карты.
 */

// Сначала функция удаляет все пробелы из номера карты,
// затем разбивает его на группы по 4 цифры с помощью регулярного выражения /.{1,4}/g.
// После этого объединяет группы в одну строку, добавляя пробелы между ними через метод join().
export function formatCardNumber(cardNumber) {
	const formattedNumber = cardNumber.replace(/\s/g, '').match(/.{1,4}/g)
	return formattedNumber ? formattedNumber.join(' ') : ''
}
