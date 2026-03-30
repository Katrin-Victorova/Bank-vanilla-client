import { redQuery } from '@/core/red-query/red-query.lib'

export class UserService {
	#BASE_URl = '/users'

	getAll(searchTerm, onSuccess) {
		return redQuery({
			path: `${this.#BASE_URl}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
						})}`
					: ''
			}`,
			onSuccess
		})
	}
}
