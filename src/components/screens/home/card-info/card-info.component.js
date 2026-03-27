import {
	default as ChildComponent,
	default as renderService
} from '@/core/services/render.service'

import * as styles from './card-info.module.scss' // * as !!!
import template from './card-info.template.html'

export class CardInfo extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}
