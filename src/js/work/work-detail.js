import { gsap } from 'gsap';
import Scrollbar from "smooth-scrollbar";
import HorizontalScrollPlugin, { speed } from "js/scroll-plugin/HorizontalScrollPlugin";
import UsedInProject from "work/used-in-project/UsedInProject";
import StoryDetailsWrap from "work/story-details-wrap/story-details-wrap";
import FixedLinks from "work/fixed-links/fixed-links";
const imagesLoaded = require('imagesloaded');

Scrollbar.use(HorizontalScrollPlugin);

export default class WorkDetail {
	constructor() {
		// Preload images
		// const preloadImages = () => {
		// 	return new Promise((resolve, reject) => {
		// 		imagesLoaded(document.querySelectorAll('.work_detail_page'), {background: true}, resolve);
		// 	});
		// };
		// preloadImages().then(() => {
		// });
		this.$els = {
			siteScreen: $('.siteScreensList'),
			// siteScreen: $(".siteScreensList"),
			// scHeight: $(".siteScreensList").outerHeight(),
			// scP: 105 - $('#second-section').outerHeight() / $(".siteScreensList").outerHeight() * 100,
			storyScreen: $(".storyscreenImg"),
			projectTitle: $(".projectTitle_wrap"),
			usedinProject: new UsedInProject(),
			storyDetails: new StoryDetailsWrap(),
			fixedLinks: new FixedLinks(),
		};

		
		// console.log(this.$els.scp);

		// 920 / 2240 * 100

		this.init();
		this.bindEvents();
		this.initSiteScreenTL();
		this.initStoryScreenTL();

		this._init;
		this._bindEvents;
		this._initSiteScreenTL;
		this._initStoryScreenTL;



		$('.kill_delayedCall').click(function(event) {
			this._init = null;
			this._bindEvents = null;
			this._initSiteScreenTL = null;
			this._initStoryScreenTL = null;
		});
		// element
		// imagesLoaded( document.querySelector('.work_detail_page'), function( instance ) {
		// });

	}

	init() {
		$('#contacts, .scrollToContact').attr('href', 'index.html#contactUs');
		$('#news').attr('href', 'index.html#thoughts');
		this._init = () => {
			this._scroll = Scrollbar.init(
				document.querySelector(".scroll-area", {
					continuousScrolling: false,
					damping: 0.05,
					plugins: {
						horizontalScroll: {
							events: [/wheel/],
						},
					},
				})
			);

			Scrollbar.detachStyle();

			var hash = location.hash;

			if (hash) {
				requestAnimationFrame(function() {
					setTimeout(() => {
						this._scroll.scrollIntoView(document.querySelector(hash), {
							offsetTop: -this._scroll.containerEl.scrollTop,
						});
					}, 500)
				});
			}
		}
		this._init();
	}

	bindEvents() {
		this._bindEvents = () => {
			this._scroll.addListener((s) => {
				this.onScroll(s);
			});

			$("#q-intro-scroll a").click(() => {
				this._scroll.scrollIntoView(
					document.querySelector("#second-section")
				);
			});
		}
		this._bindEvents();
	}

	onScroll(scrollEvent) {

		let scrollPercentage =
			(scrollEvent.offset.x * 100) / scrollEvent.limit.x;

		// console.log(`Percentage : ${scrollPercentage}`);

		this.$els.fixedLinks.displayElems(scrollPercentage, this.projectTitleAnim);

		if (scrollPercentage <= 20) {
			this.projectTitleAnim();
		}

		if (scrollPercentage <= 65) {
			this.siteScreenTL.progress((scrollPercentage) / 65);
		}

		if (scrollPercentage >= 35) {
			if (!this.$els.storyDetails.isVisible) {
				this.$els.storyDetails.TL.play();
			}
		}

		if (scrollPercentage >= 70) {
			if (!this.$els.usedinProject.isVisible) {
				this.$els.usedinProject.TL.play();
				this.$els.usedinProject.TL.timeScale(1 + speed / 60);
			}
		}

		if (scrollPercentage >= 50) {
			this.storyScreenTL.progress((scrollPercentage - 50) / 50);
		}
	}

	initSiteScreenTL() {
		this._initSiteScreenTL = () => {
			setTimeout(() => {
				var a = document.querySelector(".siteScreens").clientHeight;
				var b = document.querySelector(".siteScreensList").clientHeight;
				var c = a-b;
				console.log(a-b);
				this.siteScreenTL = gsap.timeline({ paused: true })
					.to(this.$els.siteScreen, {
						duration: 2,
						// yPercent: -a/b*100,
						y: c,
						// y: "-=" + this.$els.scP + "%",
						// yPercent: c,
						ease: 'none',
					});
			},500)
		}
		this._initSiteScreenTL();
	}

	initStoryScreenTL() {
		this._initStoryScreenTL = () => {
			this.storyScreenTL = gsap.timeline({ paused: true })
				.fromTo(this.$els.storyScreen, {
					y: "-=50%",
				}, {
					duration: 2,
					y: "+=60%",
				});
		}
		this._initStoryScreenTL();
	}

	projectTitleAnim() {
		this._projectTitleAnim = () => {
			gsap.to(this.$els.projectTitle, {
				duaration: 0.4,
				x: this._scroll.offset.x * 0.5,
			});
		}
		this._projectTitleAnim();
	}
}
