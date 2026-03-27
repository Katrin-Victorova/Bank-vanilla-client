import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $R } from '@/core/rquery/rquery.lib'
import * as styles from './logout-button.module.scss' // * as !!!
import template from './logout-button.template.html'

export default class LogoutButton extends ChildComponent {
	constructor({ router }) {
		super()
		this.router = router
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		$R(this.element)
			.find('button')
			.click(() => {
				this.router.navigate('/auth')
			})

		return this.element
	}
}
