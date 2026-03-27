import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import { Field } from '@/components/ui/field/field.component'
import UserItem from '@/components/ui/user-item/user-item.component'
import { $R } from '@/core/rquery/rquery.lib'
import * as styles from './home.module.scss'
import template from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super('Home')
	}

	render() {
		const element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'ffsdf',
					placeholder: 'Enter email',
					variant: 'green'
				}),
				new UserItem({
					avatarPath: '/public/auth-page.jpg',
					name: 'Kat'
				})
			],
			styles
		)

		$R(element).find('h1').css('color', 'green')

		return element
	}
}
