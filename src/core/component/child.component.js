export default class ChildComponent {
	/**
	 * Render the child component content.
	 * @returns {HTMLElement}
	 */

	render() {
		throw new Error('Render method must be imlemented in the child class')
	}
}
