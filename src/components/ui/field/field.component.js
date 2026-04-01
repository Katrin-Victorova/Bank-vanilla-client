import ChildComponent from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import * as styles from './field.module.scss' // * as !!!
import template from './field.template.html'

export class Field extends ChildComponent {
	constructor({ placeholder, type = 'text', value = '', name, variant }) {
		super()

		if (!name) throw new Error('Please fill field "name"!')

		this.placeholder = placeholder
		this.type = type
		this.value = value
		this.name = name
		this.variant = variant
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		// querySelector → реальный input → прямое присваивание
		const inputElement = this.element.querySelector('input')

		inputElement.placeholder = this.placeholder
		inputElement.type = this.type
		inputElement.value = this.value
		inputElement.name = this.name

		if (this.type === 'number') {
			$R(inputElement).numberInput()
		}

		const isCreditCard = this.variant === 'credit-card'

		if (isCreditCard) {
			$R(inputElement).creditCardInput()
		}

		return this.element
	}
}
