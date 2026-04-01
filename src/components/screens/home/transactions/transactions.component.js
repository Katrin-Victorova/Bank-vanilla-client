import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { TransactionService } from '@/api/transaction.service'
import Heading from '@/components/ui/heading/heading.component'
import Loader, {
	LOADER_SELECTOR
} from '@/components/ui/loader/loader.component'
import { TRANSACTION_COMPLETED } from '@/constrants/event.constants'
import { $R } from '@/core/rquery/rquery.lib'
import Store from '@/core/store/store'
import TransactionItem from './transaction-item/transaction-item.component'
import * as styles from './transactions.module.scss' // * as !!!
import template from './transactions.template.html'

export default class Transactions extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.transactionService = new TransactionService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Recent transactions')],
			styles
		)
		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted
		)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted
		)
	}

	#onTransactionCompleted = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.transactionService.getAll(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			if (loaderElement) loaderElement.remove()

			const transactionsList = $R(this.element).find('#transactions-list')
			transactionsList.text('')

			if (data.length) {
				for (const transaction of data.transactions) {
					transactionsList.append(new TransactionItem(transaction).render())
				}
			} else {
				transactionsList.text('Transactions not found!')
			}
		})
	}

	render() {
		if (this.store.user) {
			$R(this.element).append(new Loader().render())
			this.fetchData()
		}

		return this.element
	}
}

// default - импорт import Search from '...' без фигурных скобок
