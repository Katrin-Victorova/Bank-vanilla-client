import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $R } from '@/core/rquery/rquery.lib'
import * as styles from './statistics-item.module.scss' // * as !!!
import template from './statistics-item.template.html'

/**
 * StatisticItem — это класс, представляющий компонент элемента статистики.
 */
export default class StatisticsItem extends ChildComponent {
	/**
	 * Создает экземпляр StatisticItem.
	 * @param {string} label — текст (название), который будет отображаться в элементе статистики.
	 * @param {string|number} value — значение, которое будет отображаться в элементе статистики.
	 * @param {('purple'|'green')} variant — вариант, определяющий внешний вид элемента статистики.
	 * Допустимые значения: 'purple' или 'green'.
	 */
	constructor(label, value, variant) {
		super()

		if (!label || !value || !variant) {
			throw new Error('Label, value and variant (purple, green) required!')
		}

		this.label = label
		this.value = value
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element).addClass(styles[this.variant]).addClass('fade-in')
		$R(this.element).find('#statistic-label').text(this.label)
		$R(this.element).find('#statistic-value').text(this.value)

		return this.element
	}
}

// default - импорт import Search from '...' без фигурных скобок
