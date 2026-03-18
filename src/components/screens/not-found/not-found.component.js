import { BaseScreen } from '@/core/component/base-screen.component'

export class NotFound extends BaseScreen {
	constructor() {
		super('Not Found')
	}
	render() {
		return '<p>Not found!</p>'
	}
}
