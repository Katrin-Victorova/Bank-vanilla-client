import { redQuery } from '@/core/red-query/red-query.lib'
import { NotificationService } from '@/core/services/notification.service'
import Store from '@/core/store/store'

export class CardService {
	#BASE_URL = '/cards'

	constructor() {
		this.store = Store.getInstance()
		this.notificationService = new NotificationService()
	}

	byUser(onSuccess) {
		return redQuery({
			path: `${thiis.#BASE_URL}/by-user`,
			onSuccess
		})
	}

	/**
	 * Обновляет баланс пользователя на указанную сумму и тип операции.
	 * @param {number} amount — сумма, которую нужно добавить или списать с баланса пользователя
	 * @param {'top-up'|'withdrawal'} type — тип операции: пополнение ("top-up") или снятие ("withdrawal")
	 * @param {function} onSuccess — функция, которая вызовется при успешном обновлении баланса
	 * @returns {Promise} — промис, который возвращает ответ от API
	 */
	updateBalance(amount, type, onSuccess) {
		return redQuery({
			path: `${this.#BASE_URL}/balance/${type}`,
			method: 'PATCH',
			body: { amount: +amount },
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Balance successfully changed!'
				)
				onSuccess()
			}
		})
	}
	/**
	 * Переводит деньги между двумя номерами карт.
	 * @function
	 * @param {Object} body - Данные для перевода.
	 * @param {number} body.amount - Сумма перевода.
	 * @param {string} body.toCardNumber - Номер карты получателя.
	 * @param {Function} onSuccess - Колбэк, который вызывается при успешном переводе.
	 * @returns {Promise} Промис, который возвращает ответ от redQuery.
	 */
	transfer({ amount, toCardNumber, onSuccess }) {
		return redQuery({
			path: `${this.#BASE_URL}/transfer-money`,
			method: 'PATCH',
			body: {
				amount: +amount,
				fromCardNumber: this.store.user.card.number,
				toCardNumber
			},
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Transfer successfully completed!'
				)
				onSuccess()
			}
		})
	}
}
