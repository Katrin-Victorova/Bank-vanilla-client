import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserService } from '@/api/user.service'
import { TRANSFER_FIELD_SELECTOR } from '@/components/screens/home/contacts/transfer-field/transfer-field.component'
import { $R } from '@/core/rquery/rquery.lib'
import { debounce } from '@/utils/debounce.util'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-nimber'
import UserItem from '../user-item/user-item.component'
import * as styles from './search.module.scss' // * as !!!
import template from './search.template.html'

export default class Search extends ChildComponent {
	constructor() {
		super()
		this.userService = new UserService()
	}

	#handleSearch = async event => {
		const searchTerm = event.target.value
		const searchResultElement = $R(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					$R(TRANSFER_FIELD_SELECTOR).value(
						formatCardNumberWithDashes(user.card.number)
					)

					searchResultElement.html('')
				}).render()

				$R(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					$R(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debouncedHandleSearch = debounce(this.#handleSearch, 300)

		// $R(this.element).find('input').input({
		// 	type: 'search',
		// 	name: 'search',
		// 	placeholder: 'Search contacts...' // .input() не умеет ставить placeholder
		// })

		const inputElement = $R(this.element).find('input')

		inputElement.attr('type', 'search')
		inputElement.attr('name', 'search')
		inputElement
			.attr('placeholder', 'Search contacts...')
			.on('input', debouncedHandleSearch)

		return this.element
	}
}
