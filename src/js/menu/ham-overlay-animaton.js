import { gsap } from "gsap";

export default class HamOverlay {
	constructor(el) {
		this.DOM = { el: el };
		this.DOM.reveal = document.createElement('div');
		this.DOM.reveal.className = 'hover-reveal__img';
		this.DOM.reveal.style.cssText = `background-image:url(${this.DOM.el.dataset.img})`;
		document.querySelector('.MenuOverlayBackground').appendChild(this.DOM.reveal);
		// this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

		this.initEvents();
	}

	initEvents() {
		this.mouseenterFn = (ev) => {
			this.showImage();
		};
		this.mouseleaveFn = () => {
			this.hideImage();
		};

		this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
		this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
	}

	showImage() {
		gsap.killTweensOf(this.DOM.reveal);

		this.tl = gsap.timeline({
				onStart: () => {
					gsap.set(this.DOM.reveal, { autoAlpha: 0, scale: 1.5 });
				}
			})
			.add('begin')
			.add(gsap.to(this.DOM.reveal, {
				// ease: Sine.easeOut,
				duration: 1,
				scale: 1,
				autoAlpha: 0.2,
			}), 'begin');
	}
	hideImage() {
		gsap.killTweensOf(this.DOM.reveal);

		this.tl = gsap.timeline({
				onComplete: () => {
					gsap.set(this.DOM.reveal, { autoAlpha: 0, scale: 1.5 });
				}
			})
			.add('begin')
			.add(gsap.to(this.DOM.reveal, {
				// ease: Sine.easeOut,
				duration: 0.5,
				scale: 1.2,
				autoAlpha: 0,
			}), 'begin');
	}
}
