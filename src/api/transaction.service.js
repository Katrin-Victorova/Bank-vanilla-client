import { redQuery } from '@/core/red-query/red-query.lib'

export class TransactionService {
	#BASE_URl = '/transactions'

	getAll(onSuccess) {
		return redQuery({
			path:
				this.#BASE_URl +
				`?${new URLSearchParams({
					orderBy: 'desc'
				})}`,
			onSuccess
		})
	}
}
