// Singleton паттерн

import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from '@/constrants/auth.constants'
import { StorageService } from '../services/storage.service'

/**
 * Класс Store реализует паттерн Singleton,
 * предоставляя централизованное хранилище и управление состоянием.
 * Он управляет входом/выходом пользователя
 * и уведомляет наблюдателей об изменениях состояния.
 */
export default class Store {
	/**
	 * Создаёт новый экземпляр Store.
	 * @param {Object} initialState - Начальное состояние хранилища.
	 */
	constructor(initialState) {
		this.observers = []

		this.storageService = new StorageService()
		const savedUser = this.storageService.getItem(USER_STORAGE_KEY)

		const state = savedUser ? { user: savedUser } : initialState

		this.state = new Proxy(state, {
			set: (target, property, value) => {
				target[property] = value

				this.notify()
				return true
			}
		})
	}

	/**
	 * Получает единственный экземпляр Store (Singleton).
	 * @returns {Store} Экземпляр Store.
	 */
	static getInstance() {
		if (!Store.instance) {
			Store.instance = new Store({ user: null })
		}
		return Store.instance
	}

	/**
	 * Добавляет наблюдателя в список наблюдателей хранилища.
	 * @param {Object} observer - Объект-наблюдатель, который нужно добавить.
	 */
	addObserver(observer) {
		this.observers.push(observer)
	}

	/**
	 * Удаляет наблюдателя из списка наблюдателей хранилища.
	 * @param {Object} observer - Объект-наблюдатель, который нужно удалить.
	 */
	removeObserver(observer) {
		{
			this.observers = this.observers.filter(obs => obs !== observer)
		}
	}

	/**
	 * Уведомляет всех наблюдателей об изменениях состояния.
	 */
	notify() {
		for (const observer of this.observers) {
			observer.update()
		}
	}

	/**
	 * Выполняет вход пользователя и обновляет состояние и хранилище.
	 * @param {Object} user - Объект пользователя для входа.
	 */
	login(user, accessToken) {
		this.state.user = user
		this.storageService.setItem(USER_STORAGE_KEY, user)
		this.storageService.setItem(ACCESS_TOKEN_KEY, accessToken)
	}

	/**
	 * Выполняет выход пользователя, обновляет состояние
	 * и удаляет пользователя из хранилища.
	 */
	logout() {
		this.state.user = null
		this.storageService.removeItem(USER_STORAGE_KEY)
		this.storageService.removeItem(ACCESS_TOKEN_KEY)
	}

	/**
	 * Обновляет карту пользователя.
	 * @param {Object} card - Объект карты.
	 */
	updateCard(card) {
		const oldUser = this.state.user
		const newUser = { ...oldUser, card }
		this.state.user = newUser
		this.storageService.setItem(USER_STORAGE_KEY, newUser)
	}
}
