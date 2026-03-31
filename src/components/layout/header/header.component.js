import Logo from '@/components/ui/logo/logo.component'
import LogoutButton from '@/components/ui/logout-button/logout-button.component'
import Search from '@/components/ui/search/search.component'
import UserItem from '@/components/ui/user-item/user-item.component'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import * as styles from './header.module.scss' // * as !!!

import { $R } from '@/core/rquery/rquery.lib'
import Store from '@/core/store/store'
import template from './header.template.html'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.router = router
	}

	update() {
		this.user = this.store.state.user

		const authSideElement = $R(this.element).find('#auth-side')

		if (this.user) {
			authSideElement.show()
			this.router.navigate('/')
		} else {
			authSideElement.hide()
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Logo(),
				new LogoutButton({
					router: this.router
				}),
				new Search(),
				new UserItem({
					avatarPath: '/auth-page.jpg',
					name: 'Kat'
				})
			],
			styles
		)
		this.update()

		return this.element
	}
}
