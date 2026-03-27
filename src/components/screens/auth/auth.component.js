import Heading from '@/components/ui/heading/heading.component'
import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import * as styles from './auth.module.scss' // * as !!!
import template from './auth.template.html'

export class Auth extends BaseScreen {
	constructor() {
		super({ title: 'Auth' })
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Auth')],
			styles
		)
		return this.element
	}
}
