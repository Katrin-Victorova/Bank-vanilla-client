import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import * as styles from './<FTName>.module.scss'// * as !!!
import template from './<FTName>.template.html'

export default class <FTName | pascalcase> extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		return this.element
	}
}

// default - импорт import Search from '...' без фигурных скобок