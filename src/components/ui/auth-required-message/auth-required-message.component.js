import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './auth-required-message.module.scss'// * as !!!
import template from './auth-required-message.template.html'

export default class AuthRequiredMessage extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}

// default - импорт import Search from '...' без фигурных скобок