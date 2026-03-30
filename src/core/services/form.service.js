export class FormService {
	/**
	 * Получает значения input-элементов внутри формы.
	 * @param {HTMLFormElement} formElement — форма, содержащая input-элементы.
	 * @returns {object} Объект, где ключ — это name input'а, а значение — его value.
	 */
	getFormValues(formElement) {
		const inputs = formElement.querySelectorAll('input')
		const values = {}

		for (const input of inputs) {
			values[input.name] = input.value
		}

		return values
	}
}

export default new FormService()
