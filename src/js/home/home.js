import { gsap } from 'gsap';
// Second Section Hover Effect
import Hovereffect from "home/hover-effect/js/index";
import scrollBar from 'home/scroll-bar/scroll-bar';
import firstSection from 'home/First-Section/first-section';
import lastSection from 'home/last-section/last-section';
import Footer from 'home/footer/footer';
export default class Home {
	constructor() {
		this.hovereffect;
		this.scroll;
		this.firstsec;
		this.lastsec;
		this.footer;
		this.run;
		this.init();
		$('.kill_delayedCall').click(function(event) {
			this.hovereffect = null;
			this.scroll = null;
			this.firstsec = null;
			this.lastsec = null;
			this.footer = null;
			this.init = null;
			this.run = null;
		});
	}

	init() {
		this.run = () => {
			if ($('.work_page')[0]) {
				$('#contacts, .scrollToContact').attr('href', 'index.html#contactUs');
				$('#q-intro-scroll .scrollToContact').attr('href', 'javascript:void(0);');
				$('#news').attr('href', 'index.html#thoughts');
				this.hovereffect = new Hovereffect();
				this.scroll = new scrollBar();
				this.lastsec = new lastSection();
				this.footer = new Footer();
				let y = $(".st0");

				var tl = gsap.timeline();
				tl.fromTo(y, { "stroke-dashoffset": 430 }, { duration: 0.65, "stroke-dashoffset": 0 })
					.yoyo(true)
					.repeatDelay(1)
					.repeat(-1);

				var tl2 = gsap.timeline();
				tl2.fromTo(y, { autoAlpha: 1, x: "-=20" }, { duration: 0.65, autoAlpha: 1, x: 0 })
					.yoyo(true)
					.repeatDelay(1)
					.repeat(-1);
			}
			if ($('.home_page')[0]) {
				$('#news, #contacts, .scrollToContact').attr('href', 'javascript:void(0);');
				this.hovereffect = new Hovereffect();
				this.scroll = new scrollBar();
				this.firstsec = new firstSection();
				this.lastsec = new lastSection();
				this.footer = new Footer();
			}
		}
		this.run();
	}

}
