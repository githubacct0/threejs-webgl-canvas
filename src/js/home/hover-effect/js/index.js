import Stage from './Stage'

export default class Hovereffect {
	constructor() {
		this.init();
	}

	init() {

		const APP = window.APP || {}

		/*-----------------------------------------------------------------------------------*/
		/*  01. INIT
		/*-----------------------------------------------------------------------------------*/

		const initApp = () => {
			window.APP = APP;
			if (document.body.contains(document.querySelector('#scene'))) {
				APP.Stage = new Stage()
			}
		}

		if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
			initApp()
		} else {
			document.addEventListener('DOMContentLoaded', initApp)
		}

	}
}
