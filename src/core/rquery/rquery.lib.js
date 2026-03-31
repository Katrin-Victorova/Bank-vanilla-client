/**
 * Represents the RQuery class for interacting with DOM elements.
 */

import { formatCardNumberWithDashes } from '@/utils/format/format-card-nimber'

class RQuery {
	/**
	 * Creates a new instance of RQuery.
	 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type')
		}
	}

	/**
	 * Finds the first element matching the given selector inside the current element.
	 * @param {string} selector - A CSS selector string to search within the current element.
	 * @returns {RQuery} A new RQuery instance containing the found element.
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element${selector} not found!`)
		}
	}

	/**
	 * Найти все элементы, которые соответствуют указанному селектору
	 * внутри выбранного элемента.
	 * @param {string} selector — CSS-селектор, по которому выполняется поиск
	 * внутри выбранного элемента.
	 * @returns {RQuery[]} Массив новых экземпляров RQuery для найденных элементов.
	 */
	findAll(selector) {
		const elements = this.element.querySelectorAll(selector)
		return Array.from(elements).map(element => new RQuery(element))
	}

	/* INSERT */

	/**
	 * Adds a new element as a child to the current element.
	 * @param {HTMLElement} childElement - The element to be appended.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	append(childElement) {
		this.element.appendChild(childElement)
		return this
	}
	/**
	 * Inserts a new element before the currently selected element.
	 * @param {HTMLElement} newElement - Element to insert before the selected one
	 * @returns {RQuery} Returns the current RQuery instance for chaining
	 */
	before(newElement) {
		if ((!newElement) instanceof HTMLElement) {
			throw new Error('Element must be an HTMLElement')
		}

		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)
			return this
		} else {
			throw new Error('element does not have a parent element')
		}
	}

	/**
	 * Gets or sets the inner HTML of the selected element.
	 * @param {string} [htmlContent] - Optional HTML string to set as content
	 * @returns {RQuery|string} Returns the RQuery instance (for chaining) when setting,
	 * or the current inner HTML string when getting
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent
			return this
		}
	}

	/**
	 * Get or set the text content of the selected element.
	 * @param {string} [textContent] - Optional text content to set. If not provided, the current text content will be returned.
	 * @returns {RQuery|string} The current RQuery instance for chaining when setting text content, or the current text content when getting.
	 */
	text(textContent) {
		if (typeof textContent === 'undefined') {
			return this.element.textContent
		} else {
			this.element.textContent = textContent
			return this
		}
	}

	/* EVENTS */

	/**
	 * Добавляет обработчик события к выбранному элементу для указанного типа события.
	 * @param {string} eventType - Тип события, на которое нужно подписаться (например: 'click', 'input' и т.д.).
	 * @param {function(Event): void} callback - Функция, которая будет вызвана при срабатывании события. В неё передается объект события.
	 * @returns {RQuery} Текущий экземпляр RQuery для цепочки вызовов.
	 */
	on(eventType, callback) {
		if (typeof eventType !== 'string' || typeof callback !== 'function') {
			throw new Error(
				'eventType must be a string and callback must be a functuin'
			)
		}

		this.element.addEventListener(eventType, callback)
		return this
	}

	/**
	 * Adds a click event listener to the selected element.
	 * @param {(event: Event) => void} callback - Function to execute on click
	 * @returns {RQuery} Returns the current RQuery instance for chaining
	 */
	click(callback) {
		this.element.addEventListener('click', callback)
		return this
	}

	/* FORM */

	/**
	 * Устанавливает обработчик события submit для формы.
	 * @param {function(Event): void} onSubmit — функция-обработчик события отправки формы.
	 * @returns {RQuery} — текущий экземпляр RQuery (для цепочки вызовов).
	 */
	submit(onSubmit) {
		if (this.element.tagName.toLowerCase() === 'form') {
			this.element.addEventListener('submit', e => {
				e.preventDefault()
				onSubmit(e)
			})
		} else {
			throw new Error('Element must be a form')
		}

		return this
	}

	/**
	 * Set attributes and event listeners for an input element.
	 * @param {object} options - An object containing input options.
	 * @param {function(Event): void} [options.onChange] - The event listener for the input's change event.
	 * @param {function(Event): void} [options.onInput] - The event listener for the input's input event.
	 * @param {object} [options.rest] - Optional attributes to set on the input element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	input({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input')
			for (const [key, value] of Object.entries(rest)) {
				this.element.setAttribute(key, value)
			}
		if (onInput) {
			this.element.addEventListener('input', onInput)
		}
		return this
	}

	/**
	 * Set attributes and event listeners for a number input element.
	 * @param {number} [limit] - The maximum length of input value.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() === 'input' ||
			this.element.type === 'number'
		)
			throw new Error('Element must be an input with type "number"')
		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = value
		})

		return this
	}

	/**
	 * Set attributes and event listeners for a credit card input element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	creditCardInput() {
		const limit = 16

		if (
			this.element.tagName.toLowerCase() === 'input' ||
			this.element.type === 'text'
		)
			throw new Error('Element must be an input with type "text"')
		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = formatCardNumberWithDashes(value)
		})

		return this
	}

	/* STYLES */

	/**
	 * Показывает выбранный элемент, удаляя свойство стиля 'display'.
	 * @returns {RQuery} Текущий экземпляр RQuery для цепочки вызовов.
	 */
	show() {
		this.element.style.removeProperty('display')
		return this
	}

	/**
	 * Скрывает выбранный элемент, устанавливая свойство display в 'none'.
	 * @returns {RQuery} Текущий экземпляр RQuery для цепочки вызовов.
	 */
	hide() {
		this.element.style.display = 'none'
		return this
	}

	/**
	 * Applies a CSS style to the selected element.
	 * @param {string} property - The CSS property name.
	 * @param {string} value - The value to assign to the CSS property.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('property and value must be strings')
		}

		this.element.style[property] = value
		return this
	}

	/**
	 * Adds one or multiple classes to the selected element.
	 * @param {string | string[]} classNames - Class name or array of class names to add
	 * @returns {RQuery} Returns the current RQuery instance for chaining
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const classList of classList) {
				this.element.classList.add(classList)
			}
		} else {
			this.element.classList.add(classNames)
		}

		return this
	}

	/**
	 * Removes one or multiple classes from the selected element.
	 * @param {string | string[]} classNames - Class name or array of class names to remove
	 * @returns {RQuery} Returns the current RQuery instance for chaining
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const classList of classList) {
				this.element.classList.remove(classList)
			}
		} else {
			this.element.classList.remove(classNames)
		}

		return this
	}

	/**
	 * Set or get the value of an attribute on the selected element.
	 * @param {string} attributeName - The name of the attribute to set or get.
	 * @param {string} [value] - The value to set for the attribute. If not provided, the current value of the attribute will be returned.
	 * @returns {RQuery|string} The current RQuery instance for chaining (if setting) or the attribute value (if getting).
	 */
	attr(attributeName, value) {
		if (typeof attributeName !== 'string') {
			throw new Error('Attribute name must be a string')
		}

		if (typeof value === 'undefined') {
			return this.element.getAttribute(attributeName)
		} else {
			this.element.setAttribute(attributeName, value)
			return this
		}
	}
}

/**
 * Creates a new RQuery instance for the specified selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {RQuery} A new RQuery instance based on the provided selector.
 */
export function $R(selector) {
	return new RQuery(selector)
}
