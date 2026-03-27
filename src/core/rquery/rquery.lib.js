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

	/* EVENTS */

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
}

/**
 * Creates a new RQuery instance for the specified selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {RQuery} A new RQuery instance based on the provided selector.
 */
export function $R(selector) {
	return new RQuery(selector)
}
