import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import DonutChart from '@/components/ui/donut-chart/donut-chart.component'
import * as styles from './circle-chart.module.scss' // * as !!!
import template from './circle-chart.template.html'

export default class CircleChart extends ChildComponent {
	constructor(incomePersent, expensePercent) {
		super()
		this.incomePersent = incomePersent
		this.expensePercent = expensePercent
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new DonutChart([
					{ value: this.incomePersent, color: '#08f0c8' },
					{ value: this.expensePercent, color: '#917cff' }
				])
			],
			styles
		)
		return this.element
	}
}

// default - импорт import Search from '...' без фигурных скобок
