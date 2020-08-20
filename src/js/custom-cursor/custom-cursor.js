import { gsap } from 'gsap';
export default class Cursor {
	constructor() {
		this.$els = {
			document: $(document),
			cursor: $(".custom-cursor")
		}
		this.bindEvents()
	}

	bindEvents() {
		this.$els.document.mousemove((e) => {
			gsap.to(this.$els.cursor, {
				duration: 1,
				x: e.clientX,
				y: e.clientY,
				ease: 'power3.out',
			})
		})
	}
}
