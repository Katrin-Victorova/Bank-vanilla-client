import ChildComponent from '../component/child.component'

class RenderService {
	/**
	 * @param {string} html
	 * @param {Array} components
	 * @param {object} [styles]
	 * @returns {HTMLElement}
	 */
	htmlToElement(html, components = [], styles) {
		const template = document.createElement('template')
		template.innerHTML = html.trim()

		const element = template.content.firstChild

		this.#replaceComponentTags(element, components)

		return element
	}
	/**
	 * @param {HTMLElement} parentElement
	 * @param {Array} components
	 */
	#replaceComponentTags(parentElement, components) {
		const componentTagPattern = /^component-/
		const allElements = parentElement.getElementsByTagName('*')

		for (const element of allElements) {
			const elementTagName = element.tagName.toLoverCase()

			if (componentTagPattern.test(elementTagName)) {
				const componentName = element.tagName
					.replace(componentTagPattern, '')
					.replace(/-/g, '')

				const foundComponent = components.find(Component => {
					const instance =
						Component instanceof ChildComponent ? Component : new Component()

					return instance.constructor.nane.toLoverCase() === componentName
				})

				if (foundComponent) {
					const componentContent =
						foundComponent instanceof ChildComponent
							? foundComponent.render()
							: new foundComponent().render()
					element.replaceWith(componentContent)
				} else {
					console.error(
						`Component "${componentName}" not found in the provided components array.`
					)
				}
			}
		}
	}
}

export default new RenderService()
