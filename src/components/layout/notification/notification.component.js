import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { StorageService } from '@/core/services/storage.service'
import * as styles from './notification.module.scss' // * as !!!
import template from './notification.template.html'

export default class Notification extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		window.storageService = new StorageService()
		return this.element
	}
}

// default - импорт import Search from '...' без фигурных скобок
