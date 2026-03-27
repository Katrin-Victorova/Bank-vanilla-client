import ChildComponent from '@core/component/child.component'
import renderService from '@core/services/render.service'

import { $R } from '@/core/rquery/rquery.lib'
import * as styles from './heading.module.scss' // * as !!!
import template from './heading.template.html'

export default class Heading extends ChildComponent {
	constructor(title = '') {
		super()
		this.title = title
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element).text(this.title)
		return this.element
	}
}
