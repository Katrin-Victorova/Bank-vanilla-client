import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $R } from '@/core/rquery/rquery.lib'
import * as styles from './search.module.scss' // * as !!!
import template from './search.template.html'

export default class Search extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		// $R(this.element).find('input').input({
		// 	type: 'search',
		// 	name: 'search',
		// 	placeholder: 'Search contacts...' // .input() не умеет ставить placeholder
		// })

		const inputElement = $R(this.element).find('input')

		inputElement.attr('type', 'search')
		inputElement.attr('name', 'search')
		inputElement.attr('placeholder', 'Search contacts...')

		return this.element
	}
}
