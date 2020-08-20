import HamAnim from 'js/menu/ham-animation';
import HamOverlay from 'js/menu/ham-overlay-animaton';

export default class Menu {
	constructor() {
		this.init();
	}
	init() {
		var anim = new HamAnim();
		[...document.querySelectorAll('.main_nav a')].forEach(link => new HamOverlay(link));
	}
}
