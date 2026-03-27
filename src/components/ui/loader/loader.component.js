import ChildComponent from '@core/component/child.component'
import renderService from '@core/services/render.service'

import { $R } from '@/core/rquery/rquery.lib'
import * as styles from './loader.module.scss' // * as !!!
import template from './loader.template.html'

export const LOADER_SELECTOR = '[data-component="loader"]'

export default class Loader extends ChildComponent {
	constructor(width = 100, height = 100) {
		super()
		this.width = width
		this.height = height
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element)
			.css('wight', `${this.width}px`)
			.css('height', `${this.height}px`)
			.addClass('bounce')

		return this.element
	}
}
