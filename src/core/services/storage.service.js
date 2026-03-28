/**
 * StorageService — класс для удобной работы с localStorage.
 * Позволяет работать с данными в более структурированном и понятном виде.
 */
export class StorageService {
	/**
	 * Получает значение из localStorage по указанному ключу.
	 * @param {string} key — ключ, по которому нужно получить значение.
	 * @returns {any} — найденное значение или null, если ничего не найдено.
	 */
	getItem(key) {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : null
	}

	/**
	 * Сохраняет значение в localStorage по указанному ключу.
	 * @param {string} key — ключ, под которым будет сохранено значение.
	 * @param {any} value — значение, которое нужно сохранить.
	 */
	setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}
	/**
	 * Удаляет значение из localStorage по указанному ключу.
	 * @param {string} key — ключ, значение которого нужно удалить.
	 */
	removeItem(key) {
		localStorage.removeItem(key)
	}
	/**
	 * Очищает все данные в localStorage.
	 */
	clear() {
		localStorage.clear()
	}
}
