import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $R } from '@/core/rquery/rquery.lib'
import * as styles from './donut-chart.module.scss' // * as !!!
import template from './donut-chart.template.html'

/**
 * DonutChart — класс для создания простой кольцевой диаграммы с настраиваемыми параметрами.
 */
export default class DonutChart extends ChildComponent {
	gap = 15
	/**
	 * Создаёт новый экземпляр DonutChart.
	 * @param {string|HTMLElement} container — контейнер (селектор или HTML-элемент), в который будет добавлен график.
	 * @param {object[]} data — массив объектов с данными для каждого сегмента диаграммы.
	 * @param {number} data[].value — значение сегмента.
	 * @param {string} data[].color — цвет сегмента.
	 * @param {number} [options.size=250] — диаметр диаграммы.
	 * @param {number} [options.donutWidth=50] — толщина кольца диаграммы.
	 */
	constructor(
		data,
		options = {
			size: 250,
			donutWidth: 50
		}
	) {
		super()
		this.data = data
		this.size = options.size
		this.donutWidth = options.donutWidth
	}

	/**
	 * Вычисляет общее значение всех сегментов.
	 * @returns {number} Общее значение.
	 */
	// вычислят общую сумму значений сегментов.
	#calculateTotalValue() {
		return this.data.reduce((acc, slice) => acc + slice.value, 0)
	}

	/**
	 * Преобразует полярные координаты в декартовы.
	 * @param {number} percentage — процент круга.
	 * @param {number} radius — радиус круга.
	 * @returns {number[]} Декартовы координаты [x, y].
	 */
	#polarToCartesioan(percentage, radius) {
		const angleInDegrees = percentage * 3.6 - 90
		const angleInRadians = (angleInDegrees * Math.PI) / 180

		const x = radius * Math.cos(angleInRadians)
		const y = radius * Math.sin(angleInRadians)

		return [x, y]
	}
	// #polarToCartesioan(percentage, radius) {
	// 	const angleIdDegrees = percentage * 3.6 - 90
	// 	const angleInRadians = (angleInRadians * Math.PI) / 100
	// 	const x = radius * Math.cos(angleInRadians)
	// 	const y = radius * Math.sin(angleInRadians)
	// 	return [x, y]
	// }

	/**
	 * Создаёт SVG-элемент и задаёт ему атрибуты.
	 * @returns {SVGElement} Созданный SVG-элемент.
	 */
	#createSvgElement() {
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

		svg.setAttribute('width', this.size)
		svg.setAttribute('height', this.size)
		svg.setAttribute(
			'viewBox',
			`-5 -5 ${this.size + this.gap} ${this.size + this.gap}`
		)

		return svg
	}

	/**
	 * Создаёт SVG-группу и задаёт ей атрибуты.
	 * @returns {SVGGElement} Созданный SVG-элемент группы.
	 */
	#createSvgGroupElement() {
		const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		g.setAttribute(
			'transform',
			`translate(${this.size / 2 + this.gap / 4}, ${
				this.size / 2 + this.gap / 4
			})`
		)
		return g
	}

	#createPathElement(slice, pathData) {
		if (!pathData || pathData.includes('NaN')) return

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		path.setAttribute('d', pathData)
		path.setAttribute('fill', 'none')
		path.setAttribute('stroke', slice.color)
		path.setAttribute('stroke-width', this.donutWidth)

		return path
	}

	// создает элементы пути SVG для каждого сегмента диаграммы
	#createSvgPathElements(g) {
		const totalValue = this.#calculateTotalValue()
		const scale = 0.8
		const newSize = this.size * scale
		const radius = newSize / 2
		let accumulatedPercentage = 0

		this.data.forEach(slice => {
			const percentage = (slice.value / totalValue) * 100
			const [startX, startY] = this.#polarToCartesioan(
				accumulatedPercentage,
				radius
			)
			accumulatedPercentage += percentage
			const [endX, endY] = this.#polarToCartesioan(
				accumulatedPercentage,
				radius
			)
			const largeArcFlag = percentage > 50 ? 1 : 0
			const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`

			const path = this.#createPathElement(slice, pathData)
			path.classList.add('rotate')
			g.appendChild(path)
		})
	}

	/**
	 * Генерирует SVG-элемент, представляющий кольцевую диаграмму.
	 * @returns {SVGElement} SVG-элемент, содержащий диаграмму.
	 */
	#getSvg() {
		const svg = this.#createSvgElement()
		const g = this.#createSvgGroupElement()
		this.#createSvgPathElements(g)
		svg.appendChild(g)

		return svg
	}

	/**
	 * Рендерит круговую диаграмму.
	 */
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element).append(this.#getSvg())

		return this.element
	}
}

// default - импорт import Search from '...' без фигурных скобок
