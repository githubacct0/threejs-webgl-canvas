import { gsap } from 'gsap';
export default class WhoWeAre {
	constructor() {
		this.elem = $(".who-we-are");
	}

	animate(scrollEvent) {
		gsap.to(this.elem, {
			duration: 0.4,
			x: scrollEvent.offset.x * 0.5,
		});
	}
}
