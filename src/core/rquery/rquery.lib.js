/**
 * Represents the RQuery class for interacting with DOM elements.
 */

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
}

/**
 * Creates a new RQuery instance for the specified selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {RQuery} A new RQuery instance based on the provided selector.
 */
export function $R(selector) {
	return new RQuery(selector)
}
