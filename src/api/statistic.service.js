import { redQuery } from '@/core/red-query/red-query.lib'

export class StatisticService {
	#BASE_URl = '/statistics'

	main(onSuccess) {
		return redQuery({
			path: this.#BASE_URl,
			onSuccess
		})
	}
}
