import { SERVER_URL } from '@/config/url.config'
import { ACCESS_TOKEN_KEY } from '@/constrants/auth.constants'
import { NotificationService } from '../services/notification.service'
import { StorageService } from '../services/storage.service'
import { extractErrorMessage } from './extract-error-message'

/**
 * RedQuery — это простая библиотека для работы с API-запросами.
 * Позволяет получать данные с сервера с нужными настройками.
 * @param {Object} options — настройки запроса
 * @param {string} options.path — путь к API (например: /users)
 * @param {'GET'|'POST'|'PATCH'|'DELETE'|'PUT'} [options.method='GET'] — HTTP метод (по умолчанию GET)
 * @param {Object} [options.body=null] — данные, которые отправляешь на сервер (обычно JSON)
 * @param {Object} [options.headers={}] — дополнительные заголовки (например Authorization)
 * @param {Function} [options.onSuccess=null] — функция, которая вызовется если всё прошло успешно
 * @param {Function} [options.onError=null] — функция, которая вызовется если произошла ошибка
 * @returns {Promise<{isLoading:boolean,error:string|null,data:any|null}>} — объект с состоянием загрузки, ошибкой и данными
 */
export async function redQuery({
	path,
	body = null,
	headers = {},
	method = 'GET',
	onError = null,
	onSuccess = null
}) {
	let isLoading = true,
		error = null,
		data = null
	const url = `${SERVER_URL}/api${path}`

	const accessToken = new StorageService().getItem(ACCESS_TOKEN_KEY)

	const requestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	}

	if (accessToken) {
		requestOptions.headers.Authorization = `Bearer ${accessToken}`
	}

	if (body) {
		requestOptions.body = JSON.stringify(body)
	}

	try {
		const response = await fetch(url, requestOptions)

		if (response.ok) {
			data = await response.json()
			if (onSuccess) {
				onSuccess(data)
			}
		} else {
			const errorData = await response.json()
			const errorMessage = extractErrorMessage(errorData)

			// if (errorMessage) {
			// 	onError(errorMessage)
			// }
			if (errorMessage && typeof onError === 'function') {
				onError(errorMessage)
			}

			new NotificationService().show('error', errorMessage)
		}
	} catch (errorData) {
		const errorMessage = extractErrorMessage(errorData)

		// if (errorMessage) {
		// 	onError(errorMessage)
		// }
		if (errorMessage && typeof onError === 'function') {
			onError(errorMessage)
		}
	} finally {
		isLoading = false
	}
	return { isLoading, error, data }
}
